"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface VictoryAnimationProps {
  isActive: boolean;
  onComplete?: () => void;
}

export default function VictoryAnimation({
  isActive,
  onComplete,
}: VictoryAnimationProps) {
  const [particles, setParticles] = useState<
    {
      id: number;
      x: number;
      y: number;
      size: number;
      color: string;
      delay: number;
    }[]
  >([]);

  useEffect(() => {
    if (isActive) {
      // Create particles for the animation
      const newParticles = [];
      const colors = ["#FFD700", "#FF6B6B", "#4ECDC4", "#45B7D1", "#96CEB4"];

      for (let i = 0; i < 60; i++) {
        newParticles.push({
          id: i,
          x: Math.random() * 120 - 60, // Wider spread
          y: Math.random() * 120 - 60,
          size: Math.random() * 15 + 8,
          color: colors[Math.floor(Math.random() * colors.length)],
          delay: Math.random() * 0.8,
        });
      }

      setParticles(newParticles);

      const timer = setTimeout(() => {
        if (onComplete) onComplete();
      }, 3500);

      return () => clearTimeout(timer);
    }
  }, [isActive, onComplete]);

  if (!isActive) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-50 flex items-center justify-center overflow-hidden">
      <AnimatePresence>
        {isActive && (
          <>
            {/* Trophy Icon */}
            <motion.div
              initial={{ scale: 0, rotate: -20, opacity: 0 }}
              animate={{
                scale: 1,
                rotate: 0,
                opacity: 1,
                transition: {
                  type: "spring",
                  stiffness: 200,
                  damping: 15,
                },
              }}
              exit={{ scale: 0, opacity: 0 }}
              className="relative"
            >
              {/* Glow effect */}
              <motion.div
                className="absolute inset-0 bg-yellow-400 rounded-full opacity-20"
                initial={{ scale: 0 }}
                animate={{ scale: 2.5, opacity: 0 }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
            </motion.div>

            {/* Confetti Particles */}
            {particles.map((particle) => (
              <motion.div
                key={particle.id}
                initial={{ x: 0, y: 0, opacity: 0, scale: 0 }}
                animate={{
                  x: `${particle.x}vw`,
                  y: `${particle.y}vh`,
                  opacity: [0, 1, 0],
                  scale: [0, 1, 0.8],
                  rotate: Math.random() * 720, // More dynamic rotation
                }}
                transition={{
                  duration: 2.5,
                  delay: particle.delay,
                  ease: "easeOut",
                }}
                style={{
                  position: "absolute",
                  width: particle.size,
                  height: particle.size / 2, // Rectangular confetti shape
                  backgroundColor: particle.color,
                  borderRadius: "2px",
                  transformOrigin: "center",
                }}
                className="confetti-particle"
              />
            ))}

            {/* Sparkle effects */}
            {Array.from({ length: 8 }).map((_, i) => (
              <motion.div
                key={`sparkle-${i}`}
                initial={{ scale: 0, opacity: 0 }}
                animate={{
                  scale: [0, 1, 0],
                  opacity: [0, 1, 0],
                  x: Math.cos((i * Math.PI) / 4) * 80,
                  y: Math.sin((i * Math.PI) / 4) * 80,
                }}
                transition={{
                  duration: 1.2,
                  delay: i * 0.1,
                  repeat: 1,
                }}
                style={{
                  position: "absolute",
                  width: "8px",
                  height: "8px",
                  backgroundColor: "#FFD700",
                  borderRadius: "50%",
                }}
              />
            ))}
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
