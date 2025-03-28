"use client";

import { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  BookOpen,
  BarChart2,
  TrendingUp,
  Calendar,
  Heart,
  BookText,
  Flame,
  Star,
  Trophy,
  Sparkles,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
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
} from "recharts";
import ActivityCalendar from "@/components/ActivityCalendar/ActivityCalendar";
import api from "@/clients/api/api";
import { useUserDataZustandState } from "@/provider/ZustandUserDataProvider";
import { Month, UserStatisticsResponse, Week } from "@/clients/types/apiTypes";
import { Progress } from "@/components/ui/progress";

const dayNames = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const getStreakInfo = (streak: number) => {
  if (streak >= 1 && streak <= 3) {
    return {
      icon: <Flame className="h-5 w-5 text-white" />,
      color: "bg-orange-500",
      message: "Just starting!",
    };
  } else if (streak >= 4 && streak <= 7) {
    return {
      icon: <Sparkles className="h-5 w-5 text-white" />,
      color: "bg-amber-500",
      message: "Getting there!",
    };
  } else {
    return {
      icon: <Trophy className="h-5 w-5 text-white" />,
      color: "bg-green-500",
      message: "Impressive!",
    };
  }
};

export default function Dashboard() {
  const router = useRouter();
  const { userData } = useUserDataZustandState();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [dashboardStats, setDashboardStats] = useState<UserStatisticsResponse>({
    wordsLearn: { total: 0, thisWeek: 0 },
    favoriteWords: { total: 0, thisWeek: 0 },
    storiesRead: { total: 0, thisWeek: 0 },
    dayStreak: 0,
    monthlyProgress: [],
    weeklyProgress: [],
  });
  const [learningPathData, setLearningPathData] = useState([
    { name: "Jan", progress: 0 },
    { name: "Feb", progress: 0 },
    { name: "Mar", progress: 0 },
    { name: "Apr", progress: 0 },
    { name: "May", progress: 0 },
    { name: "Jun", progress: 0 },
    { name: "Jul", progress: 0 },
  ]);
  const [weeklyProgressData, setWeeklyProgressData] = useState([
    { name: "Mon", words: 0, time: 0.8 },
    { name: "Tue", words: 4, time: 1.2 },
    { name: "Wed", words: 0, time: 0.5 },
    { name: "Thu", words: 0, time: 1.5 },
    { name: "Fri", words: 0, time: 1.0 },
    { name: "Sat", words: 0, time: 2.1 },
    { name: "Sun", words: 0, time: 1.4 },
  ]);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const statsResponse = await api.fetchUserStatistics();
        setDashboardStats(statsResponse);
        const weeklyProgressData = dayNames.map((day, index) => {
          const weekDay = [
            "MONDAY",
            "TUESDAY",
            "WEDNESDAY",
            "THURSDAY",
            "FRIDAY",
            "SATURDAY",
            "SUNDAY",
          ][index] as Week;
          const dayData = statsResponse.weeklyProgress.find(
            (wp) => wp.week === weekDay
          ) || { numberOfWords: 0, week: weekDay };
          return {
            name: day,
            words: dayData.numberOfWords,
            time: dayData.numberOfWords / 15, // Estimate: 15 words = 1 hour
          };
        });

        // Map monthlyProgress to two 6-month blocks
        const { monthNames, monthEnums } = getMonthsPrefixAndEnum();
        const learningPathData = monthNames.map((name, index) => {
          const monthEnum = monthEnums[index];
          const monthData = statsResponse.monthlyProgress.find(
            (mp) => mp.month === monthEnum
          ) || { numberOfWords: 0, month: monthEnum };
          return {
            name,
            progress: monthData.numberOfWords,
          };
        });

        setWeeklyProgressData(weeklyProgressData);
        setLearningPathData(learningPathData);
        setIsLoading(false);
      } catch (err) {
        console.error("Error fetching dashboard data:", err);
        setError("Failed to load dashboard data");
        setIsLoading(false);
      }
    };

    if (userData) {
      fetchData();
    }
  }, [userData]);

  const streakInfo = getStreakInfo(dashboardStats.dayStreak);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 border-4 border-forest border-t-transparent rounded-full animate-spin"></div>
          <p className="mt-4 text-forest font-medium">
            Loading your dashboard...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
        <div className="flex-1 lg:p-8 overflow-auto">
          <motion.div
            className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div>
              <h1 className="text-3xl font-bold text-forest">
                Welcome back, {userData?.firstName} {userData?.lastName}!
              </h1>
              <p className="text-muted-foreground">
                Your learning journey continues. Here's your progress so far.
              </p>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
            {[
              {
                title: "Words Learned",
                value: dashboardStats.wordsLearn.total,
                icon: <BookOpen className="h-5 w-5 text-white" />,
                color: "bg-forest",
                increase: `+${dashboardStats.wordsLearn.thisWeek} this week`,
              },
              {
                title: "Favorite Words",
                value: dashboardStats.favoriteWords.total,
                icon: <Heart className="h-5 w-5 text-white" />,
                color: "bg-rose-500",
                increase: `+${dashboardStats.favoriteWords.thisWeek} this week`,
              },
              {
                title: "Stories Read",
                value: dashboardStats.storiesRead.total,
                icon: <BookText className="h-5 w-5 text-white" />,
                color: "bg-amber-500",
                increase: `+${dashboardStats.storiesRead.thisWeek} this week`,
              },
              {
                title: "Day Streak",
                value: dashboardStats.dayStreak,
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
                        <p className="text-sm text-muted-foreground">
                          {stat.title}
                        </p>
                        <p className="text-3xl font-bold text-forest mt-1">
                          {stat.value}
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {stat.increase}
                        </p>
                      </div>
                      <div className={`rounded-full ${stat.color} p-3`}>
                        {stat.icon}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
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
                  <CardDescription>Words learned per week</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-72">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={weeklyProgressData}
                        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                        <XAxis dataKey="name" />
                        <YAxis
                          yAxisId="left"
                          orientation="left"
                          stroke="#14281d"
                        />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: "white",
                            borderRadius: "8px",
                            border: "none",
                            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                          }}
                        />
                        <Legend />
                        <Bar
                          yAxisId="left"
                          dataKey="words"
                          name="Words Learned"
                          fill="#14281d"
                          radius={[4, 4, 0, 0]}
                        />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

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
                      <AreaChart data={learningPathData}>
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
                          <linearGradient
                            id="colorProgress"
                            x1="0"
                            y1="0"
                            x2="0"
                            y2="1"
                          >
                            <stop
                              offset="5%"
                              stopColor="#14281d"
                              stopOpacity={0.8}
                            />
                            <stop
                              offset="95%"
                              stopColor="#14281d"
                              stopOpacity={0.1}
                            />
                          </linearGradient>
                        </defs>
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mb-8 flex flex-col lg:flex-row gap-3"
          >
            <Card className="border-0 shadow-md hover:shadow-lg transition-all">
              <CardHeader className="pb-2">
                <CardTitle className="text-forest flex items-center text-lg">
                  <Calendar className="h-5 w-5 mr-2" />
                  Your Activity
                </CardTitle>
                <CardDescription>
                  Track your daily learning consistency
                </CardDescription>
              </CardHeader>
              <CardContent className="overflow-x-auto flex justify-center items-center">
                <ActivityCalendar />
              </CardContent>
            </Card>
            <Card className="border-0 shadow-md hover:shadow-lg transition-all w-full">
            <CardHeader className="pb-2">
                <CardTitle className="text-forest flex items-center text-lg">
                  <BookOpen className="h-5 w-5 mr-2" />
                  Set to Practice
                </CardTitle>
                <CardDescription>
                  Continue learning with your recent study set
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col">
                <div className="flex-1">
                  <div className="border rounded-lg p-4 hover:bg-muted/20 transition-colors">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h4 className="font-medium text-forest text-lg">
                          {"Football"}
                        </h4>
                        <p className="text-sm text-muted-foreground">
                          Last practiced {"2025-04-13"} • {40} words
                        </p>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-forest text-forest hover:bg-forest hover:text-cream"
                        onClick={() =>
                          router.push(`/set/${"dashboardStats.recentSet.id"}`)
                        }
                      >
                        Practice
                      </Button>
                    </div>
                    <div className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span>Progress</span>
                        <span>{80}%</span>
                      </div>
                      <Progress value={80} className="h-2" />
                    </div>
                  </div>
                </div>

                <div className="mt-auto pt-4">
                  <p className="text-sm text-muted-foreground mb-2">
                    You have {23} sets in total
                  </p>
                  <Button
                    variant="ghost"
                    className="w-full text-forest hover:bg-forest/10"
                    onClick={() => router.push("/sets")}
                  >
                    Show more sets
                    <ChevronRight className="h-4 w-4 ml-1" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>

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
                      Unlock unlimited sets, advanced practice modes, and
                      detailed analytics.
                    </p>
                  </div>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button
                      onClick={() => router.push("user/payment/upgrade")}
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
  );
}

function getMonthsPrefixAndEnum() {
  const currentMonthIndex = new Date().getMonth(); // 0 = Jan, 11 = Dec
  const isFirstHalf = currentMonthIndex < 6; // Jan-Jun (0-5) vs Jul-Dec (6-11)
  const firstHalfMonths = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];
  const secondHalfMonths = ["Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const monthNames = isFirstHalf ? firstHalfMonths : secondHalfMonths;
  const monthEnums = isFirstHalf
    ? [
        Month.JANUARY,
        Month.FEBRUARY,
        Month.MARCH,
        Month.APRIL,
        Month.MAY,
        Month.JUNE,
      ]
    : [
        Month.JULY,
        Month.AUGUST,
        Month.SEPTEMBER,
        Month.OCTOBER,
        Month.NOVEMBER,
        Month.DECEMBER,
      ];
  return { monthNames, monthEnums };
}
