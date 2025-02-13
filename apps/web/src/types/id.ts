export type AgentId = number;
export type PostGroupId = number;
export type PostId = number;

export type IdParams = {
  agentId: AgentId;
  postGroupId: PostGroupId;
  postId?: PostId;
};
