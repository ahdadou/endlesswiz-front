// app/page.tsx
"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { BookOpen, Gamepad, Video, Trophy, Clock, Star } from "lucide-react";

export default function Home() {
  // Mock data
  const progressData = {
    dailyStreak: 16,
    masteredWords: 245,
    timeSpent: "45h",
    dailyGoals: 75, // Percentage
    recentWords: ["Serendipity", "Ephemeral", "Quintessential"],
  };

  return (
    <div className="bg-white text-gray-900 flex">
      <main className="flex-1 p-8 bg-gray-50">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900">
            Learning Dashboard
          </h1>
          <div className="flex items-center gap-4">
            <Button variant="ghost" className="text-blue-500">
              <Star className="w-5 h-5 mr-2" />
              2450 Points
            </Button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {[
            {
              icon: <Trophy className="w-8 h-8 text-blue-500" />,
              title: "Daily Streak",
              value: `${progressData.dailyStreak} days`,
              bg: "bg-blue-50",
            },
            {
              icon: <BookOpen className="w-8 h-8 text-purple-500" />,
              title: "Mastered Words",
              value: progressData.masteredWords,
              bg: "bg-purple-50",
            },
            {
              icon: <Clock className="w-8 h-8 text-green-500" />,
              title: "Time Spent",
              value: progressData.timeSpent,
              bg: "bg-green-50",
            },
          ].map((stat, index) => (
            <motion.div
              key={index}
              className={`${stat.bg} p-6 rounded-xl border border-gray-200`}
              whileHover={{ y: -5 }}
            >
              <div className="flex items-center gap-4">
                {stat.icon}
                <div>
                  <h3 className="text-gray-500 mb-1">{stat.title}</h3>
                  <div className="text-2xl font-bold text-gray-900">
                    {stat.value}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Progress Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Daily Goals */}
          <div className="bg-white p-6 rounded-xl border border-gray-200">
            <h3 className="text-lg font-semibold mb-4">Daily Goals</h3>
            <div className="flex items-center gap-6">
              <div className="relative w-24 h-24">
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-2xl font-bold text-gray-900">
                    {progressData.dailyGoals}%
                  </span>
                </div>
                <svg className="transform -rotate-90 w-24 h-24">
                  <circle
                    cx="48"
                    cy="48"
                    r="44"
                    className="stroke-current text-gray-200"
                    strokeWidth="8"
                    fill="none"
                  />
                  <circle
                    cx="48"
                    cy="48"
                    r="44"
                    className="stroke-current text-blue-500"
                    strokeWidth="8"
                    fill="none"
                    strokeDasharray={`${2.75 * progressData.dailyGoals} 282`}
                  />
                </svg>
              </div>
              <div className="space-y-2">
                <p className="text-gray-600">15/20 words learned</p>
                <p className="text-gray-600">45/60 minutes studied</p>
              </div>
            </div>
          </div>

          {/* Recent Words */}
          <div className="bg-white p-6 rounded-xl border border-gray-200">
            <h3 className="text-lg font-semibold mb-4">Recent Words</h3>
            <div className="space-y-3">
              {progressData.recentWords.map((word, index) => (
                <motion.div
                  key={index}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                  whileHover={{ x: 5 }}
                >
                  <span className="font-medium text-gray-900">{word}</span>
                  <Button variant="ghost" size="sm" className="text-blue-500">
                    Practice
                  </Button>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              icon: <Gamepad className="w-12 h-12 text-purple-500" />,
              title: "Pronunciation Games",
              description: "Improve your skills through interactive challenges",
              button: "Start Playing",
              bg: "bg-purple-50",
            },
            {
              icon: <Video className="w-12 h-12 text-blue-500" />,
              title: "Video Library",
              description: "Watch and learn from real-life examples",
              button: "Browse Videos",
              bg: "bg-blue-50",
            },
            {
              icon: <Star className="w-12 h-12 text-yellow-500" />,
              title: "Achievements",
              description: "Unlock rewards and track progress",
              button: "View Achievements",
              bg: "bg-yellow-50",
            },
          ].map((action, index) => (
            <motion.div
              key={index}
              className={`${action.bg} p-6 rounded-xl border border-gray-200 flex flex-col items-center text-center`}
              whileHover={{ scale: 1.05 }}
            >
              {action.icon}
              <h3 className="text-lg font-semibold mb-2 mt-4">
                {action.title}
              </h3>
              <p className="text-gray-600 mb-4">{action.description}</p>
              <Button className="w-full bg-white text-gray-900 hover:bg-gray-100 border border-gray-200">
                {action.button}
              </Button>
            </motion.div>
          ))}
        </div>
      </main>
    </div>
  );
}
