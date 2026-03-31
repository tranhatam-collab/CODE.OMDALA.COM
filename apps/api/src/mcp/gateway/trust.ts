export type TrustLevel = 'low' | 'medium' | 'high' | 'critical';

export interface TrustScore {
  level: TrustLevel;
  confidence: number;
  factors: { name: string; impact: number }[];
}

export function evaluateTrust(toolLevel: TrustLevel, responseData: unknown, providerHealth: 'healthy' | 'degraded' | 'down'): TrustScore {
  let confidence = 100;
  const factors = [];

  if (providerHealth === 'degraded') {
    confidence -= 20;
    factors.push({ name: 'Provider Health Degraded', impact: -20 });
  }

  if (Array.isArray(responseData) && responseData.length === 0) {
    confidence -= 10;
    factors.push({ name: 'Empty Response Array', impact: -10 });
  }

  if (typeof responseData === 'object' && responseData !== null && 'error' in responseData) {
    confidence -= 50;
    factors.push({ name: 'Error Field in Response', impact: -50 });
  }

  let finalLevel = toolLevel;
  if (confidence < 60 && toolLevel !== 'low') {
    finalLevel = 'low'; // Downgrade trust if confidence is low
  }

  return { level: finalLevel, confidence, factors };
}
