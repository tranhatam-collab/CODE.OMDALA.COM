export type CommandTier = 'safe' | 'review' | 'dangerous';

export interface CommandDefinition {
  command: string;
  tier: CommandTier;
  description: string;
}

export const COMMAND_TIERS: Record<CommandTier, string[]> = {
  safe: [
    'ls',
    'cat',
    'grep',
    'find',
    'git status',
    'git diff',
    'git log',
    'pwd',
    'echo',
    'head',
    'tail',
    'wc',
    'tree',
  ],
  review: [
    'npm install',
    'pnpm install',
    'yarn install',
    'git add',
    'git commit',
    'git push',
    'git pull',
    'mkdir',
    'cp',
    'mv',
    'touch',
  ],
  dangerous: ['rm -rf', 'sudo', 'curl | bash', 'wget | sh', 'dd', 'mkfs', 'chmod 777', 'chown'],
};

export function classifyCommand(cmd: string): CommandTier {
  const normalized = cmd.trim().toLowerCase();
  for (const c of COMMAND_TIERS.dangerous) {
    if (normalized.startsWith(c)) return 'dangerous';
  }
  for (const c of COMMAND_TIERS.review) {
    if (normalized.startsWith(c)) return 'review';
  }
  for (const c of COMMAND_TIERS.safe) {
    if (normalized.startsWith(c)) return 'safe';
  }
  return 'review';
}

export function isSafeCommand(cmd: string): boolean {
  return classifyCommand(cmd) === 'safe';
}

export function requiresApproval(cmd: string): boolean {
  const tier = classifyCommand(cmd);
  return tier === 'review' || tier === 'dangerous';
}
