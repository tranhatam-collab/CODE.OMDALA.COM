export interface LogEvent {
  reqId: string;
  timestamp: string;
  level: 'info' | 'warn' | 'error' | 'debug';
  message: string;
  metadata: Record<string, unknown>;
}

export class ObservabilityLogger {
  private static events: LogEvent[] = [];

  static log(level: 'info' | 'warn' | 'error' | 'debug', msg: string, reqId: string, meta?: Record<string, unknown>) {
    const event: LogEvent = {
      reqId,
      timestamp: new Date().toISOString(),
      level,
      message: msg,
      metadata: meta || {}
    };
    this.events.push(event);
    if (this.events.length > 1000) this.events.shift(); // keep last 1000 in memory
    
    // In production, this should write to D1 or structured logging service
    console.log(`[${event.level.toUpperCase()}] ${event.timestamp} [${event.reqId}]: ${msg}`, meta ? JSON.stringify(meta) : '');
  }

  static getRecentLogs(limit = 100): LogEvent[] {
    return this.events.slice(-limit);
  }
}
