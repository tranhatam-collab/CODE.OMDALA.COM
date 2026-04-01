import { getToolByName } from '@omcode/mcp-clients';
import { ApiContractMcpServer } from '../servers/api-contract';
import { type D1SchemaMcpConfig, D1SchemaMcpServer } from '../servers/d1-schema';
import { DesignTokenMcpServer } from '../servers/design-token';
import { DocsMcpServer } from '../servers/docs';
import { type GitHubMcpConfig, GitHubMcpServer } from '../servers/github';
import { RepoMapMcpServer } from '../servers/repo-map';
import { RoadmapMcpServer } from '../servers/roadmap';
import { ObservabilityLogger } from './observability';

export interface McpGatewayConfig {
  github?: GitHubMcpConfig;
  repoPath?: string;
  d1?: D1SchemaMcpConfig;
  roadmapPath?: string;
}

export class McpRouter {
  private githubServer?: GitHubMcpServer;
  private repoMapServer?: RepoMapMcpServer;
  private docsServer: DocsMcpServer;
  private apiContractServer: ApiContractMcpServer;
  private d1SchemaServer?: D1SchemaMcpServer;
  private designTokenServer: DesignTokenMcpServer;
  private roadmapServer?: RoadmapMcpServer;

  constructor(config: McpGatewayConfig) {
    if (config.github) this.githubServer = new GitHubMcpServer(config.github);
    if (config.repoPath) this.repoMapServer = new RepoMapMcpServer(config.repoPath);
    this.docsServer = new DocsMcpServer();
    this.apiContractServer = new ApiContractMcpServer();
    if (config.d1) this.d1SchemaServer = new D1SchemaMcpServer(config.d1);
    this.designTokenServer = new DesignTokenMcpServer();
    if (config.roadmapPath) this.roadmapServer = new RoadmapMcpServer(config.roadmapPath);
  }

  async route(toolName: string, params: Record<string, unknown>, reqId: string): Promise<unknown> {
    const start = Date.now();
    const toolDef = getToolByName(toolName);
    if (!toolDef) throw new Error(`Tool not found: ${toolName}`);

    ObservabilityLogger.log('info', `Routing to ${toolDef.server}.${toolName}`, reqId, {
      toolName,
      server: toolDef.server,
    });

    let result: unknown;

    try {
      switch (toolDef.server) {
        case 'github':
          if (!this.githubServer) throw new Error('GitHub server not configured');
          result = await this.executeGithub(toolName, params);
          break;
        case 'repo-map':
          if (!this.repoMapServer) throw new Error('RepoMap server not configured');
          result = await this.executeRepoMap(toolName, params);
          break;
        case 'docs':
          result = await this.executeDocs(toolName, params);
          break;
        case 'api-contract':
          result = await this.executeApiContract(toolName, params);
          break;
        case 'd1-schema':
          if (!this.d1SchemaServer) throw new Error('D1Schema server not configured');
          result = await this.executeD1Schema(toolName, params);
          break;
        case 'design-token':
          result = await this.executeDesignToken(toolName, params);
          break;
        case 'roadmap':
          if (!this.roadmapServer) throw new Error('Roadmap server not configured');
          result = await this.executeRoadmap(toolName, params);
          break;
        default:
          throw new Error(`Server ${toolDef.server} not supported`);
      }
      ObservabilityLogger.log('info', `Execution successful: ${toolName}`, reqId, {
        duration: Date.now() - start,
      });
      return result;
    } catch (e) {
      const err = e as Error;
      ObservabilityLogger.log('error', `Execution failed: ${toolName} - ${err.message}`, reqId, {
        error: err.stack,
      });
      throw e;
    }
  }

  private async executeGithub(name: string, params: any) {
    if (name === 'read_repo') return this.githubServer?.readRepo();
    if (name === 'list_branches') return this.githubServer?.listBranches();
    if (name === 'read_file') return this.githubServer?.readFile(params.path, params.branch);
    if (name === 'list_files') return this.githubServer?.listFiles(params.dirPath, params.branch);
    if (name === 'create_branch')
      return this.githubServer?.createBranch(params.branchName, params.baseSha);
    if (name === 'create_pr')
      return this.githubServer?.createPr(params.title, params.body, params.head, params.base);
    if (name === 'list_commits') return this.githubServer?.listCommits(params.sha, params.perPage);
    if (name === 'get_commit_diff') return this.githubServer?.getCommitDiff(params.sha);
    throw new Error(`Tool ${name} not implemented on GitHub server`);
  }

  private async executeRepoMap(name: string, params: any) {
    if (name === 'build_repo_map') return this.repoMapServer?.buildRepoMap();
    if (name === 'find_symbol')
      return this.repoMapServer?.findSymbol(params.symbolName, params.files);
    if (name === 'get_dependencies') return this.repoMapServer?.getDependencies(params.filePath);
    throw new Error(`Tool ${name} not implemented on RepoMap server`);
  }

  private async executeDocs(name: string, params: any) {
    if (name === 'read_docs') return this.docsServer.readDocs(params.path);
    if (name === 'generate_docs') return this.docsServer.generateDocs(params.code);
    if (name === 'update_docs') return this.docsServer.updateDocs(params.path, params.content);
    if (name === 'validate_docs') return this.docsServer.validateDocs(params.path);
    if (name === 'translate_docs')
      return this.docsServer.translateDocs(params.path, params.targetLocale);
    throw new Error(`Tool ${name} not implemented on Docs server`);
  }

  private async executeApiContract(name: string, params: any) {
    if (name === 'read_contracts') return this.apiContractServer.readContracts(params.path);
    if (name === 'generate_contract')
      return this.apiContractServer.generateContract(params.codePath);
    if (name === 'validate_contract')
      return this.apiContractServer.validateContract(params.implPath, params.contractPath);
    throw new Error(`Tool ${name} not implemented on ApiContract server`);
  }

  private async executeD1Schema(name: string, params: any) {
    if (name === 'read_schema') return this.d1SchemaServer?.readSchema();
    if (name === 'generate_migration')
      return this.d1SchemaServer?.generateMigration(params.changes);
    if (name === 'validate_migration') return this.d1SchemaServer?.validateMigration(params.sql);
    if (name === 'apply_migration') return this.d1SchemaServer?.applyMigration(params.sql);
    if (name === 'rollback_migration')
      return this.d1SchemaServer?.rollbackMigration(params.version);
    if (name === 'query_schema') return this.d1SchemaServer?.querySchema(params.sql);
    throw new Error(`Tool ${name} not implemented on D1Schema server`);
  }

  private async executeDesignToken(name: string, params: any) {
    if (name === 'read_tokens') return this.designTokenServer.readTokens();
    if (name === 'update_tokens') return this.designTokenServer.updateTokens(params.updates);
    if (name === 'export_tokens') return this.designTokenServer.exportTokens(params.format);
    throw new Error(`Tool ${name} not implemented on DesignToken server`);
  }

  private async executeRoadmap(name: string, params: any) {
    if (name === 'read_roadmap') return this.roadmapServer?.readRoadmap();
    if (name === 'update_roadmap')
      return this.roadmapServer?.updateRoadmap(params.itemId, params.status);
    if (name === 'generate_roadmap') return this.roadmapServer?.generateRoadmap(params.issuesOrPrs);
    if (name === 'track_progress') return this.roadmapServer?.trackProgress();
    throw new Error(`Tool ${name} not implemented on Roadmap server`);
  }
}
