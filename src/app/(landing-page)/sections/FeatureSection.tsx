"use client";

import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

const features = [
  {
    title: "Progress Tracking",
    description:
      "Monitor your learning journey with detailed analytics and insights that help you stay on track. Our system provides:",
    details: [
      "Real-time progress updates",
      "Personalized learning insights",
      "Achievement milestones tracking",
    ],
    media: "/tracking.png",
    badge: "Analytics Dashboard",
    type: "IMAGE",
  },
  {
    title: "Learning Sets",
    description:
      "Access curated collections of lessons and exercises tailored to your level. Each set includes:",
    details: [
      "Level-specific content",
      "Interactive exercises",
      "Expert-crafted lessons",
    ],
    media: "/practice.png",
    badge: "Smart Curriculum",
    type: "IMAGE",
    reverse: true,
  },
  {
    title: "Interactive Games",
    description:
      "Reinforce your skills through engaging gameplay. Features include:",
    details: [
      "Adaptive difficulty levels",
      "Instant feedback system",
      "Multiplayer challenges",
    ],
    media: "/practice.mov",
    badge: "Gamified Learning",
    type: "VIDEO",
  },
];

const FeatureSection = () => {
  return (
    <section
      id="features"
      className="section-padding bg-background relative overflow-hidden"
    >
      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center mb-16">
          <motion.span
            className="text-sm font-semibold text-primary mb-4 block"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            POWERFUL FEATURES
          </motion.span>
          <motion.h2
            className="text-4xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-primary to-forest-600 bg-clip-text text-transparent"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
          >
            Master English Through Innovation
          </motion.h2>
          <motion.p
            className="text-lg text-muted-foreground max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Experience language learning reimagined with cutting-edge technology
            and scientifically proven methods.
          </motion.p>
        </div>

        <div className="space-y-20">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className={`flex flex-col ${
                feature.reverse ? "md:flex-row-reverse" : "md:flex-row"
              } gap-8 items-center`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true, margin: "-100px" }}
            >
              {/* Media Container */}
              {/* Media Container */}
              <div className="w-full md:w-1/2 relative group">
                <div className="relative rounded-xl overflow-hidden shadow-xl border border-border h-[400px]">
                  {feature.type === "IMAGE" ? (
                    <Image
                      src={feature.media}
                      fill
                      alt={feature.title}
                      className="object-scale-down" // Changed from object-cover
                      sizes="(max-width: 768px) 100vw, 50vw"
                      style={{
                        objectPosition: "center center", // Ensure proper centering
                        backgroundColor: "#f8f9fa", // Add background color for non-cover images
                      }}
                    />
                  ) : (
                    <video
                      autoPlay
                      muted
                      loop
                      className="w-full h-full object-fill"
                    >
                      <source
                        src={feature.media}
                        type="video/mp4"
                      />
                    </video>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-background/20 to-transparent" />
                </div>
                <div className="absolute top-4 left-4 bg-primary/90 text-background px-3 py-1 rounded-full text-sm font-medium shadow-sm">
                  {feature.badge}
                </div>
              </div>

              {/* Content Container */}
              <div className="w-full md:w-1/2 space-y-4">
                <h3 className="text-3xl font-bold bg-gradient-to-r from-foreground to-primary bg-clip-text text-transparent">
                  {feature.title}
                </h3>
                <p className="text-lg text-muted-foreground">
                  {feature.description}
                </p>
                <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                  {feature.details?.map((detail, i) => (
                    <li
                      key={i}
                      className="hover:text-primary transition-colors"
                    >
                      {detail}
                    </li>
                  ))}
                </ul>
                <Link
                  href="/auth/register"
                  className="inline-flex items-center gap-2 group text-primary font-semibold mt-4"
                >
                  <span>Start Learning Now</span>
                  <motion.span
                    animate={{ x: [0, 5, 0] }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      repeatType: "reverse",
                      ease: "easeInOut",
                    }}
                  >
                    <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                  </motion.span>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Background effects */}
      <div className="absolute inset-0 -z-10 opacity-15">
        <div className="absolute top-1/3 left-1/4 w-[30rem] h-[30rem] rounded-full bg-gradient-to-br from-blue-300/30 to-purple-300/30 blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/3 w-[25rem] h-[25rem] rounded-full bg-gradient-to-tr from-yellow-200/30 to-pink-200/30 blur-3xl animate-pulse delay-1000"></div>
      </div>
    </section>
  );
};

export default FeatureSection;
