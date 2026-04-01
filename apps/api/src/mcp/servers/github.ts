export interface GitHubMcpConfig {
  token: string;
  owner: string;
  repo: string;
  baseUrl?: string;
}

export interface FileEntry {
  name: string;
  path: string;
  type: 'file' | 'dir';
  size?: number;
}
export interface BranchInfo {
  name: string;
  sha: string;
  protected: boolean;
}
export interface CommitInfo {
  sha: string;
  message: string;
  author: string;
  date: string;
}
export interface PullRequestInfo {
  number: number;
  title: string;
  state: string;
  url: string;
}

export class GitHubMcpServer {
  private config: GitHubMcpConfig;
  private baseUrl: string;

  constructor(config: GitHubMcpConfig) {
    this.config = config;
    this.baseUrl = config.baseUrl || 'https://api.github.com';
  }

  async readRepo(): Promise<{ defaultBranch: string; fullName: string; url: string }> {
    const res = await this.fetch(`/repos/${this.config.owner}/${this.config.repo}`);
    return { defaultBranch: res.default_branch, fullName: res.full_name, url: res.html_url };
  }

  async listBranches(): Promise<BranchInfo[]> {
    const res = await this.fetch(
      `/repos/${this.config.owner}/${this.config.repo}/branches?per_page=100`,
    );
    return res.map((b: any) => ({ name: b.name, sha: b.commit.sha, protected: b.protected }));
  }

  async readFile(path: string, branch?: string): Promise<string> {
    const ref = branch || 'main';
    const res = await this.fetch(
      `/repos/${this.config.owner}/${this.config.repo}/contents/${path}?ref=${ref}`,
    );
    const content = Buffer.from(res.content, 'base64').toString('utf-8');
    return content;
  }

  async listFiles(dirPath: string, branch?: string): Promise<FileEntry[]> {
    const ref = branch || 'main';
    const res = await this.fetch(
      `/repos/${this.config.owner}/${this.config.repo}/contents/${dirPath}?ref=${ref}`,
    );
    const items = Array.isArray(res) ? res : [res];
    return items.map((item: any) => ({
      name: item.name,
      path: item.path,
      type: item.type,
      size: item.size,
    }));
  }

  async createBranch(branchName: string, baseSha?: string): Promise<{ name: string; sha: string }> {
    const repo = await this.readRepo();
    const baseRef = await this.fetch(
      `/repos/${this.config.owner}/${this.config.repo}/git/ref/heads/${repo.defaultBranch}`,
    );
    const newSha = baseSha || baseRef.object.sha;
    await this.fetch(`/repos/${this.config.owner}/${this.config.repo}/git/refs`, {
      method: 'POST',
      body: JSON.stringify({ ref: `refs/heads/${branchName}`, sha: newSha }),
    });
    return { name: branchName, sha: newSha };
  }

  async createPr(
    title: string,
    body: string,
    head: string,
    base?: string,
  ): Promise<PullRequestInfo> {
    const res = await this.fetch(`/repos/${this.config.owner}/${this.config.repo}/pulls`, {
      method: 'POST',
      body: JSON.stringify({ title, body, head, base: base || this.config.repo }),
    });
    return { number: res.number, title: res.title, state: res.state, url: res.html_url };
  }

  async listCommits(sha?: string, perPage: number = 30): Promise<CommitInfo[]> {
    const params = new URLSearchParams({ per_page: String(perPage) });
    if (sha) params.set('sha', sha);
    const res = await this.fetch(
      `/repos/${this.config.owner}/${this.config.repo}/commits?${params}`,
    );
    return res.map((c: any) => ({
      sha: c.sha,
      message: c.commit.message,
      author: c.commit.author?.name || 'unknown',
      date: c.commit.author?.date || '',
    }));
  }

  async getCommitDiff(sha: string): Promise<string> {
    const res = await fetch(
      `${this.baseUrl}/repos/${this.config.owner}/${this.config.repo}/commits/${sha}`,
      {
        headers: {
          Authorization: `Bearer ${this.config.token}`,
          Accept: 'application/vnd.github.v3.diff',
        },
      },
    );
    return res.text();
  }

  private async fetch(path: string, init?: RequestInit): Promise<any> {
    const res = await fetch(`${this.baseUrl}${path}`, {
      ...init,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.config.token}`,
        ...init?.headers,
      },
    });
    if (!res.ok) throw new Error(`GitHub API error: ${res.status} ${res.statusText}`);
    return res.json();
  }
}
