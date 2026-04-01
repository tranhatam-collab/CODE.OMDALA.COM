import { DocsMcpServer } from '../docs';

describe('DocsMcpServer', () => {
  const server = new DocsMcpServer();

  it('should read docs', async () => {
    const result = await server.readDocs('test/path');
    expect(result).toContain('# Mock Docs');
  });

  it('should validate docs', async () => {
    const result = await server.validateDocs('test/path');
    expect(result.valid).toBe(true);
  });
});
