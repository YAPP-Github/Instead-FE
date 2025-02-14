export const AGENT_PLAN = {
  BASIC: 'BASIC',
  PREMIUM: 'PREMIUM',
} as const;

export type AgentPlan = (typeof AGENT_PLAN)[keyof typeof AGENT_PLAN];
