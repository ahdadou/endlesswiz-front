"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { BookOpen, Video, Gamepad2, CheckCircle, ArrowRight } from "lucide-react";

export default function PracticeModesPage() {
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
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <div className="container max-w-4xl mx-auto px-4 py-16">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl md:text-5xl font-bold mb-6">Practice Modes</h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Improve your English with EndlessWiz through engaging stories, videos, and fun flashcard games—pick your favorite way to learn!
        </p>
      </motion.div>

      {/* Practice Modes Section */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="space-y-8"
      >
        {[
          {
            title: "Practice My Reading Stories",
            icon: <BookOpen className="h-8 w-8 text-primary" />,
            description:
              "Read short, engaging English stories designed for your level. Follow along with narrated text to improve comprehension and vocabulary.",
            benefits: [
              "Boosts reading fluency",
              "Expands everyday vocabulary",
              "Improves understanding of context",
            ],
            action: "Start Reading",
            tip: "Read a story aloud to practice pronunciation while you learn new words!",
          },
          {
            title: "Practice My Watching Videos",
            icon: <Video className="h-8 w-8 text-primary" />,
            description:
              "Watch fun English videos with subtitles and quizzes. Learn how words are used in real-life situations, from conversations to tutorials.",
            benefits: [
              "Sharpens listening skills",
              "Teaches natural phrasing",
              "Makes learning entertaining",
            ],
            action: "Watch Now",
            tip: "Pause and repeat lines from the video to mimic native speakers!",
          },
          {
            title: "Practice My Playing Flashcard Games",
            icon: <Gamepad2 className="h-8 w-8 text-primary" />,
            description:
              "Play interactive flashcard games to test your English skills. Match words, guess meanings, and race against the clock to make learning fun.",
            benefits: [
              "Reinforces word recall",
              "Keeps you motivated",
              "Quick, bite-sized practice",
            ],
            action: "Play Games",
            tip: "Set a daily goal of 10 flashcards—it’s a quick way to build your skills!",
          },
        ].map((mode, index) => (
          <motion.div key={index} variants={item}>
            <Card className="border-forest-100 shadow-sm hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex items-center gap-3">
                  {mode.icon}
                  <CardTitle className="text-2xl">{mode.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">{mode.description}</p>
                <div className="flex flex-wrap gap-2">
                  {mode.benefits.map((benefit, i) => (
                    <span
                      key={i}
                      className="flex items-center gap-1 text-sm bg-forest/10 px-2 py-1 rounded-full"
                    >
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      {benefit}
                    </span>
                  ))}
                </div>
                <div className="bg-forest/5 p-3 rounded-lg border border-forest/10">
                  <p className="text-sm text-muted-foreground italic">{mode.tip}</p>
                </div>
                <Button
                  className="w-full md:w-auto bg-forest hover:bg-forest-700 text-cream"
                  asChild
                >
                  <Link href="/auth/signup">
                    {mode.action}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      {/* How to Choose Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.3 }}
        className="mt-16"
      >
        <h2 className="text-3xl font-bold mb-6 text-center">Which Mode Suits You?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              goal: "Love Stories?",
              mode: "Reading Stories",
              description: "Dive into tales to improve reading and vocabulary.",
            },
            {
              goal: "Enjoy Videos?",
              mode: "Watching Videos",
              description: "Watch and listen to get better at understanding English.",
            },
            {
              goal: "Like Games?",
              mode: "Flashcard Games",
              description: "Play to make learning fast and fun.",
            },
          ].map((choice, index) => (
            <div key={index} className="p-4 rounded-lg border border-gray-100 shadow-sm text-center">
              <h3 className="font-medium mb-2">{choice.goal}</h3>
              <p className="text-sm text-muted-foreground mb-2">{choice.description}</p>
              <p className="text-sm font-semibold">{choice.mode}</p>
            </div>
          ))}
        </div>
      </motion.div>

      {/* CTA Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.4 }}
        className="mt-16 text-center bg-primary/5 rounded-2xl p-8"
      >
        <h2 className="text-2xl font-bold mb-4">Start Practicing Today!</h2>
        <p className="text-lg text-muted-foreground mb-6">
          Whether you read, watch, or play, EndlessWiz has a mode for you. Try them all to boost your English!
        </p>
        <Button size="lg" className="bg-forest hover:bg-forest-700 text-cream" asChild>
          <Link href="/auth/signup">
            Get Started
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </motion.div>
    </div>
  );
}