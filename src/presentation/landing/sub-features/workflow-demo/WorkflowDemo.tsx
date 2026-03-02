"use client";

import { motion } from "framer-motion";
import { CheckCircle2, Circle, ArrowLeft, Terminal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useWorkflowDemo } from "./useWorkflowDemo";
import Link from "next/link";

export function WorkflowDemo() {
  const { demoData } = useWorkflowDemo();

  return (
    <div className="min-h-screen bg-[#1e1e1e] text-white overflow-hidden">
      <div className="container mx-auto px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <Link href="/" data-test-id="workflow-demo-back-button">
            <Button
              variant="ghost"
              className="text-cyan-400 hover:text-cyan-300 hover:bg-cyan-950/30 mb-6"
              data-test-id="workflow-demo-back-link"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
          </Link>

          <div className="flex items-center gap-3 mb-4">
            <Terminal className="w-8 h-8 text-cyan-400" />
            <h1 className="text-4xl md:text-5xl font-bold">
              <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-cyan-400 bg-clip-text text-transparent">
                BrainX Workflow Demo
              </span>
            </h1>
          </div>
          <p className="text-lg text-gray-400 max-w-4xl">
            A real-time replay of how BrainX executed the landing page task through the MCP workflow state machine.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="mb-8 bg-[#252526] border border-[#3e3e42] rounded-lg p-6"
        >
          <div className="flex items-start gap-3 mb-4">
            <div className="text-[#4ec9b0] font-mono text-sm">User Request:</div>
          </div>
          <div className="bg-[#1e1e1e] border border-[#3e3e42] rounded p-4 font-mono text-sm text-[#d4d4d4]">
            {demoData.userRequest}
          </div>
        </motion.div>

        <div className="space-y-6">
          {demoData.phases.map((phase, index) => (
            <motion.div
              key={phase.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 + index * 0.1, duration: 0.5 }}
              className="bg-[#252526] border border-[#3e3e42] rounded-lg overflow-hidden"
              data-test-id={`workflow-demo-phase-${phase.id}`}
            >
              <div className="p-6">
                <div className="flex items-start gap-4 mb-4">
                  <div className="mt-1">
                    {phase.status === "complete" ? (
                      <CheckCircle2 className="w-6 h-6 text-green-500" />
                    ) : (
                      <Circle className="w-6 h-6 text-gray-500" />
                    )}
                  </div>
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold text-white mb-2">
                      {phase.title}
                    </h2>
                    {phase.description && (
                      <p className="text-gray-400 mb-4">{phase.description}</p>
                    )}

                    {phase.bindingRules && phase.bindingRules.length > 0 && (
                      <div className="mb-4">
                        <div className="text-sm font-semibold text-[#4ec9b0] mb-2">
                          System Instructions Internalized
                        </div>
                        <div className="text-sm font-semibold text-white mb-2">BINDING RULES:</div>
                        <ul className="space-y-1">
                          {phase.bindingRules.map((rule, ruleIndex) => (
                            <li key={ruleIndex} className="flex items-start gap-2 text-sm text-gray-300">
                              <span className="text-cyan-400 mt-1">•</span>
                              <span>{rule}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {phase.requiredFiles && phase.requiredFiles.length > 0 && (
                      <div className="mb-4">
                        <div className="text-sm font-semibold text-white mb-2">Required Files:</div>
                        <ul className="space-y-1">
                          {phase.requiredFiles.map((file, fileIndex) => (
                            <li key={fileIndex} className="flex items-start gap-2 text-sm">
                              <span className="text-cyan-400 mt-1">•</span>
                              <code className="text-[#ce9178] font-mono">{file}</code>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {phase.toolCalls && phase.toolCalls.length > 0 && (
                      <div className="space-y-4">
                        {phase.toolCalls.map((toolCall, toolIndex) => (
                          <div key={toolIndex} className="space-y-2">
                            <div className="text-sm text-gray-400 font-mono">
                              MCP Tool: <span className="text-[#4ec9b0]">{toolCall.tool}</span>
                            </div>
                            
                            {toolCall.arguments && (
                              <div>
                                <div className="text-xs text-gray-500 mb-1">Ran with these arguments:</div>
                                <pre className="bg-[#1e1e1e] border border-[#3e3e42] rounded p-4 overflow-x-auto text-sm font-mono">
                                  <code className="text-[#d4d4d4]">
                                    {JSON.stringify(toolCall.arguments, null, 2)}
                                  </code>
                                </pre>
                              </div>
                            )}

                            {toolCall.output && (
                              <div>
                                <div className="text-xs text-gray-500 mb-1">Output:</div>
                                <pre className="bg-[#1e1e1e] border border-[#3e3e42] rounded p-4 overflow-x-auto text-sm font-mono">
                                  <code className="text-[#d4d4d4]">
                                    {typeof toolCall.output === 'string' 
                                      ? toolCall.output 
                                      : JSON.stringify(toolCall.output, null, 2)}
                                  </code>
                                </pre>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    )}

                    {phase.notes && phase.notes.length > 0 && (
                      <div className="mt-4">
                        <ul className="space-y-2">
                          {phase.notes.map((note, noteIndex) => (
                            <li key={noteIndex} className="flex items-start gap-2 text-sm text-gray-300">
                              <span className="text-green-400 mt-1">✓</span>
                              <span>{note}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.8 }}
          className="text-center mt-12"
        >
          <div className="inline-flex items-center gap-2 bg-green-950/30 border border-green-500/50 rounded-lg px-6 py-3 mb-6">
            <CheckCircle2 className="w-5 h-5 text-green-400" />
            <span className="text-green-400 font-semibold">All Workflow Steps Complete</span>
          </div>
          
          <div className="flex gap-4 justify-center">
            <Link href="/how-it-works" data-test-id="workflow-demo-how-it-works-link">
              <Button
                variant="outline"
                className="border-cyan-500 text-cyan-400 hover:bg-cyan-950/30 hover:text-cyan-300"
                data-test-id="workflow-demo-how-it-works-button"
              >
                Learn More About BrainX
              </Button>
            </Link>
            <Link href="/" data-test-id="workflow-demo-home-link">
              <Button
                className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700"
                data-test-id="workflow-demo-home-button"
              >
                Back to Home
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
