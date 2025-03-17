"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Award,
  Trophy,
  Star,
  Zap,
  BookOpen,
  Clock,
  Target,
  Medal,
  Crown,
  Flame,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";

// Mock achievement data
const achievementData = {
  recentAchievements: [
    {
      id: 1,
      title: "Study Streak",
      description: "Studied for 7 consecutive days",
      icon: <Flame className="h-8 w-8 text-orange-500" />,
      date: "2 days ago",
      points: 50,
      type: "streak",
    },
    {
      id: 2,
      title: "Vocabulary Master",
      description: "Learned 100 new words",
      icon: <BookOpen className="h-8 w-8 text-blue-500" />,
      date: "1 week ago",
      points: 100,
      type: "learning",
    },
    {
      id: 3,
      title: "Perfect Score",
      description: "Got 100% on a test",
      icon: <Star className="h-8 w-8 text-yellow-500" />,
      date: "2 weeks ago",
      points: 75,
      type: "test",
    },
  ],
  badges: [
    {
      id: 1,
      title: "Early Bird",
      description: "Complete 10 study sessions before 9 AM",
      icon: <Clock className="h-10 w-10 text-indigo-500" />,
      progress: 70,
      total: 10,
      current: 7,
      type: "time",
    },
    {
      id: 2,
      title: "Word Wizard",
      description: "Master 500 vocabulary words",
      icon: <BookOpen className="h-10 w-10 text-emerald-500" />,
      progress: 45,
      total: 500,
      current: 225,
      type: "learning",
    },
    {
      id: 3,
      title: "Quiz Champion",
      description: "Score 90% or higher on 20 quizzes",
      icon: <Trophy className="h-10 w-10 text-amber-500" />,
      progress: 30,
      total: 20,
      current: 6,
      type: "test",
    },
    {
      id: 4,
      title: "Consistent Learner",
      description: "Study for 30 consecutive days",
      icon: <Flame className="h-10 w-10 text-red-500" />,
      progress: 60,
      total: 30,
      current: 18,
      type: "streak",
    },
    {
      id: 5,
      title: "Pronunciation Pro",
      description: "Complete 50 pronunciation exercises",
      icon: <Zap className="h-10 w-10 text-purple-500" />,
      progress: 20,
      total: 50,
      current: 10,
      type: "speaking",
    },
    {
      id: 6,
      title: "Set Creator",
      description: "Create 10 study sets",
      icon: <Target className="h-10 w-10 text-blue-500" />,
      progress: 80,
      total: 10,
      current: 8,
      type: "creation",
    },
  ],
  milestones: [
    {
      id: 1,
      title: "First Month Complete",
      description: "You've been studying with us for one month!",
      icon: <Medal className="h-12 w-12 text-yellow-500" />,
      date: "March 15, 2023",
      points: 200,
      unlocked: true,
    },
    {
      id: 2,
      title: "100 Study Sessions",
      description: "You've completed 100 study sessions",
      icon: <Award className="h-12 w-12 text-blue-500" />,
      date: "May 22, 2023",
      points: 300,
      unlocked: true,
    },
    {
      id: 3,
      title: "1000 Words Learned",
      description: "You've mastered 1000 vocabulary words",
      icon: <Crown className="h-12 w-12 text-purple-500" />,
      date: "Coming soon",
      points: 500,
      unlocked: false,
    },
  ],
};

// Achievement stats
const stats = [
  {
    label: "Total Achievements",
    value: 24,
    icon: <Trophy className="h-5 w-5 text-yellow-500" />,
  },
  {
    label: "Points Earned",
    value: 1250,
    icon: <Star className="h-5 w-5 text-amber-500" />,
  },
  {
    label: "Current Streak",
    value: "18 days",
    icon: <Flame className="h-5 w-5 text-red-500" />,
  },
  {
    label: "Rank",
    value: "Gold",
    icon: <Award className="h-5 w-5 text-yellow-600" />,
  },
];

