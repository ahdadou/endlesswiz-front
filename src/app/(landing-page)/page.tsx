"use client";

import { ButtonWithAnimation } from "@/components/ButtonWithAnimation";
import { Navbar } from "@/components/navbar/Navbar";
import { motion } from "framer-motion";
import {
  Captions,
  CheckCircle,
  ChevronLeft,
  ChevronRight,
  Clock,
  PlayCircle,
  Search,
  Settings,
  Star,
  Volume2,
  Zap,
} from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import YouTube from "react-youtube";

export default function LandingPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [videoId, setVideoId] = useState("dQw4w9WgXcQ"); // Initial S3 video ID
  const [isSearching, setIsSearching] = useState(false);

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

      {/* Section 2: Features */}
      <section id="Features" className="py-20 px-4 bg-[var(--primary-color)]">
        <div className="container mx-auto px-6 grid md:grid-cols-3 gap-8">
          {[
            {
              icon: <Volume2 size={32} className="text-blue-600" />,
              title: "Instant Feedback",
              text: "Get real-time pronunciation analysis using AI technology",
            },
            {
              icon: <Zap size={32} className="text-blue-600" />,
              title: "Quick Learning",
              text: "Master accents faster with native speaker comparisons",
            },
            {
              icon: <Star size={32} className="text-blue-600" />,
              title: "Expert Curated",
              text: "Content created by language specialists",
            },
          ].map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600">{feature.text}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Search Section */}
      <section id="search-section" className="min-h-screen  py-20 px-4 bg-[var(--primary-color)]">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto text-center"
        >
          <h2 className="text-4xl font-bold text-white mb-8">
            Discover Perfect Pronunciation
          </h2>
          <p className="text-gray-400 mb-8 text-xl">
            Enter any English word or phrase below and get instant video
            examples from real speakers
          </p>
          <div className="relative max-w-2xl mx-auto mb-8">
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
          <div className="bg-white rounded-2xl shadow-xl p-6">
            <div className="aspect-video bg-gray-100 rounded-xl overflow-hidden">
              <YouTube
                videoId="dQw4w9WgXcQ"
                opts={{
                  height: "100%",
                  width: "100%",
                  playerVars: { modestbranding: 1, rel: 0 },
                }}
                className="w-full h-full"
              />
            </div>

            {/* Video Controls */}
            <div className="mt-6 flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <div className="flex gap-4">
                  <button className="p-2 hover:bg-gray-100 rounded-lg">
                    <ChevronLeft className="text-gray-700" />
                  </button>
                  <button className="p-2 hover:bg-gray-100 rounded-lg">
                    <ChevronRight className="text-gray-700" />
                  </button>
                  <button className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 rounded-lg">
                    <Clock size={18} />
                    <span>Speed: 1x</span>
                  </button>
                </div>

                <div className="flex gap-4">
                  <button className="p-2 hover:bg-gray-100 rounded-lg">
                    <Captions size={20} />
                  </button>
                  <button className="p-2 hover:bg-gray-100 rounded-lg">
                    <Settings size={20} />
                  </button>
                </div>
              </div>

              {/* Subtitles Section */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex gap-2 items-center text-gray-600 mb-2">
                  <Captions size={16} />
                  <span className="font-medium">English Subtitles</span>
                </div>
                <p className="text-gray-700">
                  [00:00] "Serendipity" - The occurrence of events by chance in
                  a happy way
                </p>
              </div>
            </div>
          </div>{" "}
        </motion.div>
      </section>

      {/* Section 4: How It Works */}
      <section id="HowItWorks" className="py-20">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center text-white mb-16">
            How It Works
          </h2>
          <div className="grid md:grid-cols-4 gap-8">
            {[
              {
                icon: <Search size={24} />,
                title: "Search",
                text: "Find your target word or phrase",
              },
              {
                icon: <PlayCircle size={24} />,
                title: "Watch",
                text: "View native speaker examples",
              },
              {
                icon: <Volume2 size={24} />,
                title: "Practice",
                text: "Record your pronunciation",
              },
              {
                icon: <CheckCircle size={24} />,
                title: "Improve",
                text: "Get instant feedback",
              },
            ].map((step, i) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="bg-white p-6 rounded-xl shadow-lg text-center"
              >
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  {step.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {step.title}
                </h3>
                <p className="text-gray-600">{step.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 5: Testimonials */}
      <section id="Testimonials" className="py-20">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center text-white mb-16">
            Success Stories
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Sarah Johnson",
                role: "ESL Teacher",
                text: "This platform transformed how I teach pronunciation. The video examples are invaluable!",
                avatar: "https://randomuser.me/api/portraits/women/1.jpg",
              },
              {
                name: "Mohamed Ali",
                role: "Business Professional",
                text: "I've improved my accent dramatically in just 3 months. Highly recommended!",
                avatar: "https://randomuser.me/api/portraits/men/1.jpg",
              },
              {
                name: "Emily Chen",
                role: "University Student",
                text: "The feedback system helped me identify my weak points accurately.",
                avatar: "https://randomuser.me/api/portraits/women/2.jpg",
              },
            ].map((testimonial, i) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="bg-white p-6 rounded-xl shadow-lg border border-gray-100"
              >
                <div className="flex items-center gap-4 mb-4">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full"
                  />
                  <div>
                    <h4 className="font-bold text-gray-900">
                      {testimonial.name}
                    </h4>
                    <p className="text-gray-600 text-sm">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-gray-700">"{testimonial.text}"</p>
                <div className="mt-4 flex gap-1 text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={16} fill="currentColor" />
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="text-white py-12">
        <div className="container mx-auto px-6 grid md:grid-cols-4 gap-8">
          <div>
            <h4 className="text-lg font-bold mb-4">PronouncePro</h4>
            <p className="text-gray-400">
              Master English pronunciation through authentic examples
            </p>
          </div>
          <div>
            <h4 className="text-lg font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-gray-400">
              {["About", "Features", "Pricing", "Contact"].map((link) => (
                <li key={link} className="hover:text-white cursor-pointer">
                  {link}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-bold mb-4">Legal</h4>
            <ul className="space-y-2 text-gray-400">
              {["Privacy", "Terms", "Security"].map((link) => (
                <li key={link} className="hover:text-white cursor-pointer">
                  {link}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-bold mb-4">Newsletter</h4>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Enter email"
                className="bg-white/10 px-4 py-2 rounded-lg flex-1"
              />
              <button className="bg-blue-600 px-4 py-2 rounded-lg hover:bg-blue-700">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/10 text-center text-gray-400">
          <p>© 2024 PronouncePro. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
