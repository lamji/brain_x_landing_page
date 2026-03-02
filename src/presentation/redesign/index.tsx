"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useInView,
  AnimatePresence,
} from "framer-motion";
import { useRedesign } from "./useRedesign";
import Image from "next/image";
import Link from "next/link";

const CONNECTOR_PATHS = [
  [
    "M 150 0 C 150 60, 60 80, 150 160 S 240 240, 150 320",
    "M 150 0 C 100 40, 200 120, 150 160 S 100 240, 150 320",
    "M 150 0 C 200 50, 100 100, 150 160 S 200 220, 150 320",
  ],
  [
    "M 150 0 C 80 70, 220 70, 150 160 S 80 250, 150 320",
    "M 150 0 C 170 40, 130 120, 150 160 S 170 200, 150 320",
    "M 150 0 C 120 50, 180 110, 150 160 S 120 270, 150 320",
  ],
  [
    "M 150 0 C 190 50, 110 110, 150 160 S 190 210, 150 320",
    "M 150 0 C 110 80, 190 80, 150 160 S 110 240, 150 320",
    "M 150 0 C 160 30, 140 130, 150 160 S 160 190, 150 320",
  ],
];

const SYNAPSE_COLORS = ["#06b6d4", "#8b5cf6", "#3b82f6", "#22d3ee", "#a78bfa", "#06b6d4", "#8b5cf6", "#3b82f6", "#22d3ee", "#a78bfa"];

