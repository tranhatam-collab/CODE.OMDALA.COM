export const FEATURES = {
  mcpLayer: { enabled: true, phase: 1 },
  multiProvider: { enabled: true, phase: 1 },
  localProjectAccess: { enabled: true, phase: 1 },
  commandApproval: { enabled: true, phase: 1 },
  promptRegistry: { enabled: true, phase: 1 },
  teamWorkspaces: { enabled: false, phase: 3 },
  agentProfiles: { enabled: false, phase: 2 },
  selfHost: { enabled: false, phase: 3 },
} as const;

export type FeatureFlag = keyof typeof FEATURES;

export function isFeatureEnabled(flag: FeatureFlag): boolean {
  return FEATURES[flag].enabled;
}

export function getFeaturePhase(flag: FeatureFlag): number {
  return FEATURES[flag].phase;
}
