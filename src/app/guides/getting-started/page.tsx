"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ChevronLeft,
  BookOpen,
  CheckCircle,
  HelpCircle,
  ArrowRight,
  Play,
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
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        <div className="flex-1 p-8">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="mb-8 flex items-center justify-between"
          >
            <div>
              <Link
                href="/help-support"
                className="inline-flex items-center text-forest hover:text-forest-700 mb-2"
              >
                <ChevronLeft className="h-4 w-4 mr-1" />
                Back to Help & Support
              </Link>
              <h1 className="text-3xl font-bold text-forest">
                Getting Started Guide
              </h1>
              <p className="text-muted-foreground">
                Learn the basics of StudyCards and set up your first study set
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
              <div className="bg-white rounded-lg shadow-sm p-4 sticky top-8">
                <h3 className="font-medium text-forest mb-4 flex items-center">
                  <BookOpen className="h-5 w-5 mr-2" />
                  Guide Contents
                </h3>
                <nav className="space-y-1">
                  {[
                    { step: 1, title: "Welcome to StudyCards" },
                    { step: 2, title: "Creating Your Account" },
                    { step: 3, title: "Creating Your First Set" },
                    { step: 4, title: "Study Modes Overview" },
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
                              ? "bg-white text-forest"
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
                          <h2 className="text-2xl font-bold text-forest mb-4">
                            Welcome to StudyCards
                          </h2>
                          <p className="text-muted-foreground mb-4">
                            StudyCards is a powerful learning platform designed
                            to help you master any subject through effective
                            study techniques. Whether you're learning a new
                            language, studying for an exam, or expanding your
                            knowledge, our tools will help you learn faster and
                            remember longer.
                          </p>
                        </motion.div>

                        <motion.div variants={item}>
                          <h3 className="text-xl font-medium text-forest mb-3">
                            What You Can Do With StudyCards
                          </h3>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                            {[
                              {
                                title: "Create Custom Study Sets",
                                description:
                                  "Build personalized flashcards for any subject you're learning",
                              },
                              {
                                title: "Multiple Study Modes",
                                description:
                                  "Learn with flashcards, tests, games, and more",
                              },
                              {
                                title: "Track Your Progress",
                                description:
                                  "See your improvement over time with detailed statistics",
                              },
                              {
                                title: "Study Anywhere",
                                description:
                                  "Access your study materials on any device, anytime",
                              },
                            ].map((feature, index) => (
                              <div
                                key={index}
                                className="bg-gray-50 p-4 rounded-lg"
                              >
                                <h4 className="font-medium text-forest mb-1">
                                  {feature.title}
                                </h4>
                                <p className="text-sm text-muted-foreground">
                                  {feature.description}
                                </p>
                              </div>
                            ))}
                          </div>
                        </motion.div>

                        <motion.div variants={item}>
                          <div className="relative rounded-lg overflow-hidden mb-6">
                            <img
                              src="/placeholder.svg?height=300&width=700"
                              alt="StudyCards Dashboard Overview"
                              className="w-full h-auto"
                            />
                            <div className="absolute inset-0 flex items-center justify-center">
                              <Button className="bg-forest/90 hover:bg-forest text-white">
                                <Play className="h-4 w-4 mr-2" />
                                Watch Introduction Video
                              </Button>
                            </div>
                          </div>
                        </motion.div>

                        <motion.div
                          variants={item}
                          className="bg-forest/5 p-4 rounded-lg border border-forest/10"
                        >
                          <h3 className="flex items-center text-forest font-medium mb-2">
                            <HelpCircle className="h-5 w-5 mr-2" />
                            Did You Know?
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            Research shows that active recall and spaced
                            repetition (both featured in StudyCards) can improve
                            long-term retention by up to 80% compared to
                            traditional study methods.
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
                          <h2 className="text-2xl font-bold text-forest mb-4">
                            Creating Your Account
                          </h2>
                          <p className="text-muted-foreground mb-4">
                            Setting up your StudyCards account is quick and
                            easy. Follow these steps to get started and
                            personalize your learning experience.
                          </p>
                        </motion.div>

                        <motion.div variants={item}>
                          <h3 className="text-xl font-medium text-forest mb-3">
                            Step-by-Step Account Setup
                          </h3>
                          <div className="space-y-4 mb-6">
                            {[
                              {
                                title: "Sign Up",
                                description:
                                  "Create your account using your email, Google, or Apple account. Choose a strong password to secure your account.",
                                image: "/placeholder.svg?height=150&width=300",
                              },
                              {
                                title: "Complete Your Profile",
                                description:
                                  "Add your name, profile picture, and select your primary learning interests to help us personalize your experience.",
                                image: "/placeholder.svg?height=150&width=300",
                              },
                              {
                                title: "Set Your Learning Goals",
                                description:
                                  "Tell us what you want to achieve and how often you plan to study. This helps us create reminders and track your progress.",
                                image: "/placeholder.svg?height=150&width=300",
                              },
                            ].map((step, index) => (
                              <div
                                key={index}
                                className="flex flex-col md:flex-row gap-4 p-4 bg-white rounded-lg border border-gray-100 shadow-sm"
                              >
                                <div className="md:w-1/3">
                                  <img
                                    src={step.image || "/placeholder.svg"}
                                    alt={step.title}
                                    className="w-full h-auto rounded-md"
                                  />
                                </div>
                                <div className="md:w-2/3">
                                  <h4 className="font-medium text-forest mb-1">
                                    {index + 1}. {step.title}
                                  </h4>
                                  <p className="text-sm text-muted-foreground">
                                    {step.description}
                                  </p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </motion.div>

                        <motion.div variants={item}>
                          <h3 className="text-xl font-medium text-forest mb-3">
                            Account Settings
                          </h3>
                          <p className="text-muted-foreground mb-4">
                            After creating your account, you can customize your
                            experience further through the Settings page:
                          </p>
                          <ul className="list-disc list-inside space-y-2 text-muted-foreground mb-6">
                            <li>Change your display language</li>
                            <li>Set notification preferences</li>
                            <li>Customize your dashboard layout</li>
                            <li>Connect to other learning platforms</li>
                            <li>Manage privacy settings</li>
                          </ul>
                        </motion.div>

                        <motion.div
                          variants={item}
                          className="bg-forest/5 p-4 rounded-lg border border-forest/10"
                        >
                          <h3 className="flex items-center text-forest font-medium mb-2">
                            <HelpCircle className="h-5 w-5 mr-2" />
                            Pro Tip
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            Enable daily study reminders to build a consistent
                            study habit. Users who study daily are 3x more
                            likely to achieve their learning goals!
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
                          <h2 className="text-2xl font-bold text-forest mb-4">
                            Creating Your First Set
                          </h2>
                          <p className="text-muted-foreground mb-4">
                            Study sets are the foundation of learning with
                            StudyCards. Let's walk through the process of
                            creating your first study set with effective
                            flashcards.
                          </p>
                        </motion.div>

                        <motion.div variants={item}>
                          <h3 className="text-xl font-medium text-forest mb-3">
                            Creating a New Study Set
                          </h3>
                          <ol className="space-y-4 mb-6">
                            {[
                              {
                                title: "Start a New Set",
                                description:
                                  "Click the 'Create' button on your dashboard or navigate to the 'Create Set' page.",
                              },
                              {
                                title: "Name Your Set",
                                description:
                                  "Give your set a descriptive title and add a brief description. You can also select a subject category and add tags for better organization.",
                              },
                              {
                                title: "Add Your Terms",
                                description:
                                  "Enter terms and definitions for your flashcards. You can add images, audio, and formatting to make your cards more effective.",
                              },
                              {
                                title: "Organize and Review",
                                description:
                                  "Arrange your cards in a logical order, review them for accuracy, and make any necessary edits.",
                              },
                              {
                                title: "Save and Share",
                                description:
                                  "Save your set and decide whether to keep it private or share it with others. You can also create a study group for collaborative learning.",
                              },
                            ].map((step, index) => (
                              <li
                                key={index}
                                className="bg-white p-4 rounded-lg border border-gray-100 shadow-sm"
                              >
                                <h4 className="font-medium text-forest mb-1">
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
                          <h3 className="text-xl font-medium text-forest mb-3">
                            Tips for Effective Flashcards
                          </h3>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                            {[
                              "Keep information on each card simple and focused",
                              "Use images to reinforce visual memory",
                              "Create cards that test your recall, not just recognition",
                              "Include examples to illustrate concepts",
                              "Use formatting to highlight key information",
                              "Review and refine your cards regularly",
                            ].map((tip, index) => (
                              <div
                                key={index}
                                className="flex items-start gap-2 bg-gray-50 p-3 rounded-md"
                              >
                                <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                                <p className="text-sm">{tip}</p>
                              </div>
                            ))}
                          </div>
                        </motion.div>

                        <motion.div variants={item}>
                          <div className="bg-white p-4 rounded-lg border border-gray-100 shadow-sm mb-6">
                            <h3 className="text-xl font-medium text-forest mb-3">
                              Example Study Set
                            </h3>
                            <p className="text-muted-foreground mb-4">
                              Here's an example of a well-structured study set
                              for Spanish vocabulary:
                            </p>
                            <div className="space-y-3">
                              {[
                                { term: "Hola", definition: "Hello" },
                                { term: "Gracias", definition: "Thank you" },
                                { term: "Por favor", definition: "Please" },
                                {
                                  term: "¿Cómo estás?",
                                  definition: "How are you?",
                                },
                              ].map((card, index) => (
                                <div
                                  key={index}
                                  className="flex bg-gray-50 rounded-md overflow-hidden"
                                >
                                  <div className="w-1/2 p-3 border-r border-gray-200">
                                    <p className="font-medium">{card.term}</p>
                                  </div>
                                  <div className="w-1/2 p-3">
                                    <p>{card.definition}</p>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </motion.div>

                        <motion.div
                          variants={item}
                          className="bg-forest/5 p-4 rounded-lg border border-forest/10"
                        >
                          <h3 className="flex items-center text-forest font-medium mb-2">
                            <HelpCircle className="h-5 w-5 mr-2" />
                            Pro Tip
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            For language learning, include audio pronunciations
                            with your flashcards. Hearing the words spoken
                            correctly will improve your speaking skills
                            alongside your vocabulary.
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
                          <h2 className="text-2xl font-bold text-forest mb-4">
                            Study Modes Overview
                          </h2>
                          <p className="text-muted-foreground mb-4">
                            StudyCards offers multiple study modes to help you
                            learn in different ways. Each mode is designed to
                            reinforce your knowledge and improve retention
                            through varied approaches.
                          </p>
                        </motion.div>

                        <motion.div variants={item}>
                          <h3 className="text-xl font-medium text-forest mb-3">
                            Available Study Modes
                          </h3>
                          <div className="space-y-4 mb-6">
                            {[
                              {
                                title: "Flashcards",
                                description:
                                  "The classic study method. Flip through digital cards to test your recall of terms and definitions.",
                                benefits: [
                                  "Great for initial learning",
                                  "Simple and effective",
                                  "Works for all subjects",
                                ],
                                icon: "🔄",
                              },
                              {
                                title: "Learn Mode",
                                description:
                                  "A guided study session that adapts to your knowledge level. Items you struggle with will appear more frequently.",
                                benefits: [
                                  "Personalized to your progress",
                                  "Uses spaced repetition",
                                  "Tracks what you know and don't know",
                                ],
                                icon: "📚",
                              },
                              {
                                title: "Test Mode",
                                description:
                                  "Take a practice test with various question types including multiple choice, true/false, and written answers.",
                                benefits: [
                                  "Simulates exam conditions",
                                  "Varied question formats",
                                  "Detailed performance analysis",
                                ],
                                icon: "📝",
                              },
                              {
                                title: "Games",
                                description:
                                  "Make learning fun with interactive games like Hangman and Word Puzzles based on your study sets.",
                                benefits: [
                                  "Engaging and motivating",
                                  "Reduces study fatigue",
                                  "Reinforces learning",
                                ],
                                icon: "🎮",
                              },
                            ].map((mode, index) => (
                              <div
                                key={index}
                                className="bg-white p-4 rounded-lg border border-gray-100 shadow-sm"
                              >
                                <div className="flex items-start gap-3">
                                  <div className="text-2xl">{mode.icon}</div>
                                  <div>
                                    <h4 className="font-medium text-forest mb-1">
                                      {mode.title}
                                    </h4>
                                    <p className="text-sm text-muted-foreground mb-2">
                                      {mode.description}
                                    </p>
                                    <div className="flex flex-wrap gap-2">
                                      {mode.benefits.map((benefit, i) => (
                                        <span
                                          key={i}
                                          className="text-xs bg-forest/10 text-forest px-2 py-1 rounded-full"
                                        >
                                          {benefit}
                                        </span>
                                      ))}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </motion.div>

                        <motion.div variants={item}>
                          <h3 className="text-xl font-medium text-forest mb-3">
                            Choosing the Right Study Mode
                          </h3>
                          <div className="bg-white p-4 rounded-lg border border-gray-100 shadow-sm mb-6">
                            <p className="text-muted-foreground mb-4">
                              Different study modes are effective at different
                              stages of learning:
                            </p>
                            <div className="space-y-3">
                              <div className="flex items-center gap-2">
                                <div className="w-32 font-medium">
                                  New Material:
                                </div>
                                <div className="text-muted-foreground">
                                  Start with Flashcards and Learn Mode
                                </div>
                              </div>
                              <div className="flex items-center gap-2">
                                <div className="w-32 font-medium">
                                  Reinforcement:
                                </div>
                                <div className="text-muted-foreground">
                                  Use Games to keep engaged
                                </div>
                              </div>
                              <div className="flex items-center gap-2">
                                <div className="w-32 font-medium">
                                  Test Preparation:
                                </div>
                                <div className="text-muted-foreground">
                                  Use Test Mode to simulate exam conditions
                                </div>
                              </div>
                              <div className="flex items-center gap-2">
                                <div className="w-32 font-medium">
                                  Long-term Retention:
                                </div>
                                <div className="text-muted-foreground">
                                  Combine all modes with spaced repetition over
                                  time
                                </div>
                              </div>
                            </div>
                          </div>
                        </motion.div>

                        <motion.div
                          variants={item}
                          className="bg-forest/5 p-4 rounded-lg border border-forest/10"
                        >
                          <h3 className="flex items-center text-forest font-medium mb-2">
                            <HelpCircle className="h-5 w-5 mr-2" />
                            Pro Tip
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            For optimal learning, use a variety of study modes
                            rather than sticking to just one. Research shows
                            that varied practice leads to better long-term
                            retention and understanding.
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
                          <h2 className="text-2xl font-bold text-forest mb-4">
                            Next Steps
                          </h2>
                          <p className="text-muted-foreground mb-4">
                            Now that you understand the basics of StudyCards,
                            here are some next steps to enhance your learning
                            experience and get the most out of the platform.
                          </p>
                        </motion.div>

                        <motion.div variants={item}>
                          <h3 className="text-xl font-medium text-forest mb-3">
                            Recommended Actions
                          </h3>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                            {[
                              {
                                title: "Explore the Library",
                                description:
                                  "Browse our collection of pre-made study sets created by other users and educators.",
                                action: "Browse Library",
                                link: "/sets",
                              },
                              {
                                title: "Join a Study Group",
                                description:
                                  "Connect with other learners studying similar subjects to share resources and motivation.",
                                action: "Find Groups",
                                link: "#",
                              },
                              {
                                title: "Set Up Daily Goals",
                                description:
                                  "Establish a consistent study schedule with daily goals to track your progress.",
                                action: "Set Goals",
                                link: "#",
                              },
                              {
                                title: "Explore Premium Features",
                                description:
                                  "Discover advanced features like offline mode, advanced statistics, and more.",
                                action: "See Premium",
                                link: "#",
                              },
                            ].map((item, index) => (
                              <div
                                key={index}
                                className="bg-white p-4 rounded-lg border border-gray-100 shadow-sm"
                              >
                                <h4 className="font-medium text-forest mb-1">
                                  {item.title}
                                </h4>
                                <p className="text-sm text-muted-foreground mb-3">
                                  {item.description}
                                </p>
                                <Button
                                  variant="outline"
                                  className="w-full border-forest text-forest hover:bg-forest hover:text-cream"
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
                          <h3 className="text-xl font-medium text-forest mb-3">
                            Advanced Features to Explore
                          </h3>
                          <div className="space-y-3 mb-6">
                            {[
                              {
                                title: "Spaced Repetition",
                                description:
                                  "Our algorithm automatically schedules reviews at optimal intervals to maximize retention.",
                              },
                              {
                                title: "Progress Analytics",
                                description:
                                  "Track your learning with detailed statistics and visualizations of your progress over time.",
                              },
                              {
                                title: "Custom Study Sessions",
                                description:
                                  "Create personalized study sessions focusing on specific terms or concepts you find challenging.",
                              },
                              {
                                title: "Audio Pronunciations",
                                description:
                                  "For language learning, hear correct pronunciations and practice your speaking skills.",
                              },
                            ].map((feature, index) => (
                              <div
                                key={index}
                                className="bg-gray-50 p-3 rounded-md"
                              >
                                <h4 className="font-medium text-forest mb-1">
                                  {feature.title}
                                </h4>
                                <p className="text-sm text-muted-foreground">
                                  {feature.description}
                                </p>
                              </div>
                            ))}
                          </div>
                        </motion.div>

                        <motion.div variants={item}>
                          <div className="bg-forest/10 p-6 rounded-lg text-center mb-6">
                            <h3 className="text-xl font-bold text-forest mb-3">
                              Congratulations!
                            </h3>
                            <p className="text-muted-foreground mb-4">
                              You've completed the Getting Started Guide and are
                              ready to begin your learning journey with
                              StudyCards. Remember, consistent practice is the
                              key to success!
                            </p>
                            <Button
                              className="bg-forest hover:bg-forest-700 text-cream"
                              asChild
                            >
                              <Link href="/dashboard">
                                Go to Dashboard
                                <ArrowRight className="ml-2 h-4 w-4" />
                              </Link>
                            </Button>
                          </div>
                        </motion.div>

                        <motion.div variants={item}>
                          <h3 className="text-xl font-medium text-forest mb-3">
                            Additional Resources
                          </h3>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {[
                              {
                                title: "Video Tutorials",
                                description:
                                  "Watch step-by-step guides for using all features",
                                link: "#",
                              },
                              {
                                title: "Help Center",
                                description:
                                  "Find answers to common questions and issues",
                                link: "/help-support",
                              },
                              {
                                title: "Learning Blog",
                                description:
                                  "Read articles about effective study techniques",
                                link: "#",
                              },
                            ].map((resource, index) => (
                              <Link
                                key={index}
                                href={resource.link}
                                className="bg-white p-4 rounded-lg border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
                              >
                                <h4 className="font-medium text-forest mb-1">
                                  {resource.title}
                                </h4>
                                <p className="text-sm text-muted-foreground">
                                  {resource.description}
                                </p>
                              </Link>
                            ))}
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
                  className="border-forest text-forest hover:bg-forest hover:text-cream"
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
