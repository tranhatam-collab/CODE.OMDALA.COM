export type GitStatus = 'clean' | 'modified' | 'untracked' | 'staged' | 'conflicted';

export interface GitFileInfo {
  path: string;
  status: GitStatus;
  staged: boolean;
}

export interface GitRepoInfo {
  isRepo: boolean;
  branch?: string;
  remote?: string;
  status: GitFileInfo[];
  hasChanges: boolean;
  hasStaged: boolean;
  hasConflicts: boolean;
}

export function parseGitStatusLine(line: string): GitFileInfo | null {
  if (line.length < 3) return null;
  const xy = line.substring(0, 2);
  const path = line.substring(3);
  const isStaged = xy[0] !== ' ' && xy[0] !== '?';
  const isUntracked = xy === '??';
  const isConflicted = xy.includes('U') || (xy.includes('A') && xy.includes('A'));
  let status: GitStatus = 'clean';
  if (isUntracked) status = 'untracked';
  else if (isConflicted) status = 'conflicted';
  else if (isStaged || xy[1] !== ' ') status = 'modified';
  else if (xy[0] === ' ') status = 'clean';
  return { path, status, staged: isStaged };
}

export function summarizeGitStatus(info: GitRepoInfo): string {
  if (!info.isRepo) return 'Not a git repository';
  const parts: string[] = [`Branch: ${info.branch || 'unknown'}`];
  if (info.hasConflicts) parts.push('⚠ Merge conflicts detected');
  if (info.hasStaged) parts.push(`${info.status.filter((f) => f.staged).length} staged files`);
  const unstaged = info.status.filter((f) => !f.staged && f.status !== 'clean');
  if (unstaged.length > 0) parts.push(`${unstaged.length} unstaged changes`);
  if (!info.hasChanges && !info.hasStaged) parts.push('Working tree clean');
  return parts.join('\n');
}
