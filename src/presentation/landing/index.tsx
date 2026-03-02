"use client";

import { motion } from "framer-motion";
import { Brain, Database, ShieldCheck, Lock, Code, Search, TestTube2, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useLanding } from "./useLanding";
import Link from "next/link";

const iconMap = {
  "brain-circuit": Brain,
  "database": Database,
  "shield-check": ShieldCheck,
  "lock": Lock,
  "code": Code,
  "search": Search,
  "test-tube-2": TestTube2,
  "tag": Tag
};

export function Landing() {
  const { features, preventionMechanisms, approvedStacks, debugPractices, codeExample, debuggingTools, installationSteps, mcpConfigExample } = useLanding();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-cyan-950 text-white overflow-hidden relative">
      <motion.div
        className="absolute inset-0 opacity-20"
        animate={{
          backgroundPosition: ["0% 0%", "100% 100%"],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          repeatType: "reverse",
        }}
        style={{
          backgroundImage: "linear-gradient(45deg, transparent 30%, rgba(6, 182, 212, 0.1) 50%, transparent 70%)",
          backgroundSize: "200% 200%",
        }}
      />

      <div className="absolute inset-0 bg-[linear-gradient(rgba(6,182,212,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.03)_1px,transparent_1px)] bg-[size:50px_50px]" />

      <div className="relative z-10 container mx-auto px-6 py-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="inline-block mb-6"
          >
            <div className="relative">
              <motion.div
                className="absolute inset-0 bg-cyan-500 blur-3xl opacity-30"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.3, 0.5, 0.3],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  repeatType: "reverse",
                }}
              />
              <h1 className="relative text-7xl md:text-8xl font-bold tracking-tight">
                <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-cyan-400 bg-clip-text text-transparent">
                  BrainX
                </span>
              </h1>
            </div>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="text-xl md:text-2xl text-cyan-100 max-w-3xl mx-auto mb-8 font-light"
          >
            The autonomous AI agent that thinks, learns, and executes with precision.
            <br />
            <span className="text-cyan-400">No supervision. No shortcuts. Just results.</span>
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="flex flex-wrap gap-4 justify-center"
          >
            <Link href="/demo" data-test-id="landing-demo-link">
              <Button
                data-test-id="landing-demo-button"
                size="lg"
                variant="outline"
                className="border-green-500 text-green-400 hover:bg-green-950/30 hover:text-green-300 font-semibold px-8 py-6 text-lg"
              >
                See Demo
              </Button>
            </Link>
            <Link href="/how-it-works" data-test-id="landing-how-it-works-link">
              <Button
                data-test-id="landing-how-it-works-button"
                size="lg"
                variant="outline"
                className="border-cyan-500 text-cyan-400 hover:bg-cyan-950/30 hover:text-cyan-300 font-semibold px-8 py-6 text-lg"
              >
                How It Works
              </Button>
            </Link>
            <Button
              data-test-id="landing-cta-button"
              size="lg"
              className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-semibold px-8 py-6 text-lg shadow-lg shadow-cyan-500/50 transition-all duration-300"
            >
              <motion.span
                animate={{
                  scale: [1, 1.05, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatType: "reverse",
                }}
              >
                Deploy BrainX
              </motion.span>
            </Button>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto"
        >
          {features.map((feature, index) => {
            const Icon = iconMap[feature.icon as keyof typeof iconMap];
            return (
              <motion.div
                key={feature.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2 + index * 0.2, duration: 0.6 }}
                whileHover={{ scale: 1.05, y: -5 }}
                data-test-id={`landing-feature-card-${feature.id}`}
              >
                <Card className="bg-slate-900/50 border-cyan-900/30 backdrop-blur-sm p-8 h-full hover:border-cyan-500/50 transition-all duration-300 shadow-lg hover:shadow-cyan-500/20">
                  <motion.div
                    whileHover={{ rotate: [0, -10, 10, 0] }}
                    transition={{ duration: 0.5 }}
                    className="mb-6"
                  >
                    <div className="w-16 h-16 bg-gradient-to-br from-cyan-500/20 to-blue-600/20 rounded-lg flex items-center justify-center border border-cyan-500/30">
                      <Icon className="w-8 h-8 text-cyan-400" />
                    </div>
                  </motion.div>
                  <h3 className="text-2xl font-bold mb-4 text-cyan-100">
                    {feature.title}
                  </h3>
                  <p className="text-slate-300 leading-relaxed">
                    {feature.description}
                  </p>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.2, duration: 0.8 }}
          className="mt-32 max-w-6xl mx-auto"
        >
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-red-400 via-orange-500 to-red-400 bg-clip-text text-transparent">
                Zero Hallucination Guarantee
              </span>
            </h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              Locked execution model prevents AI from doing things on its own terms. Every action is gated, validated, and audited.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {preventionMechanisms.map((mechanism, index) => {
              const Icon = iconMap[mechanism.icon as keyof typeof iconMap];
              return (
                <motion.div
                  key={mechanism.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 2.4 + index * 0.2, duration: 0.6 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                  data-test-id={`landing-prevention-${mechanism.id}`}
                >
                  <Card className="bg-slate-900/50 border-red-900/30 backdrop-blur-sm p-8 h-full hover:border-red-500/50 transition-all duration-300 shadow-lg hover:shadow-red-500/20">
                    <motion.div
                      whileHover={{ rotate: [0, -10, 10, 0] }}
                      transition={{ duration: 0.5 }}
                      className="mb-6"
                    >
                      <div className="w-16 h-16 bg-gradient-to-br from-red-500/20 to-orange-600/20 rounded-lg flex items-center justify-center border border-red-500/30">
                        <Icon className="w-8 h-8 text-red-400" />
                      </div>
                    </motion.div>
                    <h3 className="text-2xl font-bold mb-4 text-red-100">
                      {mechanism.title}
                    </h3>
                    <p className="text-slate-300 leading-relaxed mb-4">
                      {mechanism.description}
                    </p>
                    <ul className="space-y-2">
                      {mechanism.details.map((detail, detailIndex) => (
                        <li key={detailIndex} className="flex items-start gap-2 text-sm text-slate-400">
                          <span className="text-red-400 mt-1">•</span>
                          <span>{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </Card>
                </motion.div>
              );
            })}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 3, duration: 0.8 }}
            className="text-center"
          >
            <h3 className="text-2xl font-bold mb-6 text-cyan-100">
              Locked Technology Stacks
            </h3>
            <p className="text-slate-400 mb-8 max-w-2xl mx-auto">
              Only approved stacks are allowed. Out-of-stack tasks are automatically rejected at the coding task gate.
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              {approvedStacks.map((stack, index) => (
                <motion.div
                  key={stack}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 3.2 + index * 0.05, duration: 0.4 }}
                  whileHover={{ scale: 1.1, y: -2 }}
                  data-test-id={`landing-stack-${stack.toLowerCase().replace(/\s+/g, '-')}`}
                >
                  <div className="px-4 py-2 bg-slate-800/50 border border-cyan-500/30 rounded-full text-sm font-mono text-cyan-300 hover:border-cyan-400/50 hover:bg-slate-800/70 transition-all duration-300">
                    {stack}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 4.2, duration: 0.8 }}
          className="mt-32 max-w-6xl mx-auto"
        >
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-emerald-400 via-green-500 to-emerald-400 bg-clip-text text-transparent">
                Regression-Proof Development
              </span>
            </h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              Every bug fix includes regression tests. Every interactive element has test identifiers. Zero recurring issues.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {debugPractices.map((practice, index) => {
              const Icon = iconMap[practice.icon as keyof typeof iconMap];
              return (
                <motion.div
                  key={practice.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 4.4 + index * 0.2, duration: 0.6 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                  data-test-id={`landing-debug-${practice.id}`}
                >
                  <Card className="bg-slate-900/50 border-emerald-900/30 backdrop-blur-sm p-8 h-full hover:border-emerald-500/50 transition-all duration-300 shadow-lg hover:shadow-emerald-500/20">
                    <motion.div
                      whileHover={{ rotate: [0, -10, 10, 0] }}
                      transition={{ duration: 0.5 }}
                      className="mb-6"
                    >
                      <div className="w-16 h-16 bg-gradient-to-br from-emerald-500/20 to-green-600/20 rounded-lg flex items-center justify-center border border-emerald-500/30">
                        <Icon className="w-8 h-8 text-emerald-400" />
                      </div>
                    </motion.div>
                    <h3 className="text-2xl font-bold mb-4 text-emerald-100">
                      {practice.title}
                    </h3>
                    <p className="text-slate-300 leading-relaxed mb-4">
                      {practice.description}
                    </p>
                    <ul className="space-y-2">
                      {practice.keyPoints.map((point, pointIndex) => (
                        <li key={pointIndex} className="flex items-start gap-2 text-sm text-slate-400">
                          <span className="text-emerald-400 mt-1">✓</span>
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </Card>
                </motion.div>
              );
            })}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 5, duration: 0.8 }}
            className="bg-slate-900/50 border border-emerald-900/30 rounded-lg p-8 backdrop-blur-sm"
            data-test-id="landing-debug-code-example"
          >
            <h3 className="text-xl font-bold mb-4 text-emerald-100 flex items-center gap-2">
              <Tag className="w-5 h-5 text-emerald-400" />
              data-test-id Usage Example
            </h3>
            <pre className="bg-slate-950/50 border border-slate-800 rounded-lg p-6 overflow-x-auto">
              <code className="text-sm font-mono text-slate-300">
                {codeExample}
              </code>
            </pre>
            <p className="text-slate-400 text-sm mt-4">
              <strong className="text-emerald-400">Debugging Use Case:</strong> When an API call fails, error logs show the exact <code className="text-emerald-300 bg-slate-800 px-2 py-0.5 rounded">data-test-id</code> - instantly identifying which element triggered the error without scanning through files.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 5.2, duration: 0.8 }}
            className="mt-8"
          >
            <h3 className="text-xl font-bold mb-4 text-emerald-100 text-center">
              Debugging Tools Used
            </h3>
            <div className="flex flex-wrap gap-3 justify-center">
              {debuggingTools.map((tool, index) => (
                <motion.div
                  key={tool}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 5.3 + index * 0.05, duration: 0.4 }}
                  whileHover={{ scale: 1.1, y: -2 }}
                  data-test-id={`landing-debug-tool-${tool.toLowerCase().replace(/\s+/g, '-')}`}
                >
                  <div className="px-4 py-2 bg-slate-800/50 border border-emerald-500/30 rounded-full text-sm font-mono text-emerald-300 hover:border-emerald-400/50 hover:bg-slate-800/70 transition-all duration-300">
                    {tool}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 6.5, duration: 0.8 }}
          className="mt-32 max-w-6xl mx-auto border-t border-slate-800 pt-16"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-cyan-400 bg-clip-text text-transparent">
                Get Started
              </span>
            </h2>
            <p className="text-xl text-slate-300">
              Install and configure BrainX in minutes
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 6.7, duration: 0.6 }}
              className="bg-slate-900/50 border border-slate-800 rounded-lg p-8 backdrop-blur-sm"
              data-test-id="landing-installation-section"
            >
              <h3 className="text-2xl font-bold mb-6 text-cyan-100 flex items-center gap-2">
                <span className="text-cyan-400">📦</span>
                Installation
              </h3>
              <ol className="space-y-3">
                {installationSteps.map((step, index) => (
                  <li key={index} className="flex items-start gap-3 text-slate-300">
                    <span className="flex-shrink-0 w-6 h-6 bg-cyan-500/20 border border-cyan-500/30 rounded-full flex items-center justify-center text-xs font-bold text-cyan-400">
                      {index + 1}
                    </span>
                    <span className="font-mono text-sm">{step}</span>
                  </li>
                ))}
              </ol>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 6.9, duration: 0.6 }}
              className="bg-slate-900/50 border border-slate-800 rounded-lg p-8 backdrop-blur-sm"
              data-test-id="landing-mcp-config-section"
            >
              <h3 className="text-2xl font-bold mb-6 text-cyan-100 flex items-center gap-2">
                <span className="text-cyan-400">⚙️</span>
                MCP Configuration
              </h3>
              <p className="text-slate-400 text-sm mb-4">
                Add this to your MCP settings JSON file:
              </p>
              <pre className="bg-slate-950/50 border border-slate-800 rounded-lg p-4 overflow-x-auto">
                <code className="text-xs font-mono text-slate-300">
                  {mcpConfigExample}
                </code>
              </pre>
              <p className="text-slate-400 text-xs mt-4">
                💡 Update paths to match your installation directory
              </p>
            </motion.div>
          </div>

        
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 7.5, duration: 0.8 }}
          className="text-center mt-20"
        >
          <p className="text-cyan-400/60 text-sm font-mono">
            Powered by MCP Protocol • RAG Memory • Sequential Thinking
          </p>
        </motion.div>
      </div>
    </div>
  );
}
