export interface RepoMapNode {
  name: string;
  path: string;
  type: 'file' | 'directory';
  language?: string;
  symbols?: SymbolInfo[];
  children?: RepoMapNode[];
}

export interface SymbolInfo {
  name: string;
  type: 'function' | 'class' | 'interface' | 'variable' | 'type';
  line: number;
  signature?: string;
}

export class RepoMapMcpServer {
  private rootPath: string;

  constructor(rootPath: string) {
    this.rootPath = rootPath;
  }

  async buildRepoMap(): Promise<RepoMapNode> {
    const fs = await import('fs/promises');
    const path = await import('path');

    async function scan(dirPath: string, depth: number = 0): Promise<RepoMapNode[]> {
      if (depth > 5) return [];
      const entries = await fs.readdir(dirPath, { withFileTypes: true });
      const nodes: RepoMapNode[] = [];
      for (const entry of entries) {
        if (entry.name.startsWith('.') && entry.name !== '.git') continue;
        if (entry.name === 'node_modules' || entry.name === '.next' || entry.name === 'dist') continue;
        const fullPath = path.join(dirPath, entry.name);
        if (entry.isDirectory()) {
          const children = await scan(fullPath, depth + 1);
          if (children.length > 0) {
            nodes.push({ name: entry.name, path: fullPath, type: 'directory', children });
          }
        } else {
          const ext = path.extname(entry.name);
          const langMap: Record<string, string> = { '.ts': 'typescript', '.tsx': 'typescript', '.js': 'javascript', '.jsx': 'javascript', '.py': 'python', '.go': 'go', '.rs': 'rust', '.json': 'json', '.md': 'markdown', '.css': 'css', '.html': 'html' };
          nodes.push({ name: entry.name, path: fullPath, type: 'file', language: langMap[ext] });
        }
      }
      return nodes;
    }

    const children = await scan(this.rootPath);
    return { name: path.basename(this.rootPath), path: this.rootPath, type: 'directory', children };
  }

  async findSymbol(symbolName: string, files?: string[]): Promise<SymbolInfo[]> {
    const fs = await import('fs/promises');
    const results: SymbolInfo[] = [];
    const targetFiles = files || [];

    for (const filePath of targetFiles) {
      try {
        const content = await fs.readFile(filePath, 'utf-8');
        const lines = content.split('\n');
        for (let i = 0; i < lines.length; i++) {
          const line = lines[i];
          const patterns = [
            { regex: new RegExp(`(?:export\\s+)?(?:async\\s+)?function\\s+${symbolName}`), type: 'function' as const },
            { regex: new RegExp(`(?:export\\s+)?class\\s+${symbolName}`), type: 'class' as const },
            { regex: new RegExp(`(?:export\\s+)?interface\\s+${symbolName}`), type: 'interface' as const },
            { regex: new RegExp(`(?:export\\s+)?(?:const|let|var)\\s+${symbolName}`), type: 'variable' as const },
            { regex: new RegExp(`(?:export\\s+)?type\\s+${symbolName}`), type: 'type' as const },
          ];
          for (const p of patterns) {
            if (p.regex.test(line)) {
              results.push({ name: symbolName, type: p.type, line: i + 1, signature: line.trim() });
            }
          }
        }
      } catch { /* skip unreadable files */ }
    }
    return results;
  }

  async getDependencies(filePath: string): Promise<string[]> {
    const fs = await import('fs/promises');
    try {
      const content = await fs.readFile(filePath, 'utf-8');
      const imports = content.match(/(?:import|require)\s*[\(]?\s*['"]([^'"]+)['"]/g) || [];
      return imports.map(i => i.replace(/(?:import|require)\s*[\(]?\s*['"]/, '').replace(/['"]/, '')).filter(Boolean);
    } catch {
      return [];
    }
  }
}
