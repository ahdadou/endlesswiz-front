"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  BookOpen,
  Brain,
  Gamepad2,
  PenTool,
  BarChart2,
  Clock,
  TrendingUp,
  Calendar,
  Award,
  Zap,
  Video,
  ChevronRight,
  Plus,
  Heart,
  BookMarked,
  Mic,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import DashboardSidebar from "@/components/Sidebar/SideBar";
import ActivityCalendar from "@/components/ActivityCalendar/ActivityCalendar";

// Mock data for the dashboard
const studyStats = {
  totalSets: 12,
  wordsLearned: 347,
  favoriteWords: 58,
  videosWatched: 24,
  studyTime: "5.2h",
  avgAccuracy: "86%",
  streak: 7,
  lastActivity: "2 hours ago",
  totalPractices: 42,
  completedTests: 15,
};

const recentSets = [
  {
    id: "1",
    title: "English Vocabulary - Beginner",
    progress: 68,
    wordCount: 42,
    lastPracticed: "2 days ago",
  },
  {
    id: "2",
    title: "Business English Terms",
    progress: 45,
    wordCount: 35,
    lastPracticed: "3 days ago",
  },
  {
    id: "3",
    title: "English Idioms and Phrases",
    progress: 92,
    wordCount: 28,
    lastPracticed: "1 week ago",
  },
];

const categories = [
  { name: "Languages", count: 5, icon: <BookOpen className="h-4 w-4" /> },
  { name: "Science", count: 3, icon: <Brain className="h-4 w-4" /> },
  { name: "Technology", count: 2, icon: <Zap className="h-4 w-4" /> },
  { name: "Business", count: 2, icon: <TrendingUp className="h-4 w-4" /> },
];

// Mock activity data for the calendar (similar to GitHub contributions)
const generateActivityData = () => {
  const today = new Date();
  const data = {};

  // Generate data for the last 365 days
  for (let i = 0; i < 365; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() - i);
    const dateStr = date.toISOString().split("T")[0];

    // Random activity level (0-4)
    // 0: no activity, 1-4: increasing levels of activity
    const activityLevel = Math.floor(Math.random() * 5);

    data[dateStr] = activityLevel;
  }

  return data;
};

// Mock data for charts
const weeklyProgressData = [
  { name: "Mon", words: 12, time: 0.8 },
  { name: "Tue", words: 19, time: 1.2 },
  { name: "Wed", words: 8, time: 0.5 },
  { name: "Thu", words: 24, time: 1.5 },
  { name: "Fri", words: 15, time: 1.0 },
  { name: "Sat", words: 32, time: 2.1 },
  { name: "Sun", words: 21, time: 1.4 },
];

const categoryDistributionData = [
  { name: "Languages", value: 45 },
  { name: "Science", value: 20 },
  { name: "Technology", value: 15 },
  { name: "Business", value: 10 },
  { name: "Other", value: 10 },
];

const COLORS = ["#14281d", "#3d7d5a", "#5f9477", "#81ab94", "#a3c2b1"];

