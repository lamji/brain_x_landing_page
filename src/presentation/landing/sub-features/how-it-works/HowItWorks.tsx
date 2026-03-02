"use client";

import { motion } from "framer-motion";
import { Workflow, Database, Brain, Shield, Zap, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useHowItWorks } from "./useHowItWorks";
import Link from "next/link";

const iconMap = {
  "workflow": Workflow,
  "database": Database,
  "brain": Brain,
  "shield": Shield,
  "zap": Zap
};

export function HowItWorks() {
  const { sections } = useHowItWorks();

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
          className="mb-16"
        >
          <Link href="/" data-test-id="how-it-works-back-button">
            <Button
              variant="ghost"
              className="text-cyan-400 hover:text-cyan-300 hover:bg-cyan-950/30 mb-8"
              data-test-id="how-it-works-back-link"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
          </Link>

          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-cyan-400 bg-clip-text text-transparent">
              How BrainX Works
            </span>
          </h1>
          <p className="text-xl text-cyan-100 max-w-3xl">
            A deep dive into the architecture, safety mechanisms, and learning systems that power autonomous AI execution.
          </p>
        </motion.div>

        <div className="max-w-5xl mx-auto relative">
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-cyan-500/50 via-blue-500/50 to-cyan-500/50 hidden md:block" />

          {sections.map((section, index) => {
            const Icon = iconMap[section.icon as keyof typeof iconMap];
            return (
              <motion.div
                key={section.id}
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 + index * 0.15, duration: 0.6 }}
                className="relative mb-16 md:pl-24"
                data-test-id={`how-it-works-section-${section.id}`}
              >
                <div className="absolute left-0 top-0 hidden md:block">
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 360 }}
                    transition={{ duration: 0.6 }}
                    className="w-16 h-16 bg-gradient-to-br from-cyan-500/20 to-blue-600/20 rounded-full flex items-center justify-center border-2 border-cyan-500/50 backdrop-blur-sm"
                  >
                    <Icon className="w-8 h-8 text-cyan-400" />
                  </motion.div>
                </div>

                <motion.div
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                  className="bg-slate-900/50 border border-cyan-900/30 backdrop-blur-sm rounded-lg p-8 hover:border-cyan-500/50 transition-all duration-300 shadow-lg hover:shadow-cyan-500/20"
                >
                  <div className="flex items-start gap-4 mb-4 md:hidden">
                    <div className="w-12 h-12 bg-gradient-to-br from-cyan-500/20 to-blue-600/20 rounded-lg flex items-center justify-center border border-cyan-500/30 flex-shrink-0">
                      <Icon className="w-6 h-6 text-cyan-400" />
                    </div>
                    <h2 className="text-3xl font-bold text-cyan-100">
                      {section.title}
                    </h2>
                  </div>

                  <h2 className="text-3xl font-bold text-cyan-100 mb-4 hidden md:block">
                    {section.title}
                  </h2>

                  <p className="text-slate-300 text-lg mb-6 leading-relaxed">
                    {section.description}
                  </p>

                  <div className="space-y-3">
                    {section.keyPoints.map((point, pointIndex) => (
                      <motion.div
                        key={pointIndex}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4 + index * 0.15 + pointIndex * 0.05, duration: 0.4 }}
                        className="flex items-start gap-3"
                        data-test-id={`how-it-works-point-${section.id}-${pointIndex}`}
                      >
                        <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full mt-2.5 flex-shrink-0" />
                        <p className="text-slate-400 leading-relaxed">{point}</p>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.8 }}
          className="text-center mt-16"
        >
          <div className="flex gap-4 justify-center">
            <Link href="/demo" data-test-id="how-it-works-demo-link">
              <Button
                size="lg"
                variant="outline"
                className="border-green-500 text-green-400 hover:bg-green-950/30 hover:text-green-300 font-semibold px-8 py-6 text-lg"
                data-test-id="how-it-works-demo-button"
              >
                See Demo
              </Button>
            </Link>
            <Link href="/" data-test-id="how-it-works-bottom-home-link">
              <Button
                size="lg"
                className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-semibold px-8 py-6 text-lg shadow-lg shadow-cyan-500/50"
                data-test-id="how-it-works-bottom-home-button"
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
