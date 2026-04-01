import React from 'react';
import { Button } from '@omcode/ui';

interface ApprovalProps {
  id: string;
  toolName: string;
  payload: Record<string, unknown>;
  onApprove: (id: string) => void;
  onReject: (id: string) => void;
}

export const ApprovalUI: React.FC<ApprovalProps> = ({ id, toolName, payload, onApprove, onReject }) => (
  <div style={{ padding: '16px', borderRadius: '8px', border: '1px solid #f59e0b', background: '#2d2d44', marginBottom: '8px' }}>
    <h3 style={{ fontSize: '14px', color: '#f59e0b' }}>⚠️ Approval Required: {toolName}</h3>
    <pre style={{ fontSize: '12px', color: '#e2e8f0', background: '#1e1e3a', padding: '8px', marginTop: '8px' }}>
      {JSON.stringify(payload, null, 2)}
    </pre>
    <div style={{ display: 'flex', gap: '8px', marginTop: '12px' }}>
      <Button variant="primary" onClick={() => onApprove(id)}>Approve</Button>
      <Button variant="danger" onClick={() => onReject(id)}>Reject</Button>
    </div>
  </div>
);
