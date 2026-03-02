"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export function AiNeuralLines() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <motion.div
        className="absolute left-1/2 top-1/3 -translate-x-1/2 -translate-y-1/2"
        animate={{
          scale: [1, 1.05, 1],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <motion.div
          className="relative w-48 h-48 flex items-center justify-center"
          animate={{
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <motion.div
            className="absolute inset-0 rounded-full bg-cyan-400 blur-3xl"
            animate={{
              opacity: [0.2, 0.5, 0.2],
              scale: [1, 1.4, 1],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          
          <motion.div
            className="absolute inset-0 rounded-full bg-blue-500 blur-2xl"
            animate={{
              opacity: [0.1, 0.3, 0.1],
              scale: [1.2, 1.6, 1.2],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.5,
            }}
          />
          
          <div className="relative w-32 h-32 z-10">
            <Image
              src="/icons/favicon-256x256.png"
              alt="BrainX AI"
              width={128}
              height={128}
              className="w-full h-full object-contain drop-shadow-2xl"
              priority
            />
          </div>
        </motion.div>
      </motion.div>

      <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
        <defs>
          <linearGradient id="neuralGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgba(6, 182, 212, 0.6)" />
            <stop offset="100%" stopColor="rgba(59, 130, 246, 0.3)" />
          </linearGradient>
        </defs>

        <motion.path
          d="M 50% 33% L 20% 20%"
          stroke="url(#neuralGradient)"
          strokeWidth="2"
          fill="none"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{
            pathLength: [0, 1, 0],
            opacity: [0, 0.8, 0],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        
        <motion.path
          d="M 50% 33% L 80% 20%"
          stroke="url(#neuralGradient)"
          strokeWidth="2"
          fill="none"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{
            pathLength: [0, 1, 0],
            opacity: [0, 0.8, 0],
          }}
          transition={{
            duration: 3,
            delay: 0.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        
        <motion.path
          d="M 50% 33% L 15% 50%"
          stroke="url(#neuralGradient)"
          strokeWidth="2"
          fill="none"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{
            pathLength: [0, 1, 0],
            opacity: [0, 0.8, 0],
          }}
          transition={{
            duration: 3,
            delay: 1,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        
        <motion.path
          d="M 50% 33% L 85% 50%"
          stroke="url(#neuralGradient)"
          strokeWidth="2"
          fill="none"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{
            pathLength: [0, 1, 0],
            opacity: [0, 0.8, 0],
          }}
          transition={{
            duration: 3,
            delay: 1.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </svg>

      {Array.from({ length: 15 }).map((_, i) => (
        <motion.div
          key={`particle-${i}`}
          className="absolute w-1 h-1 bg-cyan-400 rounded-full"
          style={{
            left: `${(i * 23 + 15) % 90 + 5}%`,
            top: `${(i * 31 + 10) % 60 + 10}%`,
          }}
          animate={{
            opacity: [0, 1, 0],
            scale: [0, 1.5, 0],
          }}
          transition={{
            duration: 2 + (i % 3),
            delay: i * 0.15,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}
