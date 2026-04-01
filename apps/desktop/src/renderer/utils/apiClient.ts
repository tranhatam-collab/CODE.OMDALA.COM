const API_BASE = 'http://localhost:8787';

export const apiClient = {
  chat: async (projectId: string, userMessage: string) => {
    const res = await fetch(`${API_BASE}/v1/ai/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ task: 'chat', context: { projectId, userMessage } }),
    });
    return res.json();
  },
  getRepoMap: async (path: string) => {
    const res = await fetch(`${API_BASE}/internal/context/repo-map?path=${encodeURIComponent(path)}`);
    return res.json();
  }
};
