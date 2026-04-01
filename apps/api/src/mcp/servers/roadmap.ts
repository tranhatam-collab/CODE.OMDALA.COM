import { z } from 'zod';

export interface RoadmapItem {
  id: string;
  title: string;
  status: 'todo' | 'in_progress' | 'done';
  phase: number;
}

export class RoadmapMcpServer {
  private roadmapPath: string;

  constructor(path: string) {
    this.roadmapPath = path;
  }

  async readRoadmap(): Promise<RoadmapItem[]> {
    return [
      { id: '1', title: 'API Gateway Foundation', status: 'done', phase: 2 },
      { id: '2', title: 'MCP Expansion', status: 'in_progress', phase: 7 },
      { id: '3', title: 'Public Launch', status: 'todo', phase: 8 },
    ];
  }

  async updateRoadmap(
    itemId: string,
    status: 'todo' | 'in_progress' | 'done',
  ): Promise<{ success: boolean; item: RoadmapItem }> {
    z.object({ itemId: z.string(), status: z.enum(['todo', 'in_progress', 'done']) }).parse({ itemId, status });
    // Requires approval
    return { success: true, item: { id: itemId, title: 'Updated Item', status, phase: 0 } };
  }

  async generateRoadmap(issuesOrPrs: string[]): Promise<RoadmapItem[]> {
    z.array(z.string()).parse(issuesOrPrs);
    return issuesOrPrs.map((i, index) => ({
      id: `auto-${index}`,
      title: i,
      status: 'todo',
      phase: 1,
    }));
  }

  async trackProgress(): Promise<{ completed: number; total: number; percentage: number }> {
    const rm = await this.readRoadmap();
    const done = rm.filter((r) => r.status === 'done').length;
    return { completed: done, total: rm.length, percentage: Math.round((done / rm.length) * 100) };
  }
}