export default function Dashboard() {
  const router = useRouter();
  const [activityData] = useState(generateActivityData());

  return (
    <div className="min-h-screen">
      <div className="flex">
        {/* Main Content */}
        <div className="flex-1 p-8 overflow-auto">
          {/* Welcome Section */}
          <motion.div
            className="flex justify-between items-center mb-8"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div>
              <h1 className="text-3xl font-bold ">
                Welcome back, John!
              </h1>
              <p className="text-muted-foreground">
                Track your progress and continue learning
              </p>
            </div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                onClick={() => router.push("/create-set")}
                className="bg-forest hover:bg-forest-700 text-cream"
              >
                <Plus className="h-4 w-4 mr-2" />
                Create New Set
              </Button>
            </motion.div>
          </motion.div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {[
              {
                title: "Words Learned",
                value: studyStats.wordsLearned,
                icon: <BookOpen className="h-5 w-5 " />,
              },
              {
                title: "Favorite Words",
                value: studyStats.favoriteWords,
                icon: <Heart className="h-5 w-5 " />,
              },
              {
                title: "Videos Watched",
                value: studyStats.videosWatched,
                icon: <Video className="h-5 w-5 " />,
              },
              {
                title: "Study Time",
                value: studyStats.studyTime,
                icon: <Clock className="h-5 w-5 " />,
              },
            ].map((stat, index) => (
              <motion.div
                key={stat.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                whileHover={{ scale: 1.03, transition: { duration: 0.2 } }}
              >
                <Card className="border-forest-100 shadow-sm hover:shadow-md transition-all">
                  <CardContent className="pt-6">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-sm text-muted-foreground">
                          {stat.title}
                        </p>
                        <p className="text-3xl font-bold ">
                          {stat.value}
                        </p>
                      </div>
                      <div className="rounded-full bg-forest/10 p-2">
                        {stat.icon}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {/* Weekly Progress Chart */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Card className="border-forest-100 shadow-sm hover:shadow-md transition-all">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <BarChart2 className="h-5 w-5 mr-2" />
                    Weekly Learning Progress
                  </CardTitle>
                  <CardDescription>
                    Words learned and study time per day
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={weeklyProgressData}
                        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis
                          yAxisId="left"
                          orientation="left"
                          stroke="#14281d"
                        />
                        <YAxis
                          yAxisId="right"
                          orientation="right"
                          stroke="#3d7d5a"
                        />
                        <Tooltip />
                        <Legend />
                        <Bar
                          yAxisId="left"
                          dataKey="words"
                          name="Words Learned"
                          fill="#14281d"
                          radius={[4, 4, 0, 0]}
                        />
                        <Bar
                          yAxisId="right"
                          dataKey="time"
                          name="Study Hours"
                          fill="#3d7d5a"
                          radius={[4, 4, 0, 0]}
                        />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Category Distribution Chart */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Card className="border-forest-100 shadow-sm hover:shadow-md transition-all">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <PieChart className="h-5 w-5 mr-2" />
                    Category Distribution
                  </CardTitle>
                  <CardDescription>
                    Breakdown of your study materials by category
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={categoryDistributionData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                          label={({ name, percent }) =>
                            `${name} ${(percent * 100).toFixed(0)}%`
                          }
                        >
                          {categoryDistributionData.map((entry, index) => (
                            <Cell
                              key={`cell-${index}`}
                              fill={COLORS[index % COLORS.length]}
                            />
                          ))}
                        </Pie>
                        <Tooltip />
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Activity Calendar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Card className="mb-8 border-forest-100 shadow-sm hover:shadow-md transition-all">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Calendar className="h-5 w-5 mr-2" />
                  Your Activity
                </CardTitle>
                <CardDescription>
                  Track your daily learning consistency throughout the year
                </CardDescription>
              </CardHeader>
              <CardContent className="overflow-x-auto">
                <ActivityCalendar data={activityData} />
              </CardContent>
            </Card>
          </motion.div>

          {/* Recent Sets and Learning Stats */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Recent Sets */}
            <motion.div
              className="lg:col-span-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <Card className="border-forest-100 shadow-sm hover:shadow-md transition-all">
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle className="flex items-center">
                    <Clock className="h-5 w-5 mr-2" />
                    Recent Sets
                  </CardTitle>
                  <Button
                    variant="ghost"
                    className="hover:text-forest-700"
                    onClick={() => router.push("/sets")}
                  >
                    View All
                    <ChevronRight className="h-4 w-4 ml-1" />
                  </Button>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentSets.map((set, index) => (
                      <motion.div
                        key={set.id}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: 0.1 * index }}
                        whileHover={{
                          scale: 1.02,
                          backgroundColor: "rgba(20, 40, 29, 0.05)",
                          transition: { duration: 0.2 },
                        }}
                        className="flex items-center p-3 rounded-lg cursor-pointer transition-colors"
                        onClick={() => router.push(`/set/${set.id}`)}
                      >
                        <div className="flex-1">
                          <h3 className="font-medium ">
                            {set.title}
                          </h3>
                          <div className="flex items-center text-sm text-muted-foreground mt-1">
                            <BookOpen className="h-3.5 w-3.5 mr-1" />
                            {set.wordCount} words
                            <span className="mx-2">•</span>
                            <Clock className="h-3.5 w-3.5 mr-1" />
                            {set.lastPracticed}
                          </div>
                        </div>
                        <div className="w-32">
                          <div className="flex justify-between text-xs mb-1">
                            <span>Progress</span>
                            <span>{set.progress}%</span>
                          </div>
                          <Progress value={set.progress} className="h-2" />
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Learning Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <Card className="border-forest-100 shadow-sm hover:shadow-md transition-all">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Award className="h-5 w-5 mr-2" />
                    Learning Stats
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      {
                        icon: <Zap className="h-4 w-4 " />,
                        label: "Current Streak",
                        value: `${studyStats.streak} days`,
                      },
                      {
                        icon: <BookMarked className="h-4 w-4 " />,
                        label: "Total Sets",
                        value: studyStats.totalSets,
                      },
                      {
                        icon: <PenTool className="h-4 w-4 " />,
                        label: "Completed Tests",
                        value: studyStats.completedTests,
                      },
                      {
                        icon: <Gamepad2 className="h-4 w-4 " />,
                        label: "Practice Sessions",
                        value: studyStats.totalPractices,
                      },
                      {
                        icon: <Brain className="h-4 w-4 " />,
                        label: "Accuracy Rate",
                        value: studyStats.avgAccuracy,
                      },
                    ].map((stat, index) => (
                      <motion.div
                        key={stat.label}
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: 0.1 * index }}
                        whileHover={{ x: 5, transition: { duration: 0.2 } }}
                        className="flex justify-between items-center"
                      >
                        <div className="flex items-center">
                          <div className="rounded-full bg-forest/10 p-2 mr-3">
                            {stat.icon}
                          </div>
                          <span className="">{stat.label}</span>
                        </div>
                        <Badge variant="outline" className="font-bold">
                          {stat.value}
                        </Badge>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
              >
                <Card className="border-forest-100 shadow-sm hover:shadow-md transition-all mt-6">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Zap className="h-5 w-5 mr-2" />
                      Quick Actions
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-3">
                      {[
                        {
                          icon: <Plus className="h-5 w-5 mb-1" />,
                          label: "New Set",
                          path: "/create-set",
                        },
                        {
                          icon: <BookOpen className="h-5 w-5 mb-1" />,
                          label: "Practice",
                          path: "/practice/1?mode=flashcards",
                        },
                        {
                          icon: <Video className="h-5 w-5 mb-1" />,
                          label: "Videos",
                          path: "/videos",
                        },
                        {
                          icon: <Mic className="h-5 w-5 mb-1" />,
                          label: "Pronounce",
                          path: "/pronounce",
                        },
                      ].map((action, index) => (
                        <motion.div
                          key={action.label}
                          whileHover={{
                            scale: 1.05,
                            transition: { duration: 0.2 },
                          }}
                          whileTap={{ scale: 0.95 }}
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.3, delay: 0.1 * index }}
                        >
                          <Button
                            variant="outline"
                            className="flex flex-col h-auto w-full py-4 border-forest hover:bg-forest hover:text-cream"
                            onClick={() => router.push(action.path)}
                          >
                            {action.icon}
                            <span>{action.label}</span>
                          </Button>
                        </motion.div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
