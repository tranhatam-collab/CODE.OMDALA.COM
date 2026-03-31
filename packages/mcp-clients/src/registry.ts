export type AgentRole = 'planner' | 'builder' | 'reviewer' | 'docs_helper' | 'release_helper';

export interface McpToolDefinition {
  name: string;
  server: string;
  type: 'read' | 'write' | 'admin';
  description: string;
  trustLevel: 'low' | 'medium' | 'high' | 'critical';
  requiresApproval: boolean;
}

export const AGENT_TOOL_MAP: Record<AgentRole, string[]> = {
  planner: ['read_repo', 'build_repo_map', 'analyze_structure', 'list_branches', 'read_file', 'read_docs', 'read_roadmap'],
  builder: ['read_file', 'read_repo', 'create_branch', 'create_pr', 'generate_docs', 'generate_contract'],
  reviewer: ['read_file', 'read_repo', 'validate_contract', 'validate_docs', 'list_commits', 'read_commit'],
  docs_helper: ['read_docs', 'generate_docs', 'update_docs', 'validate_docs', 'search_docs', 'translate_docs'],
  release_helper: ['list_commits', 'generate_changelog', 'check_breaking_changes', 'read_roadmap', 'update_roadmap'],
};

export const CAPABILITY_REGISTRY: McpToolDefinition[] = [
  { name: 'read_repo', server: 'github', type: 'read', description: 'Clone or fetch repository metadata', trustLevel: 'high', requiresApproval: false },
  { name: 'list_branches', server: 'github', type: 'read', description: 'List branches with metadata', trustLevel: 'high', requiresApproval: false },
  { name: 'read_file', server: 'github', type: 'read', description: 'Read file content at path', trustLevel: 'high', requiresApproval: false },
  { name: 'list_files', server: 'github', type: 'read', description: 'List files in directory tree', trustLevel: 'high', requiresApproval: false },
  { name: 'create_branch', server: 'github', type: 'write', description: 'Create new branch from base', trustLevel: 'high', requiresApproval: true },
  { name: 'create_pr', server: 'github', type: 'write', description: 'Open pull request', trustLevel: 'high', requiresApproval: true },
  { name: 'merge_pr', server: 'github', type: 'admin', description: 'Merge pull request', trustLevel: 'critical', requiresApproval: true },
  { name: 'build_repo_map', server: 'repo-map', type: 'read', description: 'Generate file tree with metadata', trustLevel: 'high', requiresApproval: false },
  { name: 'find_symbol', server: 'repo-map', type: 'read', description: 'Find function, class, or variable definitions', trustLevel: 'high', requiresApproval: false },
  { name: 'read_docs', server: 'docs', type: 'read', description: 'Read documentation files', trustLevel: 'medium', requiresApproval: false },
  { name: 'generate_docs', server: 'docs', type: 'write', description: 'Generate docs from code or specs', trustLevel: 'medium', requiresApproval: true },
  { name: 'update_docs', server: 'docs', type: 'write', description: 'Update existing documentation', trustLevel: 'medium', requiresApproval: true },
  { name: 'validate_docs', server: 'docs', type: 'read', description: 'Check docs for broken links', trustLevel: 'medium', requiresApproval: false },
  { name: 'translate_docs', server: 'docs', type: 'write', description: 'Translate docs between vi/en', trustLevel: 'medium', requiresApproval: true },
  { name: 'read_contracts', server: 'api-contract', type: 'read', description: 'Read existing API contracts', trustLevel: 'medium', requiresApproval: false },
  { name: 'generate_contract', server: 'api-contract', type: 'write', description: 'Generate API contract from code', trustLevel: 'medium', requiresApproval: true },
  { name: 'validate_contract', server: 'api-contract', type: 'read', description: 'Validate implementation against contract', trustLevel: 'medium', requiresApproval: false },
  { name: 'read_schema', server: 'd1-schema', type: 'read', description: 'Read current database schema', trustLevel: 'high', requiresApproval: false },
  { name: 'apply_migration', server: 'd1-schema', type: 'write', description: 'Apply database migration', trustLevel: 'critical', requiresApproval: true },
  { name: 'rollback_migration', server: 'd1-schema', type: 'admin', description: 'Rollback last migration', trustLevel: 'critical', requiresApproval: true },
  { name: 'read_tokens', server: 'design-token', type: 'read', description: 'Read current design tokens', trustLevel: 'medium', requiresApproval: false },
  { name: 'update_tokens', server: 'design-token', type: 'write', description: 'Update design token values', trustLevel: 'medium', requiresApproval: true },
  { name: 'read_roadmap', server: 'roadmap', type: 'read', description: 'Read current roadmap', trustLevel: 'medium', requiresApproval: false },
  { name: 'update_roadmap', server: 'roadmap', type: 'write', description: 'Update roadmap items', trustLevel: 'medium', requiresApproval: true },
];

export function getToolsForAgent(role: AgentRole): McpToolDefinition[] {
  const toolNames = AGENT_TOOL_MAP[role] || [];
  return CAPABILITY_REGISTRY.filter(t => toolNames.includes(t.name));
}

export function getToolByName(name: string): McpToolDefinition | undefined {
  return CAPABILITY_REGISTRY.find(t => t.name === name);
}

export function getToolsByServer(server: string): McpToolDefinition[] {
  return CAPABILITY_REGISTRY.filter(t => t.server === server);
}

export function getToolsByType(type: 'read' | 'write' | 'admin'): McpToolDefinition[] {
  return CAPABILITY_REGISTRY.filter(t => t.type === type);
}
