"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ChevronLeft,
  BookOpen,
  CheckCircle,
  HelpCircle,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { motion } from "framer-motion";

export default function GettingStartedGuidePage() {
  const [activeStep, setActiveStep] = useState(1);
  const [progress, setProgress] = useState(0);
  const totalSteps = 5;

  const handleStepChange = (step: number) => {
    setActiveStep(step);
    setProgress(((step - 1) / (totalSteps - 1)) * 100);
  };

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
    <div className="min-h-screen">
      <div className="flex">
        <div className="flex-1 p-8">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="mb-8 flex items-center justify-between"
          >
            <div>
              <h1 className="text-3xl font-bold">
                Getting Started with EndlessWiz
              </h1>
              <p className="text-muted-foreground">
                Learn the basics of EndlessWiz and kickstart your English
                learning journey.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Progress:</span>
              <Progress value={progress} className="w-40 h-2" />
              <span className="text-sm font-medium">
                {Math.round(progress)}%
              </span>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              className="md:col-span-1"
            >
              <div className="rounded-lg shadow-sm p-4 sticky top-8">
                <h3 className="font-medium mb-4 flex items-center">
                  <BookOpen className="h-5 w-5 mr-2" />
                  Guide Contents
                </h3>
                <nav className="space-y-1">
                  {[
                    { step: 1, title: "Welcome to EndlessWiz" },
                    { step: 2, title: "Setting Up Your Account" },
                    { step: 3, title: "Starting Your First Lesson" },
                    { step: 4, title: "Learning Tools Overview" },
                    { step: 5, title: "Next Steps" },
                  ].map((step) => (
                    <button
                      key={step.step}
                      onClick={() => handleStepChange(step.step)}
                      className={`w-full text-left px-3 py-2 rounded-md flex items-center text-sm ${
                        activeStep === step.step
                          ? "bg-forest text-white font-medium"
                          : "hover:bg-gray-100"
                      }`}
                    >
                      <div
                        className={`h-5 w-5 mr-2 rounded-full flex items-center justify-center text-xs ${
                          activeStep > step.step
                            ? "bg-green-500 text-white"
                            : activeStep === step.step
                              ? ""
                              : "bg-gray-200 text-gray-600"
                        }`}
                      >
                        {activeStep > step.step ? (
                          <CheckCircle className="h-5 w-5" />
                        ) : (
                          step.step
                        )}
                      </div>
                      {step.title}
                    </button>
                  ))}
                </nav>
              </div>
            </motion.div>

            <motion.div
              variants={container}
              initial="hidden"
              animate="show"
              className="md:col-span-3"
            >
              <Card className="border-forest-100 shadow-sm">
                <CardContent className="p-6">
                  <Tabs value={`step-${activeStep}`} className="w-full">
                    <TabsContent value="step-1" className="mt-0">
                      <motion.div
                        variants={container}
                        initial="hidden"
                        animate="show"
                        className="space-y-6"
                      >
                        <motion.div variants={item}>
                          <h2 className="text-2xl font-bold mb-4">
                            Welcome to EndlessWiz
                          </h2>
                          <p className="text-muted-foreground mb-4">
                            EndlessWiz is your go-to app for mastering English,
                            whether you’re a beginner or brushing up your
                            skills. With over 50,000 learners worldwide, we
                            offer tools to improve your pronunciation, grow your
                            vocabulary, and boost your confidence in real
                            conversations.
                          </p>
                        </motion.div>

                        <motion.div variants={item}>
                          <h3 className="text-xl font-medium mb-3">
                            What You’ll Get with EndlessWiz
                          </h3>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                            {[
                              {
                                title: "Pronunciation Practice",
                                description:
                                  "Master English sounds with guided exercises.",
                              },
                              {
                                title: "Vocabulary Building",
                                description:
                                  "Learn words you’ll use every day.",
                              },
                              {
                                title: "Conversation Skills",
                                description:
                                  "Practice phrases for real-life chats.",
                              },
                              {
                                title: "Progress Tracking",
                                description:
                                  "See how far you’ve come with simple stats.",
                              },
                            ].map((feature, index) => (
                              <div key={index} className="p-4 rounded-lg">
                                <h4 className="font-medium mb-1">
                                  {feature.title}
                                </h4>
                                <p className="text-sm text-muted-foreground">
                                  {feature.description}
                                </p>
                              </div>
                            ))}
                          </div>
                        </motion.div>

                        <motion.div
                          variants={item}
                          className="bg-forest/5 p-4 rounded-lg border border-forest/10"
                        >
                          <h3 className="flex items-center font-medium mb-2">
                            <HelpCircle className="h-5 w-5 mr-2" />
                            Fun Fact
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            Practicing just 10 minutes a day with EndlessWiz can
                            improve your English fluency by up to 30% in a
                            month!
                          </p>
                        </motion.div>
                      </motion.div>
                    </TabsContent>

                    <TabsContent value="step-2" className="mt-0">
                      <motion.div
                        variants={container}
                        initial="hidden"
                        animate="show"
                        className="space-y-6"
                      >
                        <motion.div variants={item}>
                          <h2 className="text-2xl font-bold mb-4">
                            Setting Up Your Account
                          </h2>
                          <p className="text-muted-foreground mb-4">
                            Creating your EndlessWiz account is simple and takes
                            just a minute. Here’s how to get started.
                          </p>
                        </motion.div>

                        <motion.div variants={item}>
                          <h3 className="text-xl font-medium mb-3">
                            Steps to Sign Up
                          </h3>
                          <div className="space-y-4 mb-6">
                            {[
                              {
                                title: "Sign Up",
                                description:
                                  "Go to /auth/signup and enter your email and a password.",
                              },
                              {
                                title: "Add Your Name",
                                description:
                                  "Tell us your name so we can personalize your experience.",
                              },
                              {
                                title: "Pick Your Level",
                                description:
                                  "Choose beginner, intermediate, or advanced to start at the right spot.",
                              },
                            ].map((step, index) => (
                              <div
                                key={index}
                                className="p-4 rounded-lg border border-gray-100 shadow-sm"
                              >
                                <h4 className="font-medium mb-1">
                                  {index + 1}. {step.title}
                                </h4>
                                <p className="text-sm text-muted-foreground">
                                  {step.description}
                                </p>
                              </div>
                            ))}
                          </div>
                        </motion.div>

                        <motion.div variants={item}>
                          <h3 className="text-xl font-medium mb-3">
                            Customize Your Settings
                          </h3>
                          <ul className="list-disc list-inside space-y-2 text-muted-foreground mb-6">
                            <li>Set daily learning reminders.</li>
                            <li>Adjust notification preferences.</li>
                            <li>Switch between light and dark mode.</li>
                          </ul>
                        </motion.div>

                        <motion.div
                          variants={item}
                          className="bg-forest/5 p-4 rounded-lg border border-forest/10"
                        >
                          <h3 className="flex items-center font-medium mb-2">
                            <HelpCircle className="h-5 w-5 mr-2" />
                            Pro Tip
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            Set a daily reminder to practice English—it’s the
                            secret to steady progress!
                          </p>
                        </motion.div>
                      </motion.div>
                    </TabsContent>

                    <TabsContent value="step-3" className="mt-0">
                      <motion.div
                        variants={container}
                        initial="hidden"
                        animate="show"
                        className="space-y-6"
                      >
                        <motion.div variants={item}>
                          <h2 className="text-2xl font-bold mb-4">
                            Starting Your First Lesson
                          </h2>
                          <p className="text-muted-foreground mb-4">
                            Ready to learn English? Let’s get you started with
                            your first lesson in EndlessWiz.
                          </p>
                        </motion.div>

                        <motion.div variants={item}>
                          <h3 className="text-xl font-medium mb-3">
                            How to Begin
                          </h3>
                          <ol className="space-y-4 mb-6">
                            {[
                              {
                                title: "Log In",
                                description:
                                  "Sign into your account at /auth/signup.",
                              },
                              {
                                title: "Choose a Lesson",
                                description:
                                  "Pick from pronunciation, vocabulary, or conversation lessons.",
                              },
                              {
                                title: "Start Learning",
                                description:
                                  "Follow the prompts to practice and track your progress.",
                              },
                            ].map((step, index) => (
                              <li
                                key={index}
                                className="p-4 rounded-lg border border-gray-100 shadow-sm"
                              >
                                <h4 className="font-medium mb-1">
                                  {step.title}
                                </h4>
                                <p className="text-sm text-muted-foreground">
                                  {step.description}
                                </p>
                              </li>
                            ))}
                          </ol>
                        </motion.div>

                        <motion.div variants={item}>
                          <h3 className="text-xl font-medium mb-3">
                            Tips for Success
                          </h3>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                            {[
                              "Practice out loud to improve speaking.",
                              "Repeat tough words until they stick.",
                              "Focus on one skill at a time (e.g., pronunciation).",
                              "Take short breaks to stay fresh.",
                            ].map((tip, index) => (
                              <div
                                key={index}
                                className="flex items-start gap-2 p-3 rounded-md"
                              >
                                <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                                <p className="text-sm">{tip}</p>
                              </div>
                            ))}
                          </div>
                        </motion.div>

                        <motion.div
                          variants={item}
                          className="bg-forest/5 p-4 rounded-lg border border-forest/10"
                        >
                          <h3 className="flex items-center font-medium mb-2">
                            <HelpCircle className="h-5 w-5 mr-2" />
                            Pro Tip
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            Record yourself during pronunciation
                            lessons—listening back helps you spot areas to
                            improve!
                          </p>
                        </motion.div>
                      </motion.div>
                    </TabsContent>

                    <TabsContent value="step-4" className="mt-0">
                      <motion.div
                        variants={container}
                        initial="hidden"
                        animate="show"
                        className="space-y-6"
                      >
                        <motion.div variants={item}>
                          <h2 className="text-2xl font-bold mb-4">
                            Learning Tools Overview
                          </h2>
                          <p className="text-muted-foreground mb-4">
                            EndlessWiz offers tools to make English learning fun
                            and effective. Here’s what you can use.
                          </p>
                        </motion.div>

                        <motion.div variants={item}>
                          <h3 className="text-xl font-medium mb-3">
                            Your Learning Tools
                          </h3>
                          <div className="space-y-4 mb-6">
                            {[
                              {
                                title: "Pronunciation Exercises",
                                description:
                                  "Practice sounds and compare to native speakers.",
                                benefits: [
                                  "Clearer speech",
                                  "Confidence boost",
                                ],
                              },
                              {
                                title: "Vocabulary Lessons",
                                description:
                                  "Learn useful words with interactive exercises.",
                                benefits: [
                                  "Bigger word bank",
                                  "Better understanding",
                                ],
                              },
                              {
                                title: "Conversation Practice",
                                description:
                                  "Master phrases for everyday situations.",
                                benefits: [
                                  "Real-world skills",
                                  "Fluency growth",
                                ],
                              },
                            ].map((tool, index) => (
                              <div
                                key={index}
                                className="p-4 rounded-lg border border-gray-100 shadow-sm"
                              >
                                <h4 className="font-medium mb-1">
                                  {tool.title}
                                </h4>
                                <p className="text-sm text-muted-foreground mb-2">
                                  {tool.description}
                                </p>
                                <div className="flex flex-wrap gap-2">
                                  {tool.benefits.map((benefit, i) => (
                                    <span
                                      key={i}
                                      className="text-xs bg-forest/10 px-2 py-1 rounded-full"
                                    >
                                      {benefit}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            ))}
                          </div>
                        </motion.div>

                        <motion.div
                          variants={item}
                          className="bg-forest/5 p-4 rounded-lg border border-forest/10"
                        >
                          <h3 className="flex items-center font-medium mb-2">
                            <HelpCircle className="h-5 w-5 mr-2" />
                            Pro Tip
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            Mix up your tools daily—practice pronunciation one
                            day, vocabulary the next—to keep learning fresh!
                          </p>
                        </motion.div>
                      </motion.div>
                    </TabsContent>

                    <TabsContent value="step-5" className="mt-0">
                      <motion.div
                        variants={container}
                        initial="hidden"
                        animate="show"
                        className="space-y-6"
                      >
                        <motion.div variants={item}>
                          <h2 className="text-2xl font-bold mb-4">
                            Next Steps
                          </h2>
                          <p className="text-muted-foreground mb-4">
                            You’re ready to dive deeper into EndlessWiz! Here’s
                            how to keep improving your English.
                          </p>
                        </motion.div>

                        <motion.div variants={item}>
                          <h3 className="text-xl font-medium mb-3">
                            What to Do Next
                          </h3>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                            {[
                              {
                                title: "Explore More Lessons",
                                description:
                                  "Try new topics like travel phrases or workplace English.",
                                action: "Start Lessons",
                                link: "/auth/signup",
                              },
                              {
                                title: "Set a Daily Goal",
                                description:
                                  "Commit to 10-15 minutes a day for steady progress.",
                                action: "Set Goals",
                                link: "/auth/signup",
                              },
                              {
                                title: "Try Premium",
                                description:
                                  "Unlock advanced tools and ad-free learning.",
                                action: "Go Premium",
                                link: "/auth/signup",
                              },
                              {
                                title: "Contact Support",
                                description:
                                  "Have questions? We’re here to help!",
                                action: "Get Help",
                                link: "/contact",
                              },
                            ].map((item, index) => (
                              <div
                                key={index}
                                className="p-4 rounded-lg border border-gray-100 shadow-sm"
                              >
                                <h4 className="font-medium mb-1">
                                  {item.title}
                                </h4>
                                <p className="text-sm text-muted-foreground mb-3">
                                  {item.description}
                                </p>
                                <Button
                                  variant="outline"
                                  className="w-full border-forest hover:bg-forest hover:text-cream"
                                  asChild
                                >
                                  <Link href={item.link}>
                                    {item.action}
                                    <ArrowRight className="ml-2 h-4 w-4" />
                                  </Link>
                                </Button>
                              </div>
                            ))}
                          </div>
                        </motion.div>

                        <motion.div variants={item}>
                          <div className="bg-forest/10 p-6 rounded-lg text-center mb-6">
                            <h3 className="text-xl font-bold mb-3">
                              Well Done!
                            </h3>
                            <p className="text-muted-foreground mb-4">
                              You’ve finished the Getting Started Guide and are
                              ready to master English with EndlessWiz. Keep
                              practicing!
                            </p>
                            <Button
                              className="bg-forest hover:bg-forest-700 text-cream"
                              asChild
                            >
                              <Link href="/auth/signup">
                                Start Learning
                                <ArrowRight className="ml-2 h-4 w-4" />
                              </Link>
                            </Button>
                          </div>
                        </motion.div>
                      </motion.div>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>

              <div className="mt-6 flex justify-between">
                <Button
                  variant="outline"
                  onClick={() => handleStepChange(Math.max(1, activeStep - 1))}
                  disabled={activeStep === 1}
                  className="border-forest hover:bg-forest hover:text-cream"
                >
                  Previous
                </Button>
                <Button
                  onClick={() => handleStepChange(Math.min(5, activeStep + 1))}
                  disabled={activeStep === 5}
                  className="bg-forest hover:bg-forest-700 text-cream"
                >
                  Next
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
