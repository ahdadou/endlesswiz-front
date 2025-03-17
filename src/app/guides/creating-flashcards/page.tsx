"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ChevronLeft,
  PenTool,
  CheckCircle,
  HelpCircle,
  Lightbulb,
  AlertTriangle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { motion } from "framer-motion";

export default function CreatingFlashcardsGuidePage() {
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
    <div className="min-h-screen ">
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
                className="inline-flex items-center hover:text-forest-700 mb-2"
              >
                <ChevronLeft className="h-4 w-4 mr-1" />
                Back to Help & Support
              </Link>
              <h1 className="text-3xl font-bold ">
                Creating Effective Flashcards
              </h1>
              <p className="text-muted-foreground">
                Learn how to create memorable and effective flashcards for
                better learning
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
                  <PenTool className="h-5 w-5 mr-2" />
                  Guide Contents
                </h3>
                <nav className="space-y-1">
                  {[
                    { step: 1, title: "Flashcard Fundamentals" },
                    { step: 2, title: "Crafting Effective Content" },
                    { step: 3, title: "Using Media & Formatting" },
                    { step: 4, title: "Organization Strategies" },
                    { step: 5, title: "Advanced Techniques" },
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
                            Flashcard Fundamentals
                          </h2>
                          <p className="text-muted-foreground mb-4">
                            Flashcards are one of the most effective study tools
                            because they leverage active recall and spaced
                            repetition—two powerful learning techniques backed
                            by cognitive science. Let's explore what makes
                            flashcards work and how to create them effectively.
                          </p>
                        </motion.div>

                        <motion.div variants={item}>
                          <h3 className="text-xl font-medium mb-3">
                            Why Flashcards Work
                          </h3>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                            {[
                              {
                                title: "Active Recall",
                                description:
                                  "Actively retrieving information from memory strengthens neural pathways, making the information easier to recall in the future.",
                                icon: (
                                  <Lightbulb className="h-8 w-8 text-amber-500" />
                                ),
                              },
                              {
                                title: "Spaced Repetition",
                                description:
                                  "Reviewing information at increasing intervals over time optimizes long-term retention and prevents forgetting.",
                                icon: (
                                  <Lightbulb className="h-8 w-8 text-amber-500" />
                                ),
                              },
                              {
                                title: "Metacognition",
                                description:
                                  "Flashcards help you assess what you know and don't know, allowing you to focus your study time more effectively.",
                                icon: (
                                  <Lightbulb className="h-8 w-8 text-amber-500" />
                                ),
                              },
                              {
                                title: "Portability",
                                description:
                                  "Digital flashcards can be studied anywhere, making it easy to fit learning into your daily routine.",
                                icon: (
                                  <Lightbulb className="h-8 w-8 text-amber-500" />
                                ),
                              },
                            ].map((benefit, index) => (
                              <div
                                key={index}
                                className="p-4 rounded-lg border border-gray-100 shadow-sm"
                              >
                                <div className="flex items-start gap-3">
                                  <div className="rounded-full bg-amber-100 p-2">
                                    {benefit.icon}
                                  </div>
                                  <div>
                                    <h4 className="font-medium mb-1">
                                      {benefit.title}
                                    </h4>
                                    <p className="text-sm text-muted-foreground">
                                      {benefit.description}
                                    </p>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </motion.div>

                        <motion.div variants={item}>
                          <h3 className="text-xl font-medium mb-3">
                            The Anatomy of a Good Flashcard
                          </h3>
                          <div className="p-5 rounded-lg border border-gray-100 shadow-sm mb-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                              <div>
                                <h4 className="font-medium mb-3">
                                  Front Side (Question)
                                </h4>
                                <div className="p-4 rounded-md border border-gray-200 h-40 flex items-center justify-center">
                                  <div className="text-center">
                                    <p className="font-medium">
                                      What is photosynthesis?
                                    </p>
                                  </div>
                                </div>
                                <div className="mt-3 space-y-2">
                                  <div className="flex items-start gap-2">
                                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                                    <p className="text-sm">
                                      Clear, specific question
                                    </p>
                                  </div>
                                  <div className="flex items-start gap-2">
                                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                                    <p className="text-sm">Concise wording</p>
                                  </div>
                                  <div className="flex items-start gap-2">
                                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                                    <p className="text-sm">
                                      Tests one concept at a time
                                    </p>
                                  </div>
                                </div>
                              </div>
                              <div>
                                <h4 className="font-medium mb-3">
                                  Back Side (Answer)
                                </h4>
                                <div className="p-4 rounded-md border border-gray-200 h-40 overflow-auto">
                                  <p className="font-medium mb-2">
                                    The process by which plants convert:
                                  </p>
                                  <ul className="list-disc list-inside text-sm space-y-1">
                                    <li>Sunlight</li>
                                    <li>Carbon dioxide</li>
                                    <li>Water</li>
                                  </ul>
                                  <p className="text-sm mt-2">
                                    Into oxygen and glucose (energy).
                                  </p>
                                </div>
                                <div className="mt-3 space-y-2">
                                  <div className="flex items-start gap-2">
                                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                                    <p className="text-sm">
                                      Complete but concise answer
                                    </p>
                                  </div>
                                  <div className="flex items-start gap-2">
                                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                                    <p className="text-sm">
                                      Organized with bullet points
                                    </p>
                                  </div>
                                  <div className="flex items-start gap-2">
                                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                                    <p className="text-sm">
                                      Focuses on key information
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </motion.div>

                        <motion.div variants={item}>
                          <h3 className="text-xl font-medium mb-3">
                            Common Flashcard Mistakes
                          </h3>
                          <div className="space-y-3 mb-6">
                            {[
                              {
                                mistake:
                                  "Including too much information on one card",
                                solution:
                                  "Break complex topics into multiple cards that each focus on a single concept",
                              },
                              {
                                mistake: "Creating cards that are too vague",
                                solution:
                                  "Make questions specific and ensure they test your understanding, not just recognition",
                              },
                              {
                                mistake: "Using only text-based cards",
                                solution:
                                  "Incorporate images, diagrams, and audio when appropriate to engage multiple learning pathways",
                              },
                              {
                                mistake: "Creating one-way cards only",
                                solution:
                                  "For many subjects, create reversible cards that test the information from both directions",
                              },
                            ].map((item, index) => (
                              <div
                                key={index}
                                className="p-4 rounded-lg border border-gray-100 shadow-sm"
                              >
                                <div className="flex items-start gap-3">
                                  <AlertTriangle className="h-5 w-5 text-amber-500 mt-0.5" />
                                  <div>
                                    <h4 className="font-medium mb-1">
                                      Mistake: {item.mistake}
                                    </h4>
                                    <p className="text-sm text-muted-foreground">
                                      <span className="font-medium">
                                        Solution:
                                      </span>{" "}
                                      {item.solution}
                                    </p>
                                  </div>
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
                            Did You Know?
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            Research shows that testing yourself with flashcards
                            is up to 150% more effective than simply rereading
                            your notes. This is because active recall
                            strengthens memory pathways more effectively than
                            passive review.
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
                            Crafting Effective Content
                          </h2>
                          <p className="text-muted-foreground mb-4">
                            The content of your flashcards is crucial for
                            effective learning. Well-crafted cards promote
                            deeper understanding and better retention. Let's
                            explore how to create content that maximizes your
                            learning.
                          </p>
                        </motion.div>

                        <motion.div variants={item}>
                          <h3 className="text-xl font-medium mb-3">
                            Question Types & Formats
                          </h3>
                          <div className="space-y-4 mb-6">
                            {[
                              {
                                type: "Basic Question & Answer",
                                example:
                                  "Q: What is the capital of France? A: Paris",
                                bestFor:
                                  "Simple facts, vocabulary, definitions",
                              },
                              {
                                type: "Fill-in-the-blank",
                                example:
                                  "Q: The process of ______ allows plants to make their own food. A: Photosynthesis",
                                bestFor:
                                  "Testing recall of specific terms within context",
                              },
                              {
                                type: "True/False",
                                example:
                                  "Q: The heart pumps deoxygenated blood to the lungs. A: True",
                                bestFor:
                                  "Checking understanding of concepts and correcting misconceptions",
                              },
                              {
                                type: "Multiple Choice",
                                example:
                                  "Q: Which of these is NOT a noble gas? A: Nitrogen (options: Helium, Argon, Nitrogen, Neon)",
                                bestFor:
                                  "Testing discrimination between similar concepts",
                              },
                              {
                                type: "Explanation",
                                example:
                                  "Q: Explain how a battery works. A: A battery converts chemical energy to electrical energy through...",
                                bestFor:
                                  "Testing deeper understanding of processes and concepts",
                              },
                            ].map((format, index) => (
                              <div
                                key={index}
                                className="p-4 rounded-lg border border-gray-100 shadow-sm"
                              >
                                <h4 className="font-medium mb-1">
                                  {format.type}
                                </h4>
                                <p className="text-sm text-muted-foreground mb-2">
                                  <span className="italic">Example:</span>{" "}
                                  {format.example}
                                </p>
                                <p className="text-sm">
                                  <span className="font-medium">Best for:</span>{" "}
                                  {format.bestFor}
                                </p>
                              </div>
                            ))}
                          </div>
                        </motion.div>

                        <motion.div variants={item}>
                          <h3 className="text-xl font-medium mb-3">
                            Writing Effective Questions
                          </h3>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                            <div className="p-4 rounded-lg border border-gray-100 shadow-sm">
                              <h4 className="font-medium mb-3">
                                Do's
                              </h4>
                              <div className="space-y-2">
                                {[
                                  "Be specific and clear in your wording",
                                  "Focus on one concept per card",
                                  "Use your own words to demonstrate understanding",
                                  "Include context when necessary",
                                  "Create questions that require deeper thinking",
                                ].map((tip, index) => (
                                  <div
                                    key={index}
                                    className="flex items-start gap-2"
                                  >
                                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                                    <p className="text-sm">{tip}</p>
                                  </div>
                                ))}
                              </div>
                            </div>
                            <div className="p-4 rounded-lg border border-gray-100 shadow-sm">
                              <h4 className="font-medium mb-3">
                                Don'ts
                              </h4>
                              <div className="space-y-2">
                                {[
                                  "Don't copy text verbatim from sources",
                                  "Avoid vague questions with multiple possible answers",
                                  "Don't include too much information on one card",
                                  "Avoid creating cards that only test recognition",
                                  "Don't use overly complex language unnecessarily",
                                ].map((tip, index) => (
                                  <div
                                    key={index}
                                    className="flex items-start gap-2"
                                  >
                                    <AlertTriangle className="h-5 w-5 text-amber-500 mt-0.5 flex-shrink-0" />
                                    <p className="text-sm">{tip}</p>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        </motion.div>

                        <motion.div variants={item}>
                          <h3 className="text-xl font-medium mb-3">
                            Before & After Examples
                          </h3>
                          <div className="space-y-4 mb-6">
                            {[
                              {
                                subject: "Biology",
                                poor: {
                                  question: "Cell parts",
                                  answer:
                                    "Nucleus, mitochondria, endoplasmic reticulum, Golgi apparatus, lysosomes, cell membrane, cytoplasm, ribosomes, etc.",
                                },
                                improved: {
                                  question:
                                    "What is the function of mitochondria in a cell?",
                                  answer:
                                    "Mitochondria are the powerhouses of the cell. They generate most of the cell's supply of ATP (energy) through cellular respiration.",
                                },
                              },
                              {
                                subject: "History",
                                poor: {
                                  question: "World War II",
                                  answer:
                                    "Started 1939, ended 1945. Major powers: Allies (US, UK, USSR) vs Axis (Germany, Italy, Japan). Major events: Pearl Harbor, D-Day, Holocaust, atomic bombs.",
                                },
                                improved: {
                                  question:
                                    "What were the main causes of World War II?",
                                  answer:
                                    "1. Treaty of Versailles' harsh terms on Germany\n2. Global economic depression\n3. Rise of fascism and militarism\n4. Failure of appeasement policies\n5. German invasion of Poland in 1939",
                                },
                              },
                            ].map((example, index) => (
                              <div
                                key={index}
                                className="p-4 rounded-lg border border-gray-100 shadow-sm"
                              >
                                <h4 className="font-medium mb-3">
                                  {example.subject} Example
                                </h4>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                  <div>
                                    <div className="bg-red-50 p-3 rounded-md border border-red-100 mb-2">
                                      <p className="text-sm font-medium text-red-700 mb-1">
                                        Poor Flashcard
                                      </p>
                                      <p className="text-sm mb-1">
                                        <span className="font-medium">Q:</span>{" "}
                                        {example.poor.question}
                                      </p>
                                      <p className="text-sm">
                                        <span className="font-medium">A:</span>{" "}
                                        {example.poor.answer}
                                      </p>
                                    </div>
                                    <div className="text-sm text-red-600">
                                      <AlertTriangle className="h-4 w-4 inline-block mr-1" />
                                      Too broad, overwhelming amount of
                                      information
                                    </div>
                                  </div>
                                  <div>
                                    <div className="bg-green-50 p-3 rounded-md border border-green-100 mb-2">
                                      <p className="text-sm font-medium text-green-700 mb-1">
                                        Improved Flashcard
                                      </p>
                                      <p className="text-sm mb-1">
                                        <span className="font-medium">Q:</span>{" "}
                                        {example.improved.question}
                                      </p>
                                      <p className="text-sm whitespace-pre-line">
                                        <span className="font-medium">A:</span>{" "}
                                        {example.improved.answer}
                                      </p>
                                    </div>
                                    <div className="text-sm text-green-600">
                                      <CheckCircle className="h-4 w-4 inline-block mr-1" />
                                      Specific question, organized answer, one
                                      concept
                                    </div>
                                  </div>
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
                            When creating flashcards for complex subjects, use
                            the "minimum information principle" — break down
                            complex information into the smallest possible
                            pieces that still convey meaningful information.
                            This makes each card easier to remember and review.
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
                            Using Media & Formatting
                          </h2>
                          <p className="text-muted-foreground mb-4">
                            Enhancing your flashcards with media and proper
                            formatting can significantly improve their
                            effectiveness. Visual and audio elements engage
                            multiple learning pathways, making information
                            easier to recall.
                          </p>
                        </motion.div>

                        <motion.div variants={item}>
                          <h3 className="text-xl font-medium mb-3">
                            Adding Images to Flashcards
                          </h3>
                          <div className="p-5 rounded-lg border border-gray-100 shadow-sm mb-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                              <div>
                                <h4 className="font-medium mb-3">
                                  When to Use Images
                                </h4>
                                <div className="space-y-2">
                                  {[
                                    "For visual subjects (anatomy, art, geography)",
                                    "To illustrate complex concepts or processes",
                                    "For language learning (picture-to-word associations)",
                                    "To create stronger memory associations",
                                    "For diagrams, charts, and graphs",
                                  ].map((use, index) => (
                                    <div
                                      key={index}
                                      className="flex items-start gap-2"
                                    >
                                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                                      <p className="text-sm">{use}</p>
                                    </div>
                                  ))}
                                </div>
                              </div>
                              <div>
                                <h4 className="font-medium mb-3">
                                  Image Best Practices
                                </h4>
                                <div className="space-y-2">
                                  {[
                                    "Use clear, high-quality images",
                                    "Crop images to focus on relevant details",
                                    "Consider using your own drawings or diagrams",
                                    "Label important parts of complex images",
                                    "Ensure images are not distracting from the main concept",
                                  ].map((practice, index) => (
                                    <div
                                      key={index}
                                      className="flex items-start gap-2"
                                    >
                                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                                      <p className="text-sm">{practice}</p>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </div>

                            <div className="mt-6">
                              <h4 className="font-medium mb-3">
                                Example: Anatomy Flashcard
                              </h4>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="p-4 rounded-md border border-gray-200">
                                  <p className="font-medium mb-3">
                                    Front Side (Question)
                                  </p>
                                  <div className="text-center">
                                    <img
                                      src="/placeholder.svg?height=150&width=200"
                                      alt="Heart diagram with labels removed"
                                      className="mx-auto mb-2"
                                    />
                                    <p>Label the chambers of the heart</p>
                                  </div>
                                </div>
                                <div className="p-4 rounded-md border border-gray-200">
                                  <p className="font-medium mb-3">
                                    Back Side (Answer)
                                  </p>
                                  <div className="text-center">
                                    <img
                                      src="/placeholder.svg?height=150&width=200"
                                      alt="Heart diagram with labeled chambers"
                                      className="mx-auto mb-2"
                                    />
                                    <ul className="text-sm text-left list-disc list-inside">
                                      <li>A: Right Atrium</li>
                                      <li>B: Left Atrium</li>
                                      <li>C: Right Ventricle</li>
                                      <li>D: Left Ventricle</li>
                                    </ul>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </motion.div>

                        <motion.div variants={item}>
                          <h3 className="text-xl font-medium mb-3">
                            Text Formatting Techniques
                          </h3>
                          <div className="p-5 rounded-lg border border-gray-100 shadow-sm mb-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                              <div>
                                <h4 className="font-medium mb-3">
                                  Formatting Elements
                                </h4>
                                <div className="space-y-3">
                                  <div className="p-3 rounded-md">
                                    <p className="font-medium mb-1">
                                      Bold & Italics
                                    </p>
                                    <p className="text-sm">
                                      Use{" "}
                                      <span className="font-bold">bold</span>{" "}
                                      for key terms and{" "}
                                      <span className="italic">italics</span>{" "}
                                      for emphasis or foreign words.
                                    </p>
                                  </div>
                                  <div className="p-3 rounded-md">
                                    <p className="font-medium mb-1">
                                      Lists & Bullet Points
                                    </p>
                                    <p className="text-sm mb-2">
                                      Organize related information in lists:
                                    </p>
                                    <ul className="text-sm list-disc list-inside">
                                      <li>First item</li>
                                      <li>Second item</li>
                                      <li>Third item</li>
                                    </ul>
                                  </div>
                                  <div className="p-3 rounded-md">
                                    <p className="font-medium mb-1">
                                      Headings & Subheadings
                                    </p>
                                    <p className="text-sm">
                                      Create visual hierarchy with different
                                      heading sizes for complex answers.
                                    </p>
                                  </div>
                                </div>
                              </div>
                              <div>
                                <h4 className="font-medium mb-3">
                                  Color & Highlighting
                                </h4>
                                <div className="space-y-3">
                                  <div className="p-3 rounded-md">
                                    <p className="font-medium mb-1">
                                      Color Coding
                                    </p>
                                    <p className="text-sm">
                                      Use consistent colors for different types
                                      of information:
                                    </p>
                                    <div className="mt-2 space-y-1">
                                      <p className="text-sm">
                                        <span className="inline-block w-3 h-3 bg-red-500 rounded-full mr-2"></span>
                                        <span className="text-red-600 font-medium">
                                          Red
                                        </span>{" "}
                                        for important definitions
                                      </p>
                                      <p className="text-sm">
                                        <span className="inline-block w-3 h-3 bg-blue-500 rounded-full mr-2"></span>
                                        <span className="text-blue-600 font-medium">
                                          Blue
                                        </span>{" "}
                                        for examples
                                      </p>
                                      <p className="text-sm">
                                        <span className="inline-block w-3 h-3 bg-green-500 rounded-full mr-2"></span>
                                        <span className="text-green-600 font-medium">
                                          Green
                                        </span>{" "}
                                        for formulas
                                      </p>
                                    </div>
                                  </div>
                                  <div className="p-3 rounded-md">
                                    <p className="font-medium mb-1">
                                      Highlighting
                                    </p>
                                    <p className="text-sm">
                                      Use{" "}
                                      <span className="bg-yellow-200 px-1">
                                        highlighting
                                      </span>{" "}
                                      sparingly to draw attention to the most
                                      critical information.
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </div>

                            <div className="mt-6">
                              <h4 className="font-medium mb-3">
                                Example: Well-Formatted Flashcard
                              </h4>
                              <div className="p-4 rounded-md border border-gray-200">
                                <p className="font-medium mb-2">
                                  Back Side (Answer to "What are the three
                                  branches of the U.S. government?")
                                </p>
                                <div>
                                  <h5 className="font-medium ">
                                    The Three Branches:
                                  </h5>
                                  <ol className="list-decimal list-inside mt-2 space-y-2">
                                    <li>
                                      <span className="font-bold">
                                        Legislative Branch
                                      </span>
                                      <ul className="list-disc list-inside ml-5 mt-1 text-sm">
                                        <li>Makes laws</li>
                                        <li>
                                          Consists of Congress (House and
                                          Senate)
                                        </li>
                                      </ul>
                                    </li>
                                    <li>
                                      <span className="font-bold">
                                        Executive Branch
                                      </span>
                                      <ul className="list-disc list-inside ml-5 mt-1 text-sm">
                                        <li>Enforces laws</li>
                                        <li>Led by the President</li>
                                      </ul>
                                    </li>
                                    <li>
                                      <span className="font-bold">
                                        Judicial Branch
                                      </span>
                                      <ul className="list-disc list-inside ml-5 mt-1 text-sm">
                                        <li>Interprets laws</li>
                                        <li>
                                          Supreme Court and federal courts
                                        </li>
                                      </ul>
                                    </li>
                                  </ol>
                                  <p className="mt-3 text-sm italic">
                                    <span className="bg-yellow-200 px-1">
                                      Key concept:
                                    </span>{" "}
                                    These branches provide a system of checks
                                    and balances.
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </motion.div>

                        <motion.div variants={item}>
                          <h3 className="text-xl font-medium mb-3">
                            Using Audio in Flashcards
                          </h3>
                          <div className="p-5 rounded-lg border border-gray-100 shadow-sm mb-6">
                            <div className="space-y-4">
                              <div>
                                <h4 className="font-medium mb-2">
                                  When to Use Audio
                                </h4>
                                <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                                  <li>
                                    Language learning (pronunciation practice)
                                  </li>
                                  <li>Music theory and ear training</li>
                                  <li>Speech and communication studies</li>
                                  <li>
                                    Sound identification (bird calls, musical
                                    instruments)
                                  </li>
                                </ul>
                              </div>

                              <div>
                                <h4 className="font-medium mb-2">
                                  Audio Best Practices
                                </h4>
                                <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                                  <li>Keep audio clips short and focused</li>
                                  <li>Ensure clear, high-quality recordings</li>
                                  <li>
                                    For language learning, include both native
                                    and slow pronunciations
                                  </li>
                                  <li>
                                    Add text transcriptions when appropriate
                                  </li>
                                </ul>
                              </div>

                              <div className="p-4 rounded-md border border-gray-200">
                                <h4 className="font-medium mb-3">
                                  Example: Language Learning Flashcard
                                </h4>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                  <div>
                                    <p className="font-medium mb-2">
                                      Front Side
                                    </p>
                                    <div className="p-3 rounded-md border border-gray-200">
                                      <p className="mb-2">
                                        How do you say "Thank you" in Japanese?
                                      </p>
                                      <button className="text-sm flex items-center">
                                        <svg
                                          xmlns="http://www.w3.org/2000/svg"
                                          width="16"
                                          height="16"
                                          viewBox="0 0 24 24"
                                          fill="none"
                                          stroke="currentColor"
                                          strokeWidth="2"
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                          className="mr-1"
                                        >
                                          <polygon points="5 3 19 12 5 21 5 3"></polygon>
                                        </svg>
                                        Play hint
                                      </button>
                                    </div>
                                  </div>
                                  <div>
                                    <p className="font-medium mb-2">
                                      Back Side
                                    </p>
                                    <div className="p-3 rounded-md border border-gray-200">
                                      <p className="font-medium mb-1">
                                        ありがとう
                                      </p>
                                      <p className="text-sm mb-2">
                                        Romanized: Arigatou
                                      </p>
                                      <div className="flex space-x-2">
                                        <button className="text-xs flex items-center">
                                          <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="14"
                                            height="14"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            className="mr-1"
                                          >
                                            <polygon points="5 3 19 12 5 21 5 3"></polygon>
                                          </svg>
                                          Native speed
                                        </button>
                                        <button className="text-xs flex items-center">
                                          <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="14"
                                            height="14"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            className="mr-1"
                                          >
                                            <polygon points="5 3 19 12 5 21 5 3"></polygon>
                                          </svg>
                                          Slow speed
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
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
                            The "dual coding theory" in cognitive psychology
                            suggests that combining verbal and visual
                            information enhances learning and memory. When
                            appropriate, try to include both text and visual
                            elements in your flashcards to create stronger
                            memory associations.
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
                            Organization Strategies
                          </h2>
                          <p className="text-muted-foreground mb-4">
                            Properly organizing your flashcards can
                            significantly improve your study efficiency and help
                            you manage large amounts of information. Good
                            organization makes it easier to find specific cards,
                            track your progress, and focus on what you need to
                            learn most.
                          </p>
                        </motion.div>

                        <motion.div variants={item}>
                          <h3 className="text-xl font-medium mb-3">
                            Creating Effective Study Sets
                          </h3>
                          <div className="p-5 rounded-lg border border-gray-100 shadow-sm mb-6">
                            <div className="space-y-4">
                              <div>
                                <h4 className="font-medium mb-2">
                                  Optimal Set Size
                                </h4>
                                <p className="text-sm text-muted-foreground mb-3">
                                  Research suggests that the ideal flashcard set
                                  size is between 20-50 cards. This range is:
                                </p>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                                  <div className="p-3 rounded-md">
                                    <p className="text-sm font-medium text-center">
                                      Small enough to be manageable
                                    </p>
                                  </div>
                                  <div className="p-3 rounded-md">
                                    <p className="text-sm font-medium text-center">
                                      Large enough to be worthwhile
                                    </p>
                                  </div>
                                  <div className="p-3 rounded-md">
                                    <p className="text-sm font-medium text-center">
                                      Completable in a single study session
                                    </p>
                                  </div>
                                </div>
                              </div>

                              <div>
                                <h4 className="font-medium mb-2">
                                  Organizing Principles
                                </h4>
                                <div className="space-y-3">
                                  {[
                                    {
                                      principle: "By Topic or Chapter",
                                      description:
                                        "Group cards based on textbook chapters or course topics",
                                      example:
                                        "Chapter 3: Cell Biology, Chapter 4: Genetics",
                                    },
                                    {
                                      principle: "By Concept",
                                      description:
                                        "Organize around key concepts or themes that may span multiple topics",
                                      example:
                                        "Photosynthesis, Cellular Respiration, DNA Replication",
                                    },
                                    {
                                      principle: "By Difficulty Level",
                                      description:
                                        "Separate cards based on how well you know the material",
                                      example: "Easy, Medium, Difficult",
                                    },
                                    {
                                      principle: "By Question Type",
                                      description:
                                        "Group similar types of questions together",
                                      example:
                                        "Definitions, Processes, Formulas, Diagrams",
                                    },
                                  ].map((item, index) => (
                                    <div
                                      key={index}
                                      className="p-3 rounded-md"
                                    >
                                      <h5 className="font-medium mb-1">
                                        {item.principle}
                                      </h5>
                                      <p className="text-sm text-muted-foreground mb-1">
                                        {item.description}
                                      </p>
                                      <p className="text-sm italic">
                                        Example: {item.example}
                                      </p>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </div>
                        </motion.div>

                        <motion.div variants={item}>
                          <h3 className="text-xl font-medium mb-3">
                            Tagging and Categorization
                          </h3>
                          <div className="p-5 rounded-lg border border-gray-100 shadow-sm mb-6">
                            <div className="space-y-4">
                              <div>
                                <h4 className="font-medium mb-2">
                                  Using Tags Effectively
                                </h4>
                                <p className="text-sm text-muted-foreground mb-3">
                                  Tags allow you to create flexible, overlapping
                                  categories for your flashcards. A single card
                                  can have multiple tags, making it easier to
                                  find and study related information.
                                </p>

                                <div className="p-4 rounded-md">
                                  <h5 className="font-medium mb-2">
                                    Example: Medical Student's Flashcard Tags
                                  </h5>
                                  <div className="flex flex-wrap gap-2 mb-3">
                                    <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                                      Anatomy
                                    </span>
                                    <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                                      Cardiovascular
                                    </span>
                                    <span className="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded-full">
                                      Pathology
                                    </span>
                                    <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full">
                                      Exam 2
                                    </span>
                                    <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full">
                                      Difficult
                                    </span>
                                  </div>
                                  <p className="text-sm italic">
                                    This card about heart disease is tagged with
                                    multiple categories, allowing the student to
                                    find it when studying any of these topics.
                                  </p>
                                </div>
                              </div>

                              <div>
                                <h4 className="font-medium mb-2">
                                  Tag Types to Consider
                                </h4>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                  {[
                                    {
                                      type: "Subject/Topic Tags",
                                      examples: [
                                        "Biology",
                                        "Chemistry",
                                        "History",
                                      ],
                                    },
                                    {
                                      type: "Concept Tags",
                                      examples: [
                                        "Equations",
                                        "Definitions",
                                        "Processes",
                                      ],
                                    },
                                    {
                                      type: "Difficulty Tags",
                                      examples: ["Easy", "Medium", "Hard"],
                                    },
                                    {
                                      type: "Progress Tags",
                                      examples: [
                                        "Mastered",
                                        "Learning",
                                        "Need Review",
                                      ],
                                    },
                                    {
                                      type: "Temporal Tags",
                                      examples: ["Exam 1", "Midterm", "Final"],
                                    },
                                    {
                                      type: "Custom Tags",
                                      examples: [
                                        "Frequently Missed",
                                        "Important",
                                        "Tricky",
                                      ],
                                    },
                                  ].map((tag, index) => (
                                    <div
                                      key={index}
                                      className="p-3 rounded-md"
                                    >
                                      <h5 className="font-medium mb-1">
                                        {tag.type}
                                      </h5>
                                      <div className="flex flex-wrap gap-1">
                                        {tag.examples.map((example, i) => (
                                          <span
                                            key={i}
                                            className="bg-forest/10 text-xs px-2 py-0.5 rounded-full"
                                          >
                                            {example}
                                          </span>
                                        ))}
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </div>
                        </motion.div>

                        <motion.div variants={item}>
                          <h3 className="text-xl font-medium mb-3">
                            Study Order and Sequencing
                          </h3>
                          <div className="p-5 rounded-lg border border-gray-100 shadow-sm mb-6">
                            <div className="space-y-4">
                              <div>
                                <h4 className="font-medium mb-2">
                                  Strategic Card Ordering
                                </h4>
                                <p className="text-sm text-muted-foreground mb-3">
                                  The order in which you study your flashcards
                                  can impact learning effectiveness. Consider
                                  these approaches:
                                </p>

                                <div className="space-y-3">
                                  {[
                                    {
                                      method: "Chronological Order",
                                      description:
                                        "For history or sequential processes, arrange cards in time order",
                                      bestFor:
                                        "Historical events, step-by-step procedures",
                                    },
                                    {
                                      method: "Conceptual Hierarchy",
                                      description:
                                        "Start with foundational concepts before moving to more complex ones",
                                      bestFor:
                                        "Math, sciences, and other cumulative subjects",
                                    },
                                    {
                                      method: "Spaced Repetition",
                                      description:
                                        "Review cards at increasing intervals based on how well you know them",
                                      bestFor:
                                        "Long-term retention of any subject",
                                    },
                                    {
                                      method: "Random Shuffling",
                                      description:
                                        "Mix up cards to prevent memorizing the sequence rather than the content",
                                      bestFor:
                                        "Testing yourself after initial learning",
                                    },
                                  ].map((method, index) => (
                                    <div
                                      key={index}
                                      className="p-3 rounded-md"
                                    >
                                      <h5 className="font-medium mb-1">
                                        {method.method}
                                      </h5>
                                      <p className="text-sm text-muted-foreground mb-1">
                                        {method.description}
                                      </p>
                                      <p className="text-sm">
                                        <span className="font-medium">
                                          Best for:
                                        </span>{" "}
                                        {method.bestFor}
                                      </p>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </div>
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
                            Create a "master deck" system where you have both
                            specialized, focused decks for initial learning and
                            comprehensive mixed decks for review. Start with the
                            focused decks to learn new material, then use the
                            mixed decks to maintain knowledge and prevent
                            forgetting.
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
                            Advanced Techniques
                          </h2>
                          <p className="text-muted-foreground mb-4">
                            Once you've mastered the basics of creating
                            effective flashcards, you can explore advanced
                            techniques to further enhance your learning. These
                            methods can help you tackle more complex subjects
                            and improve long-term retention.
                          </p>
                        </motion.div>

                        <motion.div variants={item}>
                          <h3 className="text-xl font-medium mb-3">
                            Cloze Deletion
                          </h3>
                          <div className="p-5 rounded-lg border border-gray-100 shadow-sm mb-6">
                            <div>
                              <p className="text-sm text-muted-foreground mb-4">
                                Cloze deletion is a technique where you remove
                                key words or phrases from a sentence and prompt
                                yourself to fill in the blanks. This is
                                particularly effective for learning definitions,
                                formulas, and processes in context.
                              </p>

                              <div className="p-4 rounded-md mb-4">
                                <h4 className="font-medium mb-2">
                                  How to Create Cloze Deletions
                                </h4>
                                <div className="space-y-3">
                                  <div>
                                    <p className="text-sm font-medium mb-1">
                                      Original Sentence:
                                    </p>
                                    <p className="text-sm p-2 rounded border border-gray-200">
                                      The mitochondria is the powerhouse of the
                                      cell and is responsible for producing ATP
                                      through cellular respiration.
                                    </p>
                                  </div>
                                  <div>
                                    <p className="text-sm font-medium mb-1">
                                      Cloze Deletion Cards:
                                    </p>
                                    <div className="space-y-2">
                                      <p className="text-sm p-2 rounded border border-gray-200">
                                        The [...] is the powerhouse of the cell
                                        and is responsible for producing ATP
                                        through cellular respiration.
                                      </p>
                                      <p className="text-sm p-2 rounded border border-gray-200">
                                        The mitochondria is the powerhouse of
                                        the cell and is responsible for
                                        producing [...] through cellular
                                        respiration.
                                      </p>
                                      <p className="text-sm p-2 rounded border border-gray-200">
                                        The mitochondria is the powerhouse of
                                        the cell and is responsible for
                                        producing ATP through [...].
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              </div>

                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                  <h4 className="font-medium mb-2">
                                    Benefits of Cloze Deletion
                                  </h4>
                                  <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                                    <li>Tests recall in context</li>
                                    <li>
                                      Creates multiple cards from a single
                                      sentence
                                    </li>
                                    <li>
                                      Helps understand relationships between
                                      concepts
                                    </li>
                                    <li>
                                      Particularly effective for memorizing
                                      sequences
                                    </li>
                                    <li>
                                      Reduces the time needed to create cards
                                    </li>
                                  </ul>
                                </div>
                                <div>
                                  <h4 className="font-medium mb-2">
                                    Best Subjects for Cloze Deletion
                                  </h4>
                                  <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                                    <li>Medical and scientific terminology</li>
                                    <li>Mathematical formulas and equations</li>
                                    <li>Historical sequences and timelines</li>
                                    <li>Legal principles and definitions</li>
                                    <li>
                                      Language grammar rules and structures
                                    </li>
                                  </ul>
                                </div>
                              </div>
                            </div>
                          </div>
                        </motion.div>

                        <motion.div variants={item}>
                          <h3 className="text-xl font-medium mb-3">
                            Mnemonic Techniques
                          </h3>
                          <div className="p-5 rounded-lg border border-gray-100 shadow-sm mb-6">
                            <div className="space-y-4">
                              <p className="text-sm text-muted-foreground">
                                Mnemonics are memory aids that help you remember
                                complex information through associations,
                                visualizations, and patterns. Incorporating
                                mnemonics into your flashcards can make
                                difficult material easier to recall.
                              </p>

                              <div className="space-y-4">
                                {[
                                  {
                                    technique: "Acronyms",
                                    description:
                                      "Create a word from the first letters of a list of items",
                                    example:
                                      "ROYGBIV for the colors of the rainbow (Red, Orange, Yellow, Green, Blue, Indigo, Violet)",
                                  },
                                  {
                                    technique: "Acrostics",
                                    description:
                                      "Create a sentence where the first letter of each word represents information you need to remember",
                                    example:
                                      "Every Good Boy Does Fine (for the lines of the treble clef: E, G, B, D, F)",
                                  },
                                  {
                                    technique: "Method of Loci (Memory Palace)",
                                    description:
                                      "Associate information with specific locations in a familiar place",
                                    example:
                                      "Imagine walking through your home, placing items you need to remember in specific locations",
                                  },
                                  {
                                    technique: "Chunking",
                                    description:
                                      "Group individual pieces of information into larger units",
                                    example:
                                      "Remembering the phone number 8005551234 as 800-555-1234",
                                  },
                                  {
                                    technique: "Visualization",
                                    description:
                                      "Create vivid mental images that represent abstract concepts",
                                    example:
                                      "Visualizing antibodies as tiny Y-shaped soldiers attacking bacteria",
                                  },
                                ].map((technique, index) => (
                                  <div
                                    key={index}
                                    className="p-3 rounded-md"
                                  >
                                    <h4 className="font-medium mb-1">
                                      {technique.technique}
                                    </h4>
                                    <p className="text-sm text-muted-foreground mb-1">
                                      {technique.description}
                                    </p>
                                    <p className="text-sm italic">
                                      Example: {technique.example}
                                    </p>
                                  </div>
                                ))}
                              </div>

                              <div className="bg-forest/5 p-3 rounded-md">
                                <h4 className="font-medium mb-1">
                                  Adding Mnemonics to Flashcards
                                </h4>
                                <p className="text-sm text-muted-foreground mb-2">
                                  Include your mnemonic devices on the answer
                                  side of your flashcards to reinforce these
                                  memory associations. For example:
                                </p>
                                <div className="p-3 rounded border border-gray-200">
                                  <p className="font-medium mb-1">
                                    Q: List the cranial nerves in order (I-XII)
                                  </p>
                                  <div className="text-sm">
                                    <p className="mb-2">
                                      A: I. Olfactory, II. Optic, III.
                                      Oculomotor, IV. Trochlear, V. Trigeminal,
                                      VI. Abducens, VII. Facial, VIII.
                                      Vestibulocochlear, IX. Glossopharyngeal,
                                      X. Vagus, XI. Accessory, XII. Hypoglossal
                                    </p>
                                    <p className="italic border-t pt-2">
                                      <span className="font-medium">
                                        Mnemonic:
                                      </span>{" "}
                                      "Oh, Oh, Oh, To Touch And Feel Very Green
                                      Vegetables AH!" (First letter of each
                                      cranial nerve)
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </motion.div>

                        <motion.div variants={item}>
                          <h3 className="text-xl font-medium mb-3">
                            Interleaving and Varied Practice
                          </h3>
                          <div className="p-5 rounded-lg border border-gray-100 shadow-sm mb-6">
                            <div className="space-y-4">
                              <p className="text-sm text-muted-foreground">
                                Interleaving is the practice of mixing different
                                topics or types of problems within a study
                                session, rather than focusing on one topic at a
                                time (known as "blocking"). Research shows that
                                interleaving leads to better long-term retention
                                and transfer of knowledge.
                              </p>

                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                <div className="p-3 rounded-md">
                                  <h4 className="font-medium mb-2">
                                    Blocking (Less Effective)
                                  </h4>
                                  <div className="space-y-2">
                                    <div className="bg-blue-100 p-2 rounded">
                                      Study all Spanish verb conjugations
                                    </div>
                                    <div className="bg-green-100 p-2 rounded">
                                      Then study all Spanish nouns
                                    </div>
                                    <div className="bg-purple-100 p-2 rounded">
                                      Then study all Spanish adjectives
                                    </div>
                                  </div>
                                </div>
                                <div className="p-3 rounded-md">
                                  <h4 className="font-medium mb-2">
                                    Interleaving (More Effective)
                                  </h4>
                                  <div className="space-y-2">
                                    <div className="bg-blue-100 p-2 rounded">
                                      Study some verb conjugations
                                    </div>
                                    <div className="bg-green-100 p-2 rounded">
                                      Switch to some nouns
                                    </div>
                                    <div className="bg-purple-100 p-2 rounded">
                                      Switch to some adjectives
                                    </div>
                                    <div className="bg-blue-100 p-2 rounded">
                                      Back to different verb conjugations
                                    </div>
                                  </div>
                                </div>
                              </div>

                              <div>
                                <h4 className="font-medium mb-2">
                                  How to Implement Interleaving with Flashcards
                                </h4>
                                <ol className="list-decimal list-inside space-y-2 text-sm text-muted-foreground">
                                  <li>
                                    Create separate sets for different topics or
                                    concepts
                                  </li>
                                  <li>
                                    During study sessions, alternate between
                                    these different sets
                                  </li>
                                  <li>
                                    Use the "shuffle" feature to mix cards from
                                    different categories
                                  </li>
                                  <li>
                                    Create mixed review sets that contain cards
                                    from multiple topics
                                  </li>
                                  <li>
                                    Gradually increase the variety of topics you
                                    study in a single session
                                  </li>
                                </ol>
                              </div>

                              <div className="bg-forest/5 p-3 rounded-md">
                                <h4 className="font-medium mb-1">
                                  Example Study Plan with Interleaving
                                </h4>
                                <p className="text-sm text-muted-foreground mb-2">
                                  For a biology student studying for a
                                  comprehensive exam:
                                </p>
                                <div className="space-y-2 text-sm">
                                  <div className="flex items-center">
                                    <div className="w-24 font-medium">
                                      Day 1:
                                    </div>
                                    <div>
                                      20 min Cell Biology → 20 min Genetics → 20
                                      min Ecology
                                    </div>
                                  </div>
                                  <div className="flex items-center">
                                    <div className="w-24 font-medium">
                                      Day 2:
                                    </div>
                                    <div>
                                      20 min Genetics → 20 min Ecology → 20 min
                                      Cell Biology
                                    </div>
                                  </div>
                                  <div className="flex items-center">
                                    <div className="w-24 font-medium">
                                      Day 3:
                                    </div>
                                    <div>
                                      20 min Ecology → 20 min Cell Biology → 20
                                      min Genetics
                                    </div>
                                  </div>
                                  <div className="flex items-center">
                                    <div className="w-24 font-medium">
                                      Day 4:
                                    </div>
                                    <div>
                                      Mixed review of all topics, focusing on
                                      challenging cards
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
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
                            Combine these advanced techniques for maximum
                            effectiveness. For example, create cloze deletion
                            cards with mnemonic hints, and study them using
                            interleaving. The more active and varied your
                            engagement with the material, the stronger your
                            memory and understanding will be.
                          </p>
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
