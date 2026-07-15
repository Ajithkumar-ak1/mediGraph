export type Role = 'user' | 'assistant';

export type ReasoningStep = {
  title: string;
  detail?: string;
};

export type EvidenceItem = {
  text: string;
};

export type GraphPath = {
  nodes: string[];
  edges: string[];
};

export type AskResponse = {
  answer: string;
  reasoning: ReasoningStep[];
  evidence: EvidenceItem[];
  paths: GraphPath[];
};

export type ChatMessageData = {
  id: string;
  role: Role;
  content: string;
  loading?: boolean;
  error?: boolean;
  response?: AskResponse;
};
