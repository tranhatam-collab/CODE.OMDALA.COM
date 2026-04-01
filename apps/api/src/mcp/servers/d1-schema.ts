import { z } from 'zod';

export interface D1SchemaMcpConfig {
  dbId: string;
  apiToken: string;
  accountId: string;
}

export class D1SchemaMcpServer {
  private config: D1SchemaMcpConfig;
  constructor(config: D1SchemaMcpConfig) {
    this.config = config;
  }

  async readSchema(): Promise<string> {
    return `CREATE TABLE workspaces ( id TEXT PRIMARY KEY, name TEXT );`;
  }

  async generateMigration(changes: string): Promise<string> {
    z.string().parse(changes);
    return `-- Migration generated for: ${changes}\nALTER TABLE workspaces ADD COLUMN created_at TEXT;`;
  }

  async validateMigration(sql: string): Promise<{ safe: boolean; warnings: string[] }> {
    z.string().parse(sql);
    if (sql.toLowerCase().includes('drop table'))
      return { safe: false, warnings: ['Destructive DROP TABLE detected'] };
    return { safe: true, warnings: [] };
  }

  async applyMigration(sql: string): Promise<{ success: boolean; rowsAffected: number }> {
    z.string().parse(sql);
    // CRITICAL: Requires strict approval
    return { success: true, rowsAffected: 1 };
  }

  async rollbackMigration(version: string): Promise<{ success: boolean; rowsAffected: number }> {
    z.string().parse(version);
    // CRITICAL: Requires admin approval
    return { success: true, rowsAffected: 1 };
  }

  async querySchema(sql: string): Promise<Record<string, unknown>[]> {
    z.string().parse(sql);
    if (
      sql.toLowerCase().includes('drop') ||
      sql.toLowerCase().includes('delete') ||
      sql.toLowerCase().includes('update') ||
      sql.toLowerCase().includes('insert')
    ) {
      throw new Error('Only read-only queries allowed in querySchema');
    }
    return [{ table_name: 'workspaces' }];
  }
}
