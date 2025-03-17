"use client";

import { ArrowRight, Search, PlayCircle, Star, BookOpen } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

const FeatureSection = () => {
  return (
    <section
      id="features"
      className="section-padding bg-secondary/30 relative overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10 opacity-10">
        <div className="absolute top-1/3 left-1/4 w-96 h-96 rounded-full bg-gradient-to-br from-blue-300 to-purple-300 blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/3 w-80 h-80 rounded-full bg-gradient-to-tr from-yellow-200 to-pink-200 blur-3xl"></div>
      </div>

      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <motion.span
            className="micro-text text-primary/60 block mb-3"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            Features
          </motion.span>
          <motion.h2
            className="title-text mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
          >
            Everything you need to master English
          </motion.h2>
          <motion.p
            className="body-text max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Our platform combines innovative technology with proven learning
            methodologies to enhance your English pronunciation and
            comprehension.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Feature 1 */}
          <motion.div
            className="bg-card rounded-xl p-6 shadow-sm border border-border card-hover relative overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            whileHover={{
              y: -10,
              boxShadow:
                "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
              borderColor: "rgba(139, 92, 246, 0.3)",
            }}
          >
            <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-primary/5 to-transparent rounded-bl-full"></div>
            <div className="w-12 h-12 rounded-lg bg-primary/5 flex items-center justify-center mb-4">
              <PlayCircle className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-xl font-medium mb-3">Video Learning</h3>
            <p className="text-muted-foreground mb-4">
              Watch expert instructors demonstrate proper pronunciation
              techniques and language nuances.
            </p>
            <Link
              href="/learn"
              className="flex items-center text-sm font-medium text-primary hover:underline"
            >
              <span>Explore videos</span>
              <motion.span
                animate={{ x: [0, 5, 0] }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  repeatType: "reverse",
                  ease: "easeInOut",
                }}
              >
                <ArrowRight className="w-4 h-4 ml-1" />
              </motion.span>
            </Link>
          </motion.div>

          {/* Feature 2 */}
          <motion.div
            className="bg-card rounded-xl p-6 shadow-sm border border-border card-hover relative overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            whileHover={{
              y: -10,
              boxShadow:
                "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
              borderColor: "rgba(139, 92, 246, 0.3)",
            }}
          >
            <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-primary/5 to-transparent rounded-bl-full"></div>
            <div className="w-12 h-12 rounded-lg bg-primary/5 flex items-center justify-center mb-4">
              <Search className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-xl font-medium mb-3">Interactive Practice</h3>
            <p className="text-muted-foreground mb-4">
              Use our interactive tools to practice pronunciation, receive
              feedback, and track your progress.
            </p>
            <Link
              href="/practice"
              className="flex items-center text-sm font-medium text-primary hover:underline"
            >
              <span>Try exercises</span>
              <motion.span
                animate={{ x: [0, 5, 0] }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  repeatType: "reverse",
                  ease: "easeInOut",
                }}
              >
                <ArrowRight className="w-4 h-4 ml-1" />
              </motion.span>
            </Link>
          </motion.div>

          {/* Feature 3 */}
          <motion.div
            className="bg-card rounded-xl p-6 shadow-sm border border-border card-hover relative overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
            whileHover={{
              y: -10,
              boxShadow:
                "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
              borderColor: "rgba(139, 92, 246, 0.3)",
            }}
          >
            <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-primary/5 to-transparent rounded-bl-full"></div>
            <div className="w-12 h-12 rounded-lg bg-primary/5 flex items-center justify-center mb-4">
              <BookOpen className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-xl font-medium mb-3">Vocabulary Builder</h3>
            <p className="text-muted-foreground mb-4">
              Expand your vocabulary with context-based word learning and
              retention techniques.
            </p>
            <Link
              href="/learn"
              className="flex items-center text-sm font-medium text-primary hover:underline"
            >
              <span>Build vocabulary</span>
              <motion.span
                animate={{ x: [0, 5, 0] }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  repeatType: "reverse",
                  ease: "easeInOut",
                }}
              >
                <ArrowRight className="w-4 h-4 ml-1" />
              </motion.span>
            </Link>
          </motion.div>
        </div>

        {/* Features illustration - use second image */}
        <motion.div
          className="mt-16 max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          <div className="relative rounded-2xl shadow-xl overflow-hidden">
            <Image
              src="/133679140_10219929.jpg"
              width={500}
              height={500}
              alt="Child reading with magical creatures"
              className="w-full h-auto"
            />
            <div className="absolute top-4 left-4 bg-white/80 backdrop-blur-sm p-2 rounded-lg shadow border border-primary/10 hidden md:block">
              <div className="flex items-center gap-2">
                <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                <span className="text-xs font-medium">
                  Imagination-driven learning
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FeatureSection;