export default function AchievementsPage() {
  const [selectedTab, setSelectedTab] = useState("all");
  const [expandedMilestone, setExpandedMilestone] = useState<number | null>(
    null,
  );
  const [animateStats, setAnimateStats] = useState(false);

  useEffect(() => {
    // Trigger stats animation after component mounts
    setAnimateStats(true);
  }, []);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    show: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 300, damping: 24 },
    },
  };

  const filterBadges = (badges: typeof achievementData.badges) => {
    if (selectedTab === "all") return badges;
    return badges.filter((badge) => badge.type === selectedTab);
  };

  const toggleMilestone = (id: number) => {
    setExpandedMilestone(expandedMilestone === id ? null : id);
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold mb-2">
          Your Achievements
        </h1>
        <p className="text-gray-600">
          Track your progress and earn rewards as you learn
        </p>
      </motion.div>

      {/* Stats Section */}
      <motion.div
        variants={container}
        initial="hidden"
        animate={animateStats ? "show" : "hidden"}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8"
      >
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            variants={item}
            whileHover={{ scale: 1.03, transition: { duration: 0.2 } }}
            className="rounded-lg shadow-md p-4 flex items-center"
          >
            <div className="bg-forest/10 p-3 rounded-full mr-4">
              {stat.icon}
            </div>
            <div>
              <p className="text-gray-600 text-sm">{stat.label}</p>
              <p className="text-xl font-bold">{stat.value}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Recent Achievements */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="mb-10"
      >
        <h2 className="text-2xl font-bold mb-4">
          Recent Achievements
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {achievementData.recentAchievements.map((achievement) => (
            <motion.div
              key={achievement.id}
              whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
              className="rounded-lg shadow-md overflow-hidden"
            >
              <div className="p-4 flex items-center">
                <div className="mr-4">{achievement.icon}</div>
                <div>
                  <h3 className="font-bold text-lg ">
                    {achievement.title}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    {achievement.description}
                  </p>
                </div>
              </div>
              <div className="bg-forest/5 px-4 py-2 flex justify-between items-center">
                <span className="text-gray-500 text-sm">
                  {achievement.date}
                </span>
                <Badge variant="outline" className="bg-forest text-white">
                  +{achievement.points} pts
                </Badge>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Badges Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        className="mb-10"
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold ">Badges in Progress</h2>
          <Tabs
            value={selectedTab}
            onValueChange={setSelectedTab}
            className="w-full max-w-md"
          >
            <TabsList className="grid grid-cols-3 sm:grid-cols-6">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="learning">Learning</TabsTrigger>
              <TabsTrigger value="test">Tests</TabsTrigger>
              <TabsTrigger value="streak">Streaks</TabsTrigger>
              <TabsTrigger value="speaking">Speaking</TabsTrigger>
              <TabsTrigger value="creation">Creation</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filterBadges(achievementData.badges).map((badge) => (
            <motion.div
              key={badge.id}
              variants={item}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
              className="rounded-lg shadow-md p-6 flex flex-col items-center text-center"
            >
              <div className="mb-4">{badge.icon}</div>
              <h3 className="font-bold text-lg mb-1">
                {badge.title}
              </h3>
              <p className="text-gray-600 text-sm mb-4">{badge.description}</p>
              <div className="w-full mb-2">
                <Progress value={badge.progress} className="h-2" />
              </div>
              <p className="text-gray-600 text-sm">
                {badge.current} / {badge.total} completed
              </p>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* Milestones Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7, duration: 0.5 }}
      >
        <h2 className="text-2xl font-bold mb-4">Milestones</h2>
        <div className="space-y-4">
          {achievementData.milestones.map((milestone) => (
            <motion.div
              key={milestone.id}
              initial={{ opacity: 0.9 }}
              whileHover={{ opacity: 1, scale: 1.01 }}
              className={`rounded-lg shadow-md overflow-hidden ${!milestone.unlocked ? "opacity-60" : ""}`}
            >
              <div
                className="p-4 flex items-center justify-between cursor-pointer"
                onClick={() => toggleMilestone(milestone.id)}
              >
                <div className="flex items-center">
                  <div
                    className={`mr-4 ${!milestone.unlocked ? "grayscale" : ""}`}
                  >
                    {milestone.icon}
                  </div>
                  <div>
                    <h3 className="font-bold text-lg ">
                      {milestone.title}
                    </h3>
                    <p className="text-gray-600 text-sm">
                      {milestone.description}
                    </p>
                  </div>
                </div>
                <div className="flex items-center">
                  {milestone.unlocked ? (
                    <Badge className="mr-3 bg-green-100 text-green-800 border-green-200">
                      Unlocked
                    </Badge>
                  ) : (
                    <Badge variant="outline" className="mr-3">
                      Locked
                    </Badge>
                  )}
                  {expandedMilestone === milestone.id ? (
                    <ChevronUp className="h-5 w-5 text-gray-500" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-gray-500" />
                  )}
                </div>
              </div>

              {expandedMilestone === milestone.id && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="bg-forest/5 px-6 py-4"
                >
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-600 text-sm">
                      Date Achieved:
                    </span>
                    <span className="font-medium">{milestone.date}</span>
                  </div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-600 text-sm">
                      Points Awarded:
                    </span>
                    <span className="font-medium ">
                      {milestone.points} points
                    </span>
                  </div>
                  {milestone.unlocked && (
                    <div className="mt-3 flex justify-end">
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-forest hover:bg-forest hover:text-white"
                      >
                        Share Achievement
                      </Button>
                    </div>
                  )}
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
