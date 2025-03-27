"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import {
  BookOpen,
  BarChart2,
  TrendingUp,
  Calendar,
  Heart,
  BookText,
  Flame,
  Search,
  Star,
  Trophy,
  Sparkles,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  AreaChart,
  Area,
} from "recharts"
import ActivityCalendar from "@/components/ActivityCalendar/ActivityCalendar"

// Consolidated mock data object (simulating backend data)
const dashboardData = {
  user: {
    name: "John",
    avatar: "/placeholder.svg?height=40&width=40",
    isPremium: false,
    streak: 5, // Changed to 5 for testing the middle streak range
    lastActivity: "2 hours ago",
  },
  stats: {
    wordsLearned: 347,
    favoriteWords: 58,
    storiesRead: 24,
    daysActive: 42,
    studyTime: "5.2h",
    avgAccuracy: "86%",
    totalSets: 12,
    totalPractices: 42,
    completedTests: 15,
  },
  activityData: {}, // Will be generated dynamically
  weeklyProgressData: [
    { name: "Mon", words: 12, time: 0.8 },
    { name: "Tue", words: 19, time: 1.2 },
    { name: "Wed", words: 8, time: 0.5 },
    { name: "Thu", words: 24, time: 1.5 },
    { name: "Fri", words: 15, time: 1.0 },
    { name: "Sat", words: 32, time: 2.1 },
    { name: "Sun", words: 21, time: 1.4 },
  ],
  learningPathData: [
    { name: "Jan", progress: 30 },
    { name: "Feb", progress: 45 },
    { name: "Mar", progress: 35 },
    { name: "Apr", progress: 50 },
    { name: "May", progress: 65 },
    { name: "Jun", progress: 75 },
    { name: "Jul", progress: 90 },
  ],
}

// Generate activity data for the calendar (similar to GitHub contributions)
const generateActivityData = () => {
  const today = new Date()
  const data = {}

  // Generate data for the last 365 days
  for (let i = 0; i < 365; i++) {
    const date = new Date(today)
    date.setDate(today.getDate() - i)
    const dateStr = date.toISOString().split("T")[0]

    // Random activity level (0-4)
    // 0: no activity, 1-4: increasing levels of activity
    const activityLevel = Math.floor(Math.random() * 5)

    data[dateStr] = activityLevel
  }

  return data
}

// Helper function to get streak icon and message based on streak length
const getStreakInfo = (streak) => {
  if (streak >= 1 && streak <= 3) {
    return {
      icon: <Flame className="h-5 w-5 text-white" />,
      color: "bg-orange-500",
      message: "Just starting!",
    }
  } else if (streak >= 4 && streak <= 7) {
    return {
      icon: <Sparkles className="h-5 w-5 text-white" />,
      color: "bg-amber-500",
      message: "Getting there!",
    }
  } else {
    return {
      icon: <Trophy className="h-5 w-5 text-white" />,
      color: "bg-green-500",
      message: "Impressive!",
    }
  }
}

