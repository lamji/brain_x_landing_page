"use client";

import { FeatureCard, PreventionMechanism, DebugPractice } from "@/domain/landing/types";

export function useLanding() {
  const features: FeatureCard[] = [
    {
      id: "autonomous",
      title: "Autonomous Execution",
      description: "Self-directed task completion with minimal human intervention. BrainX plans, executes, and validates work autonomously.",
      icon: "brain-circuit"
    },
    {
      id: "memory",
      title: "Persistent Memory",
      description: "RAG-powered knowledge retention across sessions. Learn from mistakes, remember context, and evolve continuously.",
      icon: "database"
    },
    {
      id: "validation",
      title: "Built-in Validation",
      description: "Automated lint, build, and compliance gates ensure production-ready code every time. Zero shortcuts.",
      icon: "shield-check"
    }
  ];

  const preventionMechanisms: PreventionMechanism[] = [
    {
      id: "anti-hallucination",
      title: "Anti-Hallucination",
      description: "MCP workflow gates prevent self-approval and improvisation. Every action must pass through mandatory checkpoints.",
      icon: "lock",
      details: [
        "No self-approval of code changes",
        "Mandatory workflow_step_start before any action",
        "Mandatory workflow_step_complete after execution",
        "All progression is MCP-validated"
      ]
    },
    {
      id: "anti-zombie",
      title: "Anti-Zombie Mode",
      description: "Locked state machine prevents AI from doing things on its own terms. Cannot skip, merge, or simulate steps.",
      icon: "shield-check",
      details: [
        "Cannot skip workflow steps",
        "Cannot merge multiple steps",
        "Cannot internally simulate execution",
        "Explicit step authorization required"
      ]
    },
    {
      id: "stack-locking",
      title: "Stack Locking",
      description: "Only approved technology stacks are allowed. Out-of-stack tasks are automatically rejected at the gate.",
      icon: "code",
      details: [
        "Coding task gate validates all requests",
        "Stack normalization and validation",
        "Rejection with clear error codes",
        "Zero unauthorized technology usage"
      ]
    }
  ];

  const approvedStacks: string[] = [
    "MERN",
    "Next.js",
    "Shadcn UI",
    "Tailwind CSS",
    "React Query",
    "Redux Toolkit",
    "TanStack Table",
    "TypeScript",
    "Node.js",
    "MCP",
    "Markdown"
  ];

  const debugPractices: DebugPractice[] = [
    {
      id: "root-cause",
      title: "Root Cause Analysis",
      description: "Prefer minimal upstream fixes over downstream workarounds. Identify the root cause before implementing any solution.",
      icon: "search",
      keyPoints: [
        "Address root cause, not symptoms",
        "Avoid band-aid solutions",
        "Single-line changes when sufficient",
        "Verify bug location carefully"
      ]
    },
    {
      id: "regression-testing",
      title: "Regression Testing",
      description: "Every bug fix includes regression tests to prevent the same issue from recurring. Keep implementation minimal.",
      icon: "test-tube-2",
      keyPoints: [
        "Add tests for every bug fix",
        "Prevent recurring issues",
        "Automated test execution",
        "Minimal implementation approach"
      ]
    },
    {
      id: "test-id-coverage",
      title: "Test ID Coverage",
      description: "EVERY interactive element must have a data-test-id attribute. When API calls fail, error logs show the exact data-test-id - instantly identifying the source without scanning files.",
      icon: "tag",
      keyPoints: [
        "Instant error source identification",
        "Avoid scanning files for bug location",
        "Error logs: 'API failed at data-test-id=login-submit-button'",
        "Enables Playwright E2E testing",
        "Works with browser DevTools and logging"
      ]
    }
  ];

  const codeExample = `// ✅ Correct: Every interactive element has data-test-id
<Button 
  data-test-id="login-submit-button"
  onClick={handleSubmit}
>
  Submit
</Button>

<Input 
  data-test-id="login-email-input"
  type="email"
  value={email}
/>

// ❌ Wrong: Missing data-test-id
<Button onClick={handleSubmit}>
  Submit
</Button>`;

  const debuggingTools: string[] = [
    "Playwright",
    "Browser DevTools",
    "React DevTools",
    "Network Tab",
    "Console Logging"
  ];

  const installationSteps: string[] = [
    "Clone the repository: git clone https://github.com/your-org/brainx.git",
    "Navigate to brain directory: cd brainx/brain",
    "Install dependencies: npm install",
    "Configure environment: cp .env.example .env",
    "Start MCP server: npm run mcp:start"
  ];

  const mcpConfigExample = `{
  "mcpServers": {
    "brain": {
      "command": "node",
      "args": ["/path/to/brainx/brain/mcp-server.js"],
      "env": {
        "BRAIN_CONFIG_DIR": "/path/to/brainx/brain",
        "QDRANT_URL": "http://localhost:6333",
        "OLLAMA_BASE_URL": "http://localhost:11434"
      }
    }
  }
}`;

  return {
    features,
    preventionMechanisms,
    approvedStacks,
    debugPractices,
    codeExample,
    debuggingTools,
    installationSteps,
    mcpConfigExample
  };
}
