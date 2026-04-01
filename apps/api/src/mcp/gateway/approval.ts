export interface ApprovalRequest {
  id: string;
  toolName: string;
  server: string;
  payload: Record<string, unknown>;
  requestedBy: string;
  status: 'pending' | 'approved' | 'rejected' | 'expired';
  createdAt: number;
}

export class ApprovalManager {
  private queue = new Map<string, ApprovalRequest>();

  requestApproval(req: Omit<ApprovalRequest, 'id' | 'status' | 'createdAt'>): string {
    const id = crypto.randomUUID();
    this.queue.set(id, { ...req, id, status: 'pending', createdAt: Date.now() });
    return id;
  }

  getPending(_userId: string): ApprovalRequest[] {
    return Array.from(this.queue.values()).filter((r) => r.status === 'pending');
  }

  approve(id: string, _adminId: string): boolean {
    const req = this.queue.get(id);
    if (!req || req.status !== 'pending') return false;
    req.status = 'approved';
    this.queue.set(id, req);
    return true;
  }

  reject(id: string, _reason: string, _adminId: string): boolean {
    const req = this.queue.get(id);
    if (!req || req.status !== 'pending') return false;
    req.status = 'rejected';
    this.queue.set(id, req);
    return true;
  }

  checkStatus(id: string): ApprovalRequest['status'] | 'not_found' {
    const req = this.queue.get(id);
    if (!req) return 'not_found';
    if (req.status === 'pending' && Date.now() - req.createdAt > 5 * 60 * 1000) {
      req.status = 'expired';
      this.queue.set(id, req);
    }
    return req.status;
  }
}
