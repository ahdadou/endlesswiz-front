// app/games/page.tsx - Games Page
"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Gamepad, Trophy, Star, Zap } from "lucide-react";

export default function GamesPage() {
  const games = [
    {
      title: "Pronunciation Puzzle",
      description: "Match sounds to words in this interactive challenge",
      difficulty: "Easy",
      progress: 65,
      icon: <Zap className="w-8 h-8 text-purple-500" />,
    },
    // Add more games...
  ];

  return (
    <div className="min-h-screen bg-white text-gray-900 flex">
      {/* Shared Sidebar */}

      <main className="flex-1 p-8 bg-gray-50">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold">Learning Games</h1>
          <div className="flex items-center gap-2">
            <Trophy className="w-5 h-5 text-yellow-500" />
            <span className="font-medium">Your Rank: #42</span>
          </div>
        </div>

        {/* Games Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {games.map((game, index) => (
            <motion.div
              key={index}
              className="bg-white p-6 rounded-xl border border-gray-200 hover:border-purple-200 transition-all"
              whileHover={{ scale: 1.02 }}
            >
              <div className="flex items-start gap-4">
                <div className="bg-purple-50 p-3 rounded-lg">{game.icon}</div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold mb-2">{game.title}</h3>
                  <p className="text-gray-600 mb-4">{game.description}</p>
                  <div className="flex items-center justify-between">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-purple-500 h-2 rounded-full"
                        style={{ width: `${game.progress}%` }}
                      />
                    </div>
                    <span className="ml-4 text-sm text-gray-500">
                      {game.progress}%
                    </span>
                  </div>
                </div>
              </div>
              <Button className="w-full mt-4" variant="outline">
                Play Now
              </Button>
            </motion.div>
          ))}
        </div>

        {/* Leaderboard Section */}
        <div className="mt-12 bg-white p-6 rounded-xl border border-gray-200">
          <h2 className="text-xl font-bold mb-4">Weekly Leaderboard</h2>
          <div className="space-y-3">
            {[1, 2, 3, 4, 5].map((rank) => (
              <div
                key={rank}
                className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg"
              >
                <div className="flex items-center gap-3">
                  <span className="font-medium">#{rank}</span>
                  <span className="font-semibold">User {rank}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Star className="w-4 h-4 text-yellow-500" />
                  <span>{1500 - rank * 100} XP</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
