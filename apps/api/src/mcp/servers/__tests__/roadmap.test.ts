import { RoadmapMcpServer } from '../roadmap';

describe('RoadmapMcpServer', () => {
  const server = new RoadmapMcpServer('/tmp/roadmap.json');

  it('should read roadmap', async () => {
    const roadmap = await server.readRoadmap();
    expect(Array.isArray(roadmap)).toBe(true);
    expect(roadmap.length).toBeGreaterThan(0);
  });

  it('should track progress correctly', async () => {
    const progress = await server.trackProgress();
    expect(progress).toHaveProperty('percentage');
  });
});