export default function Dashboard() {
  const router = useRouter()
  const [activityData, setActivityData] = useState({})
  const [isLoading, setIsLoading] = useState(true)
  const [dashboardStats, setDashboardStats] = useState(dashboardData)

  // Simulate fetching data from backend
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      try {
        // In a real app, this would be an API call
        // const response = await fetch('/api/dashboard');
        // const data = await response.json();

        // For now, we'll use our mock data and add the activity data
        const generatedActivityData = generateActivityData()
        setActivityData(generatedActivityData)
        setDashboardStats({
          ...dashboardData,
          activityData: generatedActivityData,
        })

        // Simulate network delay
        setTimeout(() => {
          setIsLoading(false)
        }, 500)
      } catch (error) {
        console.error("Error fetching dashboard data:", error)
        setIsLoading(false)
      }
    }

    fetchData()
  }, [])

  // Get streak info based on current streak
  const streakInfo = getStreakInfo(dashboardStats.user.streak)

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 border-4 border-forest border-t-transparent rounded-full animate-spin"></div>
          <p className="mt-4 text-forest font-medium">Loading your dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="flex">
        {/* Main Content */}
        <div className="flex-1 p-6 lg:p-8 overflow-auto">
          {/* Welcome Section */}
          <motion.div
            className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div>
              <h1 className="text-3xl font-bold text-forest">Welcome back, {dashboardStats.user.name}!</h1>
              <p className="text-muted-foreground">Your learning journey continues. Here's your progress so far.</p>
            </div>
          </motion.div>

          {/* Key Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
            {[
              {
                title: "Words Learned",
                value: dashboardStats.stats.wordsLearned,
                icon: <BookOpen className="h-5 w-5 text-white" />,
                color: "bg-forest",
                increase: "+24 this week",
              },
              {
                title: "Favorite Words",
                value: dashboardStats.stats.favoriteWords,
                icon: <Heart className="h-5 w-5 text-white" />,
                color: "bg-rose-500",
                increase: "+7 this week",
              },
              {
                title: "Stories Read",
                value: dashboardStats.stats.storiesRead,
                icon: <BookText className="h-5 w-5 text-white" />,
                color: "bg-amber-500",
                increase: "+3 this week",
              },
              {
                title: "Day Streak",
                value: dashboardStats.user.streak,
                icon: streakInfo.icon,
                color: streakInfo.color,
                increase: streakInfo.message,
              },
            ].map((stat, index) => (
              <motion.div
                key={stat.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                whileHover={{ scale: 1.03, transition: { duration: 0.2 } }}
              >
                <Card className="border-0 shadow-md hover:shadow-lg transition-all overflow-hidden">
                  <div className={`h-1 ${stat.color}`}></div>
                  <CardContent className="pt-6">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-sm text-muted-foreground">{stat.title}</p>
                        <p className="text-3xl font-bold text-forest mt-1">{stat.value}</p>
                        <p className="text-xs text-muted-foreground mt-1">{stat.increase}</p>
                      </div>
                      <div className={`rounded-full ${stat.color} p-3`}>{stat.icon}</div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {/* Weekly Progress Chart */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Card className="border-0 shadow-md hover:shadow-lg transition-all h-full">
                <CardHeader className="pb-2">
                  <CardTitle className="text-forest flex items-center text-lg">
                    <BarChart2 className="h-5 w-5 mr-2" />
                    Weekly Learning Progress
                  </CardTitle>
                  <CardDescription>Words learned and study time per day</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-72">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={dashboardStats.weeklyProgressData}
                        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                        <XAxis dataKey="name" />
                        <YAxis yAxisId="left" orientation="left" stroke="#14281d" />
                        <YAxis yAxisId="right" orientation="right" stroke="#3d7d5a" />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: "white",
                            borderRadius: "8px",
                            border: "none",
                            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                          }}
                        />
                        <Legend />
                        <Bar yAxisId="left" dataKey="words" name="Words Learned" fill="#14281d" radius={[4, 4, 0, 0]} />
                        <Bar yAxisId="right" dataKey="time" name="Study Hours" fill="#3d7d5a" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Learning Path Chart */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Card className="border-0 shadow-md hover:shadow-lg transition-all h-full">
                <CardHeader className="pb-2">
                  <CardTitle className="text-forest flex items-center text-lg">
                    <TrendingUp className="h-5 w-5 mr-2" />
                    Your Learning Path
                  </CardTitle>
                  <CardDescription>Overall progress over time</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-72">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={dashboardStats.learningPathData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: "white",
                            borderRadius: "8px",
                            border: "none",
                            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                          }}
                        />
                        <Area
                          type="monotone"
                          dataKey="progress"
                          stroke="#14281d"
                          fill="url(#colorProgress)"
                          strokeWidth={2}
                        />
                        <defs>
                          <linearGradient id="colorProgress" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#14281d" stopOpacity={0.8} />
                            <stop offset="95%" stopColor="#14281d" stopOpacity={0.1} />
                          </linearGradient>
                        </defs>
                      </AreaChart>
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
            className="mb-8"
          >
            <Card className="border-0 shadow-md hover:shadow-lg transition-all">
              <CardHeader className="pb-2">
                <CardTitle className="text-forest flex items-center text-lg">
                  <Calendar className="h-5 w-5 mr-2" />
                  Your Activity
                </CardTitle>
                <CardDescription>Track your daily learning consistency throughout the year</CardDescription>
              </CardHeader>
              <CardContent className="overflow-x-auto flex justify-center items-center">
                <ActivityCalendar data={activityData} />
              </CardContent>
            </Card>
          </motion.div>

          {/* Upgrade Banner */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <Card className="border-0 shadow-md overflow-hidden bg-gradient-to-r from-forest to-forest-700">
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                  <div className="text-white">
                    <h3 className="text-xl font-bold flex items-center">
                      <Star className="h-5 w-5 mr-2 text-yellow-300" />
                      Upgrade to Premium
                    </h3>
                    <p className="mt-2 text-cream/90 max-w-md">
                      Unlock unlimited sets, advanced practice modes, and detailed analytics to accelerate your learning
                      journey.
                    </p>
                  </div>
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button
                      onClick={() => router.push("/payment/upgrade")}
                      className="bg-white text-forest hover:bg-cream font-medium px-6"
                    >
                      Upgrade Now
                    </Button>
                  </motion.div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

