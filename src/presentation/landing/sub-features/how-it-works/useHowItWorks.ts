"use client";

import { FeatureSection } from "@/domain/how-it-works/types";

export function useHowItWorks() {
  const sections: FeatureSection[] = [
    {
      id: "mcp-protocol",
      icon: "workflow",
      title: "MCP Workflow State Machine",
      description: "BrainX operates on a locked state machine with mandatory execution gates. Every task flows through a deterministic sequence of steps that cannot be skipped, merged, or simulated.",
      keyPoints: [
        "STEP_1: MCP Handshake - Initialize session and load policies",
        "STEP_2: Context Classification - Identify task type (BUG/FEATURE/UPDATE)",
        "STEP_3: Isolated Implementation - Apply minimal, focused changes",
        "STEP_4: Reporting - Generate structured execution report",
        "STEP_5: Lint Gate - Validate code quality (blocking)",
        "STEP_6: Build Gate - Verify production readiness (blocking)",
        "STEP_7: Project Logging - Persist execution metrics to RAG memory"
      ]
    },
    {
      id: "rag-memory",
      icon: "database",
      title: "RAG Memory System",
      description: "Persistent semantic memory powered by Qdrant vector database and Ollama embeddings. Every action, decision, and outcome is stored for future retrieval and learning.",
      keyPoints: [
        "Qdrant Cloud vector database for scalable semantic search",
        "Ollama embeddings (nomic-embed-text) for natural language queries",
        "Structured metadata filters (status, approver, risk level, date range)",
        "Pagination and score thresholds for precise retrieval",
        "Immutable audit trails for all DB operations and approvals"
      ]
    },
    {
      id: "learning-modules",
      icon: "brain",
      title: "Self-Evolving Learning",
      description: "Five integrated learning modules that make BrainX smarter with every task. The system learns from successes, mistakes, and external knowledge sources.",
      keyPoints: [
        "Conversation Learning: Tracks wins, fixes, and mistakes from every task",
        "URL Knowledge Ingestion: Learns from external documentation and guides",
        "Mistake Pattern Detection: Aggregates failures to avoid repeated errors",
        "Memory Feedback Loop: Updates memory scores based on retrieval success",
        "Adaptive Weight Engine: Dynamically adjusts trust and reasoning weights"
      ]
    },
    {
      id: "safety-guardrails",
      icon: "shield",
      title: "Safety & Guardrails",
      description: "Multi-layered safety system ensures no destructive action happens without explicit approval. Every risky operation requires human verification.",
      keyPoints: [
        "DB Guardrail: Approval + password verification before any DB write",
        "Coding Task Gate: Stack validation against approved profile",
        "Risk Level Assessment: HIGH/MEDIUM/LOW classification for operations",
        "Audit Persistence: Every approval/denial saved to RAG with full context",
        "Out-of-Stack Rejection: Tasks outside approved stacks are blocked"
      ]
    },
    {
      id: "sequential-thinking",
      icon: "zap",
      title: "Sequential Thinking",
      description: "For complex tasks, BrainX is required to plan before executing. Multi-step reasoning with revision and branching capabilities ensures thoughtful implementation.",
      keyPoints: [
        "Mandatory planning for complex tasks (configurable threshold)",
        "Thought-by-thought progression with explicit completion signals",
        "Revision support: can revise previous thoughts when needed",
        "Branching: explore alternative approaches from any thought",
        "Blocked execution until planning phase completes"
      ]
    }
  ];

  return {
    sections
  };
}