function NeuralConnector({ index }: { index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const pathLength = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 1]);
  const glowOpacity = useTransform(scrollYProgress, [0, 0.3, 0.6, 1], [0, 1, 1, 0.3]);

  const paths = CONNECTOR_PATHS[index % CONNECTOR_PATHS.length];

  return (
    <div ref={ref} className="relative h-80 w-full flex justify-center overflow-hidden">
      <motion.div
        className="absolute inset-x-0 top-0 h-px"
        style={{
          background: "linear-gradient(90deg, transparent 20%, rgba(6,182,212,0.3) 50%, transparent 80%)",
          scaleX: pathLength,
        }}
      />

      <svg width="300" height="320" viewBox="0 0 300 320" className="absolute">
        <defs>
          <linearGradient id={`nc-grad-${index}`} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.9" />
            <stop offset="30%" stopColor="#8b5cf6" stopOpacity="1" />
            <stop offset="70%" stopColor="#3b82f6" stopOpacity="1" />
            <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.9" />
          </linearGradient>
          <filter id={`nc-glow-${index}`}>
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {paths.map((d, pi) => (
          <motion.path
            key={`path-${index}-${pi}`}
            d={d}
            stroke={`url(#nc-grad-${index})`}
            strokeWidth={pi === 0 ? 2.5 : 1.5}
            fill="none"
            filter={`url(#nc-glow-${index})`}
            strokeOpacity={pi === 0 ? 1 : 0.5}
            style={{ pathLength }}
          />
        ))}

        <motion.path
          d={paths[0]}
          stroke="#22d3ee"
          strokeWidth="5"
          fill="none"
          strokeLinecap="round"
          filter={`url(#nc-glow-${index})`}
          style={{ pathLength, opacity: glowOpacity }}
          strokeDasharray="6 18"
        />
      </svg>

      {Array.from({ length: 10 }).map((_, i) => (
        <motion.div
          key={`syn-${index}-${i}`}
          className="absolute w-1.5 h-1.5 rounded-full"
          style={{
            left: `${42 + (i - 5) * 3}%`,
            backgroundColor: SYNAPSE_COLORS[i],
          }}
          animate={{
            y: [0, 320],
            opacity: [0, 0.8, 1, 0.8, 0],
            scale: [0.3, 1, 1.2, 1, 0.3],
          }}
          transition={{
            duration: 2 + (i % 3) * 0.5,
            delay: i * 0.25,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      <motion.div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-cyan-400"
        animate={{
          scale: [1, 2, 1],
          opacity: [0.4, 0.8, 0.4],
          boxShadow: [
            "0 0 5px rgba(6,182,212,0.3)",
            "0 0 20px rgba(6,182,212,0.6)",
            "0 0 5px rgba(6,182,212,0.3)",
          ],
        }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div
        className="absolute inset-x-0 bottom-0 h-px"
        style={{
          background: "linear-gradient(90deg, transparent 20%, rgba(139,92,246,0.3) 50%, transparent 80%)",
          scaleX: pathLength,
        }}
      />
    </div>
  );
}

function FloatingParticles() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {Array.from({ length: 30 }).map((_, i) => (
        <motion.div
          key={`particle-${i}`}
          className="absolute rounded-full"
          style={{
            width: `${1 + (i % 3)}px`,
            height: `${1 + (i % 3)}px`,
            left: `${(i * 37 + 13) % 100}%`,
            top: `${(i * 53 + 7) % 100}%`,
            backgroundColor: i % 3 === 0 ? "#06b6d4" : i % 3 === 1 ? "#8b5cf6" : "#22d3ee",
          }}
          animate={{
            y: [0, -40 - (i % 5) * 10, 0],
            x: [0, (i % 2 === 0 ? 1 : -1) * (10 + (i % 4) * 5), 0],
            opacity: [0.1, 0.6, 0.1],
            scale: [1, 1.5, 1],
          }}
          transition={{
            duration: 4 + (i % 5),
            delay: (i * 0.3) % 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

function AnimatedHeader() {
  const { scrollYProgress } = useScroll();
  const headerOpacity = useTransform(scrollYProgress, [0, 0.05], [0, 1]);
  const headerBlur = useTransform(scrollYProgress, [0, 0.05], [0, 12]);
  const backdropBlur = useTransform(headerBlur, (v) => `blur(${v}px)`);

  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-50 px-6 py-4"
      style={{ opacity: headerOpacity }}
    >
      <motion.div
        className="max-w-6xl mx-auto flex items-center justify-between rounded-2xl px-6 py-3 border border-slate-700/30"
        style={{
          backdropFilter: backdropBlur,
          backgroundColor: "rgba(3, 7, 18, 0.7)",
        }}
      >
        <Link href="/" data-test-id="redesign-nav-home">
          <motion.span
            className="font-bold text-lg bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent cursor-pointer"
            animate={{ opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          >
            BrainX
          </motion.span>
        </Link>

        <nav className="flex items-center gap-1">
          {[
            { href: "/how-it-works", label: "How It Works", testId: "redesign-nav-how-it-works", color: "#8b5cf6" },
            { href: "/demo", label: "Demo", testId: "redesign-nav-demo", color: "#06b6d4" },
          ].map((item) => (
            <Link key={item.href} href={item.href} data-test-id={item.testId}>
              <motion.span
                className="relative px-4 py-2 text-sm font-mono text-slate-400 cursor-pointer rounded-lg transition-colors"
                whileHover={{
                  color: item.color,
                  textShadow: `0 0 12px ${item.color}60`,
                }}
                transition={{ duration: 0.2 }}
              >
                {item.label}
                <motion.span
                  className="absolute bottom-0 left-1/2 -translate-x-1/2 h-px w-0 rounded-full"
                  style={{ backgroundColor: item.color }}
                  whileHover={{ width: "60%" }}
                  transition={{ duration: 0.3 }}
                />
              </motion.span>
            </Link>
          ))}
        </nav>
      </motion.div>
    </motion.header>
  );
}

export function Redesign() {
  const {
    simulationSteps,
    activeStepIndex,
    typedPrompt,
    neuralNodes,
    stackItems,
  } = useRedesign();

  const heroRef = useRef<HTMLDivElement>(null);
  const simRef = useRef<HTMLDivElement>(null);
  const neuralRef = useRef<HTMLDivElement>(null);
  const stackRef = useRef<HTMLDivElement>(null);

  const simInView = useInView(simRef, { once: false, amount: 0.3 });
  const neuralInView = useInView(neuralRef, { once: false, amount: 0.3 });
  const stackInView = useInView(stackRef, { once: false, amount: 0.3 });

  const { scrollYProgress } = useScroll();
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

  return (
    <div className="min-h-screen bg-[#030712] text-white overflow-hidden relative">
      <AnimatedHeader />

      <motion.div
        className="fixed inset-0 opacity-[0.03]"
        style={{ y: backgroundY }}
      >
        <div className="absolute inset-0 bg-[linear-gradient(rgba(6,182,212,0.07)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.07)_1px,transparent_1px)] bg-[size:60px_60px]" />
      </motion.div>

      <motion.div
        className="fixed inset-0 pointer-events-none"
        animate={{
          background: [
            "radial-gradient(ellipse 80% 60% at 50% 50%, rgba(6,182,212,0.04) 0%, transparent 70%)",
            "radial-gradient(ellipse 60% 80% at 40% 60%, rgba(139,92,246,0.04) 0%, transparent 70%)",
            "radial-gradient(ellipse 80% 60% at 60% 40%, rgba(6,182,212,0.04) 0%, transparent 70%)",
          ],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />

      <FloatingParticles />

      <div className="relative z-10">
        {/* ═══════════════════════ SECTION 1: HERO ═══════════════════════ */}
        <section ref={heroRef} id="hero" className="min-h-screen flex flex-col items-center justify-center px-6 relative">
          <motion.div
            className="absolute left-1/2 top-1/3 -translate-x-1/2 -translate-y-1/2"
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          >
            <motion.div
              className="relative w-32 h-32 flex items-center justify-center"
              animate={{ scale: [1, 1.08, 1] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            >
              <motion.div
                className="absolute inset-0 rounded-full bg-cyan-400 blur-3xl"
                animate={{ opacity: [0.15, 0.4, 0.15], scale: [1, 1.5, 1] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              />
              <motion.div
                className="absolute inset-0 rounded-full bg-violet-500 blur-2xl"
                animate={{ opacity: [0.08, 0.25, 0.08], scale: [1.2, 1.7, 1.2] }}
                transition={{ duration: 4, delay: 0.5, repeat: Infinity, ease: "easeInOut" }}
              />
              <div className="relative w-20 h-20 z-10">
                <Image
                  src="/icons/favicon-256x256.png"
                  alt="BrainX AI"
                  width={80}
                  height={80}
                  className="w-full h-full object-contain drop-shadow-2xl"
                  priority
                />
              </div>
            </motion.div>
          </motion.div>

          <svg className="absolute inset-0 w-full h-full pointer-events-none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="heroNeuralGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="rgba(6,182,212,0.5)" />
                <stop offset="100%" stopColor="rgba(139,92,246,0.3)" />
              </linearGradient>
            </defs>
            {[
              { d: "M 50% 33% Q 25% 20%, 10% 15%", delay: 0 },
              { d: "M 50% 33% Q 75% 20%, 90% 15%", delay: 0.5 },
              { d: "M 50% 33% Q 30% 50%, 10% 60%", delay: 1 },
              { d: "M 50% 33% Q 70% 50%, 90% 60%", delay: 1.5 },
              { d: "M 50% 33% Q 50% 55%, 50% 75%", delay: 2 },
            ].map((line, i) => (
              <motion.path
                key={`hero-line-${i}`}
                d={line.d}
                stroke="url(#heroNeuralGrad)"
                strokeWidth="1.5"
                fill="none"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: [0, 1, 0], opacity: [0, 0.6, 0] }}
                transition={{ duration: 3, delay: line.delay, repeat: Infinity, ease: "easeInOut" }}
              />
            ))}
          </svg>

          <motion.div
            className="relative z-20 text-center mt-32"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          >
            <motion.h1
              className="text-7xl md:text-9xl font-bold tracking-tighter mb-6"
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
              <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-violet-400 bg-clip-text text-transparent">
                BrainX
              </span>
            </motion.h1>

            <motion.div
              className="max-w-2xl mx-auto mb-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 1 }}
            >
              <p className="text-lg md:text-xl text-slate-400 font-light leading-relaxed">
                The autonomous AI agent that thinks, plans, and executes.
                <br />
                <span className="text-cyan-400/80">Watch it work in real-time.</span>
              </p>
            </motion.div>

            <motion.div
              className="max-w-xl mx-auto bg-slate-900/60 border border-slate-700/50 rounded-xl p-4 backdrop-blur-sm"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.8 }}
            >
              <div className="flex items-center gap-2 mb-2">
                <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                <span className="text-xs text-slate-500 font-mono">PROMPT</span>
              </div>
              <div className="font-mono text-sm text-cyan-300/90 min-h-[1.5rem]">
                {typedPrompt}
                <motion.span
                  className="inline-block w-2 h-4 bg-cyan-400 ml-0.5 align-middle"
                  animate={{ opacity: [1, 0] }}
                  transition={{ duration: 0.6, repeat: Infinity }}
                />
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            className="absolute bottom-10 left-1/2 -translate-x-1/2"
            animate={{ y: [0, 8, 0], opacity: [0.3, 0.7, 0.3] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <div className="w-5 h-8 border border-slate-600 rounded-full flex justify-center pt-1.5">
              <motion.div
                className="w-1 h-2 bg-cyan-400 rounded-full"
                animate={{ y: [0, 6, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              />
            </div>
          </motion.div>
        </section>

        <NeuralConnector index={0} />

        {/* ═══════════════════ SECTION 2: MCP SIMULATION ═══════════════════ */}
        <section ref={simRef} className="min-h-screen flex flex-col items-center justify-center px-6 py-24 relative">
          <motion.div
            initial={{ opacity: 0 }}
            animate={simInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="w-full max-w-4xl"
          >
            <motion.h2
              className="text-4xl md:text-5xl font-bold text-center mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 0.6 }}
            >
              <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                Live MCP Workflow
              </span>
            </motion.h2>
            <motion.p
              className="text-slate-400 text-center mb-16 text-lg"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: false }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              Every task passes through 8 gated steps. No shortcuts. No hallucination.
            </motion.p>

            <div className="relative">
              <div className="absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-cyan-500/30 to-transparent" />

              <AnimatePresence mode="sync">
                {simulationSteps.map((step, i) => {
                  const isActive = i === activeStepIndex;
                  const isComplete = i < activeStepIndex;
                  const isIdle = i > activeStepIndex;

                  return (
                    <motion.div
                      key={step.id}
                      className="relative pl-20 mb-6"
                      initial={{ opacity: 0.3, x: -10 }}
                      animate={{
                        opacity: isIdle ? 0.25 : 1,
                        x: 0,
                      }}
                      transition={{ duration: 0.5, delay: i * 0.05 }}
                    >
                      <motion.div
                        className="absolute left-6 top-3 w-4 h-4 rounded-full border-2"
                        style={{ borderColor: step.color }}
                        animate={{
                          backgroundColor: isComplete ? step.color : isActive ? step.color : "transparent",
                          scale: isActive ? [1, 1.4, 1] : 1,
                          boxShadow: isActive
                            ? [`0 0 0px ${step.color}`, `0 0 20px ${step.color}`, `0 0 0px ${step.color}`]
                            : `0 0 0px ${step.color}`,
                        }}
                        transition={{
                          scale: { duration: 1, repeat: isActive ? Infinity : 0, ease: "easeInOut" },
                          boxShadow: { duration: 1, repeat: isActive ? Infinity : 0, ease: "easeInOut" },
                          backgroundColor: { duration: 0.3 },
                        }}
                      />

                      {isActive && (
                        <motion.div
                          className="absolute left-[26px] top-[18px] w-0.5 bg-gradient-to-b"
                          style={{ background: `linear-gradient(to bottom, ${step.color}, transparent)` }}
                          initial={{ height: 0 }}
                          animate={{ height: 40 }}
                          transition={{ duration: 0.8 }}
                        />
                      )}

                      <div className="flex items-center gap-3 mb-1">
                        <motion.span
                          className="font-mono text-sm font-bold"
                          style={{ color: isIdle ? "#475569" : step.color }}
                          animate={isActive ? { opacity: [0.7, 1, 0.7] } : {}}
                          transition={{ duration: 1.5, repeat: Infinity }}
                        >
                          {step.label}
                        </motion.span>
                        {isComplete && (
                          <motion.span
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="text-emerald-400 text-xs font-mono"
                          >
                            PASSED
                          </motion.span>
                        )}
                        {isActive && (
                          <motion.span
                            className="text-xs font-mono"
                            style={{ color: step.color }}
                            animate={{ opacity: [0.5, 1, 0.5] }}
                            transition={{ duration: 0.8, repeat: Infinity }}
                          >
                            EXECUTING...
                          </motion.span>
                        )}
                      </div>

                      <p className={`text-sm mb-2 ${isIdle ? "text-slate-600" : "text-slate-400"}`}>
                        {step.description}
                      </p>

                      <AnimatePresence>
                        {(isActive || isComplete) && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.4 }}
                            className="overflow-hidden"
                          >
                            <div
                              className="bg-slate-900/80 border rounded-lg p-3 font-mono text-xs leading-relaxed whitespace-pre-wrap"
                              style={{ borderColor: `${step.color}20` }}
                            >
                              <span style={{ color: isComplete ? "#94a3b8" : step.color }}>
                                {step.output}
                              </span>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>
          </motion.div>
        </section>

        <NeuralConnector index={1} />

        {/* ═══════════════════ SECTION 3: NEURAL CAPABILITIES ═══════════════════ */}
        <section ref={neuralRef} className="min-h-screen flex flex-col items-center justify-center px-6 py-24 relative">
          <motion.h2
            className="text-4xl md:text-5xl font-bold text-center mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.6 }}
          >
            <span className="bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">
              Neural Architecture
            </span>
          </motion.h2>
          <motion.p
            className="text-slate-400 text-center mb-20 text-lg max-w-2xl"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: false }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            Five interconnected systems working as one living intelligence
          </motion.p>

          <motion.div
            className="relative w-full max-w-2xl aspect-square"
            initial={{ opacity: 0 }}
            animate={neuralInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 1 }}
          >
            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100">
              <defs>
                <filter id="connectionGlow">
                  <feGaussianBlur stdDeviation="0.5" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>
              {neuralNodes.map((node, nodeIdx) =>
                node.connections.map((targetId, connIdx) => {
                  const target = neuralNodes.find((n) => n.id === targetId);
                  if (!target || node.id > targetId) return null;
                  const seed = nodeIdx * 5 + connIdx;
                  return (
                    <motion.line
                      key={`${node.id}-${targetId}`}
                      x1={node.x}
                      y1={node.y}
                      x2={target.x}
                      y2={target.y}
                      stroke={node.color}
                      strokeWidth="0.3"
                      filter="url(#connectionGlow)"
                      initial={{ opacity: 0 }}
                      animate={neuralInView ? {
                        opacity: [0.15, 0.5, 0.15],
                        strokeWidth: [0.3, 0.6, 0.3],
                      } : { opacity: 0 }}
                      transition={{
                        duration: 2 + (seed % 4) * 0.5,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: (seed % 6) * 0.3,
                      }}
                    />
                  );
                })
              )}

              {neuralNodes.map((node, nodeIdx) =>
                node.connections.map((targetId, connIdx) => {
                  const target = neuralNodes.find((n) => n.id === targetId);
                  if (!target || node.id > targetId) return null;
                  const seed = nodeIdx * 5 + connIdx;
                  return (
                    <motion.circle
                      key={`pulse-${node.id}-${targetId}`}
                      r="0.6"
                      fill={node.color}
                      filter="url(#connectionGlow)"
                      animate={neuralInView ? {
                        cx: [node.x, target.x],
                        cy: [node.y, target.y],
                        opacity: [0, 1, 0],
                      } : { opacity: 0 }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: (seed % 5) * 0.6,
                      }}
                    />
                  );
                })
              )}
            </svg>

            {neuralNodes.map((node, i) => (
              <motion.div
                key={node.id}
                className="absolute flex flex-col items-center"
                style={{
                  left: `${node.x}%`,
                  top: `${node.y}%`,
                  transform: "translate(-50%, -50%)",
                }}
                initial={{ opacity: 0, scale: 0 }}
                animate={neuralInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
                transition={{ delay: 0.2 + i * 0.15, duration: 0.6, type: "spring" }}
              >
                <motion.div
                  className="w-14 h-14 md:w-20 md:h-20 rounded-full flex items-center justify-center relative"
                  style={{
                    background: `radial-gradient(circle, ${node.color}20, transparent)`,
                    border: `1px solid ${node.color}40`,
                  }}
                  animate={{
                    boxShadow: [
                      `0 0 10px ${node.color}20`,
                      `0 0 30px ${node.color}40`,
                      `0 0 10px ${node.color}20`,
                    ],
                  }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: i * 0.3 }}
                >
                  <motion.div
                    className="absolute inset-0 rounded-full"
                    style={{ border: `1px solid ${node.color}` }}
                    animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0, 0.3] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: i * 0.2 }}
                  />
                  <div
                    className="w-3 h-3 md:w-4 md:h-4 rounded-full"
                    style={{ backgroundColor: node.color }}
                  />
                </motion.div>
                <motion.span
                  className="mt-2 text-xs md:text-sm font-mono font-medium whitespace-nowrap"
                  style={{ color: node.color }}
                  animate={{ opacity: [0.6, 1, 0.6] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: i * 0.2 }}
                >
                  {node.label}
                </motion.span>
              </motion.div>
            ))}
          </motion.div>
        </section>

        <NeuralConnector index={2} />

        {/* ═══════════════════ SECTION 4: STACK ORBIT ═══════════════════ */}
        <section ref={stackRef} className="min-h-screen flex flex-col items-center justify-center px-6 py-24 relative">
          <motion.h2
            className="text-4xl md:text-5xl font-bold text-center mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.6 }}
          >
            <span className="bg-gradient-to-r from-amber-400 to-cyan-400 bg-clip-text text-transparent">
              Locked Stack Ecosystem
            </span>
          </motion.h2>
          <motion.p
            className="text-slate-400 text-center mb-20 text-lg max-w-2xl"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: false }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            Only approved technologies pass the gate. Zero unauthorized stack usage.
          </motion.p>

          <motion.div
            className="relative w-80 h-80 md:w-[500px] md:h-[500px]"
            initial={{ opacity: 0 }}
            animate={stackInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 1 }}
          >
            <motion.div
              className="absolute inset-0 rounded-full border border-cyan-500/10"
              animate={{ rotate: 360 }}
              transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
            />
            <motion.div
              className="absolute inset-8 md:inset-16 rounded-full border border-violet-500/10"
              animate={{ rotate: -360 }}
              transition={{ duration: 45, repeat: Infinity, ease: "linear" }}
            />

            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div
                className="w-16 h-16 md:w-24 md:h-24 rounded-full flex items-center justify-center relative"
                animate={{
                  boxShadow: [
                    "0 0 20px rgba(6,182,212,0.2)",
                    "0 0 40px rgba(6,182,212,0.4)",
                    "0 0 20px rgba(6,182,212,0.2)",
                  ],
                }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              >
                <motion.div
                  className="absolute inset-0 rounded-full bg-cyan-400 blur-xl"
                  animate={{ opacity: [0.1, 0.3, 0.1] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                />
                <Image
                  src="/icons/favicon-256x256.png"
                  alt="BrainX"
                  width={48}
                  height={48}
                  className="relative z-10 w-10 h-10 md:w-14 md:h-14 object-contain"
                />
              </motion.div>
            </div>

            <motion.div
              className="absolute inset-0"
              animate={{ rotate: 360 }}
              transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
            >
              {stackItems.map((item, i) => {
                const colors = ["#06b6d4", "#8b5cf6", "#10b981", "#f59e0b", "#ec4899"];

                return (
                  <motion.div
                    key={item.id}
                    className="absolute"
                    style={{
                      left: `${item.px}%`,
                      top: `${item.py}%`,
                      transform: "translate(-50%, -50%)",
                    }}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={stackInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ delay: 0.3 + i * 0.1, type: "spring", stiffness: 200 }}
                  >
                    <motion.div
                      animate={{ rotate: -360 }}
                      transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                    >
                      <motion.div
                        className="px-3 py-1.5 md:px-4 md:py-2 rounded-full font-mono text-xs md:text-sm font-medium whitespace-nowrap backdrop-blur-sm"
                        style={{
                          color: colors[i % colors.length],
                          border: `1px solid ${colors[i % colors.length]}30`,
                          background: `${colors[i % colors.length]}08`,
                        }}
                        animate={{
                          boxShadow: [
                            `0 0 5px ${colors[i % colors.length]}10`,
                            `0 0 15px ${colors[i % colors.length]}25`,
                            `0 0 5px ${colors[i % colors.length]}10`,
                          ],
                        }}
                        transition={{
                          duration: 3,
                          delay: i * 0.3,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                      >
                        {item.name}
                      </motion.div>
                    </motion.div>
                  </motion.div>
                );
              })}
            </motion.div>
          </motion.div>
        </section>

        {/* ═══════════════════ FOOTER ═══════════════════ */}
        <motion.footer
          className="py-16 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: false }}
          transition={{ duration: 0.8 }}
        >
          <motion.p
            className="text-cyan-400/40 text-sm font-mono"
            animate={{ opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          >
            Powered by MCP Protocol &middot; RAG Memory &middot; Sequential Thinking &middot; Adaptive Learning
          </motion.p>
        </motion.footer>
      </div>
    </div>
  );
}
