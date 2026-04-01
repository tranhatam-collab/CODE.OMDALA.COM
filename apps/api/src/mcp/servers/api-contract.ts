export class ApiContractMcpServer {
  async readContracts(_path: string): Promise<Record<string, unknown>> {
    return {
      version: '1.0',
      endpoints: [{ path: '/v1/users', method: 'GET', response: 'User[]' }],
    };
  }

  async generateContract(_codePath: string): Promise<Record<string, unknown>> {
    // Requires approval
    return { version: 'draft', endpoints: [] };
  }

  async validateContract(
    _implPath: string,
    _contractPath: string,
  ): Promise<{ valid: boolean; errors: string[] }> {
    return { valid: true, errors: [] };
  }
}
