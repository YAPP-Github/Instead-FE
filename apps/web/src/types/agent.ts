export type AgentPlan = 'BASIC' | 'PREMIUM';

export const AGENT_PLAN: Record<AgentPlan, string> = {
  BASIC: '무료',
  PREMIUM: '프리미엄 플러스',
};

export type AgentTone = 'CASUAL' | 'LESS_FORMAL' | 'MORE_FORMAL' | 'CUSTOM';

export const AGENT_TONE = {
  CASUAL: '~해요',
  LESS_FORMAL: '~해',
  MORE_FORMAL: '~합니다',
  CUSTOM: '직접 입력할게요',
} as const;

export interface Agent {
  id: number;
  createdAt: string;
  platform: 'X' | 'THREADS' | 'INSTAGRAM';
  accountName: string;
  bio: string;
  profileImageUrl: string;
  agentPlan: AgentPlan;
  autoMode: boolean;
}
