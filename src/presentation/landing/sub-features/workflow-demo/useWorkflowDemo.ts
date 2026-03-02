"use client";

import { WorkflowDemoData } from "@/domain/workflow-demo/types";

export function useWorkflowDemo() {
  const demoData: WorkflowDemoData = {
    taskId: "brainx-landing-page-001",
    userRequest: "/brain_init design me a landing page for ai agent called BrainX in projects/brain-_landing_lage. make it futurristic. use framer motion. bypass techstack and add framer. follow the fucking mcp response",
    phases: [
      {
        id: "phase-0",
        title: "PHASE 0 — MCP Handshake Complete ✓",
        status: "complete",
        description: "Task ID: brainx-landing-page-001",
        toolCalls: [
          {
            tool: "brain / brain_init",
            arguments: {
              taskId: "brainx-landing-page-001",
              requestedBy: "user",
              prompt: "design me a landing page for ai agent called BrainX in projects/brain-_landing_lage. make it futuristic. use framer motion. bypass techstack and add framer",
              projectRoot: "/home/akrizu/agent-v3/projects/brain-_landing_lage",
              contextType: "FEATURE"
            },
            output: {
              ok: true,
              taskId: "brainx-landing-page-001",
              requestedBy: "user",
              systemInstructions: {
                priority: "CRITICAL_READ_FIRST",
                instructions: [
                  "YOU ARE EXECUTING A MANAGED WORKFLOW. Every action must go through MCP gates.",
                  "You CANNOT write code unless a workflow step is active (call workflow_step_start first).",
                  "After completing work for a step, IMMEDIATELY call workflow_step_complete before continuing."
                ]
              }
            }
          }
        ],
        bindingRules: [
          "MCP workflow gates mandatory for every step",
          "No fetch/API calls in presentation files",
          "Every interactive element needs data-test-id",
          "Types only in src/domain/landing/types.ts",
          "page.tsx is routing-only (import + render)",
          "All commands must be part of workflow steps"
        ],
        requiredFiles: [
          "src/app/page.tsx",
          "src/presentation/landing/index.tsx",
          "src/presentation/landing/useLanding.ts"
        ]
      },
      {
        id: "phase-1",
        title: "PHASE 1.5 — Coding Task Gate (MANDATORY)",
        status: "complete",
        description: "Before proceeding to STEP_3, I must call the coding task gate:",
        toolCalls: [
          {
            tool: "brain / coding_task_gate",
            arguments: {
              taskId: "brainx-landing-page-001",
              requestedBy: "user",
              taskSummary: "Create futuristic landing page for BrainX AI agent with Framer Motion animations",
              requestedStacks: ["NEXT_JS_FULL_STACK", "TYPESCRIPT", "TAILWIND_CSS", "SHADCN_UI", "FRAMER_MOTION"]
            },
            output: {
              ok: true,
              decision: "ACCEPTED",
              requestedStacks: ["NEXT_JS_FULL_STACK", "TYPESCRIPT", "TAILWIND_CSS", "SHADCN_UI"],
              unsupportedStacks: []
            }
          }
        ]
      },
      {
        id: "phase-2",
        title: "PHASE 2 — Sequential Thinking (MANDATORY)",
        status: "complete",
        description: "MCP requires sequential thinking before coding. Starting planning process:",
        toolCalls: [
          {
            tool: "brain / sequential_thinking",
            arguments: {
              taskId: "brainx-landing-page-001",
              thought: "Task: Create a futuristic landing page for BrainX AI agent. Key requirements: (1) Next.js project structure, (2) Framer Motion for animations, (3) Futuristic aesthetic...",
              thoughtNumber: 1,
              totalThoughts: 5,
              nextThoughtNeeded: true
            }
          }
        ],
        notes: [
          "Thought 1: Analyzed task requirements and tech stack",
          "Thought 2: Planned MVVM architecture structure",
          "Thought 3: Designed content sections (hero, features, CTA)",
          "Thought 4: Planned futuristic design (Space Grotesk font, cyan/blue theme, animated backgrounds)",
          "Thought 5: Implementation plan (types → logic → UI → routing)"
        ]
      },
      {
        id: "phase-3",
        title: "STEP_3 — Isolated Fix Process",
        status: "complete",
        toolCalls: [
          {
            tool: "brain / workflow_step_start",
            arguments: {
              taskId: "brainx-landing-page-001",
              stepId: "STEP_3_ISOLATED_FIX_PROCESS"
            }
          }
        ],
        notes: [
          "Created src/domain/landing/types.ts with FeatureCard interface",
          "Created src/presentation/landing/useLanding.ts with features data",
          "Created src/presentation/landing/index.tsx with futuristic UI and Framer Motion",
          "Updated src/app/page.tsx to routing-only entry point",
          "Updated src/app/globals.css with Space Grotesk font",
          "All interactive elements have data-test-id attributes",
          "No API calls in presentation layer",
          "Types isolated in domain layer"
        ]
      },
      {
        id: "phase-4",
        title: "STEP_4 — Reporting",
        status: "complete",
        notes: [
          "Produced structured execution report",
          "Documented all file changes and architecture decisions",
          "Confirmed MVVM compliance and isolation policy adherence"
        ]
      },
      {
        id: "phase-5",
        title: "STEP_5 — Lint Gate",
        status: "complete",
        toolCalls: [
          {
            tool: "run_command",
            arguments: {
              CommandLine: "npm run lint",
              Cwd: "/home/akrizu/agent-v3/projects/brain-_landing_lage"
            },
            output: "Exit code: 0 ✓"
          }
        ]
      },
      {
        id: "phase-6",
        title: "STEP_6 — Build Gate",
        status: "complete",
        toolCalls: [
          {
            tool: "run_command",
            arguments: {
              CommandLine: "npm run build",
              Cwd: "/home/akrizu/agent-v3/projects/brain-_landing_lage"
            },
            output: "✓ Compiled successfully in 12.9s\n✓ Generating static pages (2/2)"
          }
        ]
      },
      {
        id: "phase-7",
        title: "STEP_7 — Project Logging",
        status: "complete",
        description: "Persist task execution logs and learning metrics to Qdrant RAG",
        notes: [
          "Project logging complete",
          "Task saved to RAG memory with status: SUCCESS",
          "Lint passed: true",
          "Build passed: true",
          "Zero retries required"
        ]
      }
    ]
  };

  return {
    demoData
  };
}
