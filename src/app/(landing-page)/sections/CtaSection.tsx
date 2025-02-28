"use client";

import { ArrowRight, Zap } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

const CtaSection = () => {
  return (
    <section className="section-padding bg-primary text-primary-foreground relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10 opacity-30">
        {/* Animated waves */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="absolute inset-0 w-full h-full"
          preserveAspectRatio="none"
        >
          <defs>
            <path
              id="wave1"
              d="M0,160 C320,300,420,300,740,175 C1060,50,1120,116,1440,120 V0 H0"
            />
            <path
              id="wave2"
              d="M0,160 C310,220,410,140,740,140 C1070,140,1130,200,1440,120 V0 H0"
            />
          </defs>
          <use href="#wave1" fill="white" opacity="0.1">
            <animate
              attributeName="d"
              values="
                  M0,160 C320,300,420,300,740,175 C1060,50,1120,116,1440,120 V0 H0;
                  M0,160 C320,200,420,100,740,175 C1060,250,1120,216,1440,120 V0 H0;
                  M0,160 C320,300,420,300,740,175 C1060,50,1120,116,1440,120 V0 H0"
              dur="20s"
              repeatCount="indefinite"
            />
          </use>
          <use href="#wave2" fill="white" opacity="0.05">
            <animate
              attributeName="d"
              values="
                  M0,160 C310,220,410,140,740,140 C1070,140,1130,200,1440,120 V0 H0;
                  M0,160 C310,120,410,240,740,140 C1070,40,1130,100,1440,120 V0 H0;
                  M0,160 C310,220,410,140,740,140 C1070,140,1130,200,1440,120 V0 H0"
              dur="15s"
              repeatCount="indefinite"
            />
          </use>
        </svg>

        <div className="absolute -top-20 right-20 w-40 h-40 rounded-full bg-white/20 blur-2xl"></div>
        <div className="absolute bottom-10 left-10 w-60 h-60 rounded-full bg-white/10 blur-3xl"></div>
      </div>

      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 mb-6 bg-white/10 px-4 py-2 rounded-full"
          >
            <Zap className="w-5 h-5" />
            <span className="text-sm font-medium">
              Start your journey today
            </span>
          </motion.div>

          <motion.h2
            className="title-text mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
          >
            Ready to transform your English skills?
          </motion.h2>

          <motion.p
            className="text-primary-foreground/80 mb-8 text-lg"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Join EndlessWiz today and start your journey to English fluency with
            our comprehensive learning tools.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
              <Link
                href="/signup"
                className="bg-primary-foreground text-primary button-primary hover:bg-primary-foreground/90 group"
              >
                <span>Get Started for Free</span>
                <motion.span
                  animate={{ x: [0, 5, 0] }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    repeatType: "reverse",
                    ease: "easeInOut",
                  }}
                >
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </motion.span>
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
              <Link
                href="/learn"
                className="bg-transparent border border-primary-foreground/20 hover:bg-primary-foreground/10 text-primary-foreground button-outline"
              >
                Explore Lessons
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CtaSection;
