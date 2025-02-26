"use client";

import { ButtonWithAnimation } from "@/components/ButtonWithAnimation";
import { Navbar } from "@/components/navbar/Navbar";
import { motion } from "framer-motion";
import Image from "next/image";

export default function LandingPage() {

  const scrollToSearch = () => {
    document.getElementById("search-section")?.scrollIntoView({
      behavior: "smooth",
    });
  };

  return (
    <div className="h-full bg-[var(--primary-color)]">
      <Navbar />

      {/* Hero Section */}
      <div className="container h-full mx-auto px-4 py-16 flex flex-col md:flex-row items-center justify-between">
        {/* Left Text Content */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="md:w-1/2 mb-12 md:mb-0"
        >
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
            Master English Pronunciation{" "}
            <span className="text-blue-400">Like a Native!</span>
          </h1>
          <p className="text-xl text-gray-200 mb-8">
            Transform your speaking skills with real-world video examples.
            Perfect your accent, boost your confidence, and speak English
            fluently!
          </p>

          <motion.div
            initial={{ scale: 0.95 }}
            animate={{
              scale: [1, 1.02, 1],
              y: [0, -5, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <ButtonWithAnimation onClick={scrollToSearch}>
              <span className="relative z-10">
                Perfect Your Pronunciation Now ↓
              </span>
              <motion.div
                className="absolute inset-0 bg-white/20"
                initial={{ x: "-100%" }}
                animate={{ x: "100%" }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            </ButtonWithAnimation>
          </motion.div>

          <p className="mt-4 text-gray-300 text-sm">
            Enter any word below to hear native pronunciation examples 💫
          </p>
        </motion.div>

        {/* Right Animated Image */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="md:w-1/2 h-full flex justify-center"
        >
          <div className="relative w-full h-full">
            <Image
              src="/image5.png"
              alt="Happy language learner"
              fill
              priority
              className="object-contain"
              style={{
                filter: "drop-shadow(0 25px 25px rgba(0,0,0,0.3))",
              }}
            />
          </div>
        </motion.div>
      </div>

      {/* Search Section */}
      <section id="search-section" className="min-h-screen bg-white py-20 px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto text-center"
        >
          <h2 className="text-4xl font-bold text-gray-800 mb-8">
            Discover Perfect Pronunciation
          </h2>
          <p className="text-gray-600 mb-12 text-xl">
            Enter any English word or phrase below and get instant video
            examples from real speakers
          </p>

          <div className="relative max-w-2xl mx-auto">
            <input
              type="text"
              placeholder="Enter a word to pronounce..."
              className="w-full px-6 py-4 rounded-full border-2 border-gray-200 focus:border-blue-500 focus:outline-none text-lg shadow-lg"
            />
            <button className="absolute right-2 top-2 bg-blue-500 text-white px-8 py-3 rounded-full hover:bg-blue-600 transition-colors duration-300">
              Search
            </button>
          </div>

          {/* Video Grid Placeholder */}
          <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">



          </div>
        </motion.div>
      </section>
    </div>
  );
}
