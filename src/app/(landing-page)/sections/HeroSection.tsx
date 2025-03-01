"use client";
import { ArrowRight, GraduationCap } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ButtonWithAnimation } from "@/components/ButtonWithAnimation";

const HeroSection = () => {
  return (
    <section className="pt-32 pb-16 md:py-40 relative overflow-hidden h-[90vh]">
      <motion.div
        className="absolute inset-0 z-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="relative w-full h-full">
          <div className="absolute inset-0 bg-gradient-to-b from-background/100 to-background/80 z-10" />
          <Image
            height={500}
            width={500}
            src="/133679140_10219929.jpg"
            alt="Main background"
            className="w-full h-full object-cover object-center"
            priority
          />
        </div>
      </motion.div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          className="max-w-3xl mx-auto text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Content remains the same */}
          <motion.span
            className="inline-block py-1 px-3 mb-6 rounded-full bg-primary/5 text-sm font-medium border border-primary/10"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.4 }}
          >
            Transform Your English Learning
          </motion.span>
          <h1 className="hero-text mb-6">
            Master English pronunciation with
            <span className="relative inline-block mx-2">clarity</span>
            and
            <span className="relative inline-block mx-2">confidence</span>
          </h1>
          <p className="subtitle-text mb-10 max-w-2xl mx-auto">
            EndlessWiz provides interactive tools and expert guidance to help
            you perfect your English pronunciation, vocabulary, and fluency.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
              <Link
                href="/auth/signup"
                className="button-primary flex items-center gap-2"
              >
                Start Learning
                <motion.span
                  animate={{ x: [0, 5, 0] }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    repeatType: "reverse",
                    ease: "easeInOut",
                    delay: 1,
                  }}
                >
                  <ArrowRight className="w-4 h-4" />
                </motion.span>
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
              <a href="#search-section" className="button-outline bg-white/80 ">
                Perfect Your Pronunciation Now ↓
              </a>
            </motion.div>
          </div>
          <p className="mt-4 text-gray-300 text-sm">
            Enter any word below to hear native pronunciation examples 💫
          </p>
        </motion.div>
      </div>
      {/* Animated shape overlay */}
      <motion.div
        className="absolute inset-0 z-0 pointer-events-none"
        initial={{ clipPath: "polygon(0 0, 100% 0, 100% 20%, 0 40%)" }}
        animate={{
          clipPath: [
            "polygon(0 0, 100% 0, 100% 20%, 0 40%)",
            "polygon(0 30%, 100% 0, 100% 30%, 0 60%)",
            "polygon(0 0, 100% 0, 100% 20%, 0 40%)",
          ],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <div className=" relative w-full h-full bg-primary/5 backdrop-blur-[2px]" />
      </motion.div>
    </section>
  );
};

export default HeroSection;
