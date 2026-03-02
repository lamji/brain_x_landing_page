export interface MCPToolCall {
  tool: string;
  arguments: Record<string, unknown>;
  output?: Record<string, unknown> | string;
}

export interface WorkflowPhase {
  id: string;
  title: string;
  status: "complete" | "in_progress" | "pending";
  description?: string;
  toolCalls?: MCPToolCall[];
  bindingRules?: string[];
  requiredFiles?: string[];
  notes?: string[];
}

export interface ConversationMessage {
  role: "user" | "assistant" | "system";
  content: string;
  timestamp?: string;
}

export interface WorkflowDemoData {
  taskId: string;
  userRequest: string;
  phases: WorkflowPhase[];
  conversationFlow?: ConversationMessage[];
}
