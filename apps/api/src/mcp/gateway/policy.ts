import { getToolByName } from '@omcode/mcp-clients';

export class McpPolicyEngine {
  constructor(
    private userRole: string,
    _workspaceId: string,
  ) {}

  canExecute(toolName: string): { allowed: boolean; requiresApproval: boolean; reason?: string } {
    const tool = getToolByName(toolName);
    if (!tool) {
      return {
        allowed: false,
        requiresApproval: false,
        reason: `Tool ${toolName} not found in registry.`,
      };
    }

    if (tool.type === 'read') {
      return { allowed: true, requiresApproval: false };
    }

    if (tool.type === 'write') {
      if (this.userRole === 'viewer') {
        return {
          allowed: false,
          requiresApproval: false,
          reason: 'Viewers cannot execute write tools.',
        };
      }
      return { allowed: true, requiresApproval: true };
    }

    if (tool.type === 'admin') {
      if (this.userRole !== 'admin') {
        return {
          allowed: false,
          requiresApproval: false,
          reason: 'Only admins can execute admin tools.',
        };
      }
      return { allowed: true, requiresApproval: true };
    }

    return { allowed: false, requiresApproval: false, reason: 'Unknown tool type.' };
  }
}
