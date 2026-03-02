"use client";

import { useState, useEffect, useRef } from "react";
import { SimulationStep, NeuralNode, StackItem } from "@/domain/redesign/types";

const FULL_PROMPT = "Build me a login page with social auth and forgot password flow";

const SIMULATION_STEPS: SimulationStep[] = [
  {
    id: "prompt",
    label: "User Prompt",
    description: "Developer sends a natural language request",
    output: ">> " + FULL_PROMPT,
    color: "#06b6d4",
  },
  {
    id: "brain-init",
    label: "brain_init",
    description: "MCP handshake + context classification",
    output: '{ ok: true, contextType: "FEATURE", plan: { steps: [...] } }',
    color: "#3b82f6",
  },
  {
    id: "sequential-thinking",
    label: "Sequential Thinking",
    description: "Multi-step architecture planning",
    output: "Thought 1/4: MVVM structure... Thought 2/4: Route layout...",
    color: "#8b5cf6",
  },
  {
    id: "coding-gate",
    label: "Coding Task Gate",
    description: "Stack validation + policy check",
    output: '{ decision: "ACCEPTED", stacks: ["NEXT_JS", "TAILWIND_CSS"] }',
    color: "#f59e0b",
  },
  {
    id: "implementation",
    label: "Implementation",
    description: "Isolated code generation with MVVM compliance",
    output: "Creating src/presentation/login/index.tsx...\nCreating src/domain/login/types.ts...",
    color: "#10b981",
  },
  {
    id: "lint-gate",
    label: "Lint Gate",
    description: "Automated code quality verification",
    output: "$ npm run lint\n\n0 errors, 0 warnings",
    color: "#22d3ee",
  },
  {
    id: "build-gate",
    label: "Build Gate",
    description: "Production build verification",
    output: "$ npm run build\n\nCompiled successfully. 0 errors.",
    color: "#34d399",
  },
  {
    id: "deployed",
    label: "Deployed",
    description: "Task complete — logged to RAG memory",
    output: "Project log saved. Learning record: WIN. Score: 100/100",
    color: "#06b6d4",
  },
];

const NEURAL_NODES: NeuralNode[] = [
  { id: "brain", label: "BrainX Core", x: 50, y: 50, color: "#06b6d4", connections: ["memory", "validation", "execution", "learning"] },
  { id: "memory", label: "RAG Memory", x: 20, y: 25, color: "#8b5cf6", connections: ["brain", "learning"] },
  { id: "validation", label: "Validation Gates", x: 80, y: 25, color: "#10b981", connections: ["brain", "execution"] },
  { id: "execution", label: "MCP Executor", x: 80, y: 75, color: "#f59e0b", connections: ["brain", "validation"] },
  { id: "learning", label: "Adaptive Learning", x: 20, y: 75, color: "#ec4899", connections: ["brain", "memory"] },
];

function computeStackPosition(angleDeg: number): { px: number; py: number } {
  const radius = 42;
  const rad = (angleDeg * Math.PI) / 180;
  return {
    px: Math.round((50 + radius * Math.cos(rad)) * 100) / 100,
    py: Math.round((50 + radius * Math.sin(rad)) * 100) / 100,
  };
}

const STACK_ITEMS: StackItem[] = [
  { id: "nextjs", name: "Next.js", angle: 0, ...computeStackPosition(0) },
  { id: "react", name: "React", angle: 36, ...computeStackPosition(36) },
  { id: "typescript", name: "TypeScript", angle: 72, ...computeStackPosition(72) },
  { id: "tailwind", name: "Tailwind CSS", angle: 108, ...computeStackPosition(108) },
  { id: "shadcn", name: "Shadcn UI", angle: 144, ...computeStackPosition(144) },
  { id: "mongodb", name: "MongoDB", angle: 180, ...computeStackPosition(180) },
  { id: "mcp", name: "MCP Protocol", angle: 216, ...computeStackPosition(216) },
  { id: "qdrant", name: "Qdrant RAG", angle: 252, ...computeStackPosition(252) },
  { id: "redux", name: "Redux Toolkit", angle: 288, ...computeStackPosition(288) },
  { id: "tanstack", name: "TanStack", angle: 324, ...computeStackPosition(324) },
];

type SimPhase = "idle" | "typing" | "stepping" | "cooldown";

export function useRedesign() {
  const [activeStepIndex, setActiveStepIndex] = useState(-1);
  const [typedPrompt, setTypedPrompt] = useState("");

  const phaseRef = useRef<SimPhase>("idle");
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const charIndexRef = useRef(0);
  const mountedRef = useRef(true);

  useEffect(() => {
    mountedRef.current = true;

    const clearTimer = () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };

    const startTyping = () => {
      clearTimer();
      phaseRef.current = "typing";
      charIndexRef.current = 0;
      setActiveStepIndex(-1);
      setTypedPrompt("");

      timerRef.current = setInterval(() => {
        if (!mountedRef.current) return;
        charIndexRef.current++;
        if (charIndexRef.current >= FULL_PROMPT.length) {
          clearTimer();
          setTypedPrompt(FULL_PROMPT);
          startStepping();
        } else {
          setTypedPrompt(FULL_PROMPT.slice(0, charIndexRef.current));
        }
      }, 45);
    };

    const startStepping = () => {
      phaseRef.current = "stepping";
      let stepIdx = 0;
      setActiveStepIndex(0);

      timerRef.current = setInterval(() => {
        if (!mountedRef.current) return;
        stepIdx++;
        if (stepIdx >= SIMULATION_STEPS.length) {
          clearTimer();
          startCooldown();
        } else {
          setActiveStepIndex(stepIdx);
        }
      }, 2200);
    };

    const startCooldown = () => {
      phaseRef.current = "cooldown";
      timerRef.current = setTimeout(() => {
        if (!mountedRef.current) return;
        startTyping();
      }, 3500) as unknown as ReturnType<typeof setInterval>;
    };

    const initDelay = setTimeout(() => {
      if (mountedRef.current) startTyping();
    }, 1500);

    return () => {
      mountedRef.current = false;
      clearTimeout(initDelay);
      clearTimer();
    };
  }, []);

  return {
    simulationSteps: SIMULATION_STEPS,
    activeStepIndex,
    typedPrompt,
    neuralNodes: NEURAL_NODES,
    stackItems: STACK_ITEMS,
  };
}
