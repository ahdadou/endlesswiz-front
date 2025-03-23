// "use client"

// import { useState } from "react"
// import Link from "next/link"
// import { ChevronLeft, Brain, CheckCircle, HelpCircle, Lightbulb, Clock } from "lucide-react"
// import { Card, CardContent } from "@/components/ui/card"
// import { Progress } from "@/components/ui/progress"
// import { Tabs, TabsContent } from "@/components/ui/tabs"
// import DashboardSidebar from "@/components/dashboard-sidebar"
// import { motion } from "framer-motion"

// export default function StudyTechniquesGuidePage() {
//   const [activeStep, setActiveStep] = useState(1)
//   const [progress, setProgress] = useState(0)
//   const totalSteps = 5

//   const handleStepChange = (step: number) => {
//     setActiveStep(step)
//     setProgress(((step - 1) / (totalSteps - 1)) * 100)
//   }

//   const container = {
//     hidden: { opacity: 0 },
//     show: {
//       opacity: 1,
//       transition: {
//         staggerChildren: 0.1,
//       },
//     },
//   }

//   const item = {
//     hidden: { opacity: 0, y: 20 },
//     show: { opacity: 1, y: 0 },
//   }

//   return (
//     <div className="min-h-screen ">
//       <div className="flex">
//         <DashboardSidebar />

//         <div className="flex-1 p-8">
//           <motion.div
//             initial={{ opacity: 0, y: -20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.3 }}
//             className="mb-8 flex items-center justify-between"
//           >
//             <div>
//               <Link href="/help-support" className="inline-flex items-center hover:text-forest-700 mb-2">
//                 <ChevronLeft className="h-4 w-4 mr-1" />
//                 Back to Help & Support
//               </Link>
//               <h1 className="text-3xl font-bold ">Study Techniques</h1>
//               <p className="text-muted-foreground">Learn about different study methods and how to use them effectively</p>
//             </div>
//             <div className="flex items-center gap-2">
//               <span className="text-sm text-muted-foreground">Progress:</span>
//               <Progress value={progress} className="w-40 h-2" />
//               <span className="text-sm font-medium">{Math.round(progress)}%</span>
//             </div>
//           </motion.div>

//           <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
//             <motion.div
//               initial={{ opacity: 0, x: -20 }}
//               animate={{ opacity: 1, x: 0 }}
//               transition={{ duration: 0.3, delay: 0.1 }}
//               className="md:col-span-1"
//             >
//               <div className="rounded-lg shadow-sm p-4 sticky top-8">
//                 <h3 className="font-medium mb-4 flex items-center">
//                   <Brain className="h-5 w-5 mr-2" />
//                   Guide Contents
//                 </h3>
//                 <nav className="space-y-1">
//                   {[
//                     { step: 1, title: "The Science of Learning" },
//                     { step: 2, title: "Active Recall" },
//                     { step: 3, title: "Spaced Repetition" },
//                     { step: 4, title: "Study Schedules" },
//                     { step: 5, title: "Advanced Techniques" },
//                   ].map((step) => (
//                     <button
//                       key={step.step}
//                       onClick={() => handleStepChange(step.step)}
//                       className={`w-full text-left px-3 py-2 rounded-md flex items-center text-sm ${
//                         activeStep === step.step
//                           ? "bg-forest text-white font-medium"
//                           : "hover:bg-gray-100"
//                       }`}
//                     >
//                       <div
//                         className={`h-5 w-5 mr-2 rounded-full flex items-center justify-center text-xs ${
//                           activeStep > step.step
//                             ? "bg-green-500 text-white"
//                             : activeStep === step.step
//                             ? ""
//                             : "bg-gray-200 text-gray-600"
//                         }`}
//                       >
//                         {activeStep > step.step ? (
//                           <CheckCircle className="h-5 w-5" />
//                         ) : (
//                           step.step
//                         )}
//                       </div>
//                       {step.title}
//                     </button>
//                   ))}
//                 </nav>
//               </div>
//             </motion.div>

//             <motion.div
//               variants={container}
//               initial="hidden"
//               animate="show"
//               className="md:col-span-3"
//             >
//               <Card className="border-forest-100 shadow-sm">
//                 <CardContent className="p-6">
//                   <Tabs value={`step-${activeStep}`} className="w-full">
//                     <TabsContent value="step-1" className="mt-0">
//                       <motion.div variants={container} initial="hidden" animate="show" className="space-y-6">
//                         <motion.div variants={item}>
//                           <h2 className="text-2xl font-bold mb-4">The Science of Learning</h2>
//                           <p className="text-muted-foreground mb-4">
//                             Understanding how your brain learns and retains information is the first step to becoming a more effective learner. Modern cognitive science has revealed key principles that can dramatically improve your study efficiency.
//                           </p>
//                         </motion.div>

//                         <motion.div variants={item}>
//                           <h3 className="text-xl font-medium mb-3">How Memory Works</h3>
//                           <div className="p-5 rounded-lg border border-gray-100 shadow-sm mb-6">
//                             <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
//                               <div className="p-4 rounded-lg">
//                                 <h4 className="font-medium mb-2 text-center">Encoding</h4>
//                                 <p className="text-sm text-center">The process of converting information into a form your brain can store</p>
//                                 <div className="flex justify-center mt-3">
//                                   <div className="bg-forest/10 rounded-full p-3">
//                                     <Brain className="h-8 w-8 " />
//                                   </div>
//                                 </div>
//                               </div>
//                               <div className="p-4 rounded-lg">
//                                 <h4 className="font-medium mb-2 text-center">Storage</h4>
//                                 <p className="text-sm text-center">Maintaining encoded information over time in short and long-term memory</p>
//                                 <div className="flex justify-center mt-3">
//                                   <div className="bg-forest/10 rounded-full p-3">
//                                     <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="">
//                                       <path d="M21 8V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v3"></path>
//                                       <path d="M21 16v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-3"></path>
//                                       <path d="M4 12h16"></path>
//                                     </svg>
//                                   </div>
//                                 </div>
//                               </div>
//                               <div className="p-4 rounded-lg">
//                                 <h4 className="font-medium mb-2 text-center">Retrieval</h4>
//                                 <p className="text-sm text-center">Accessing stored information when needed</p>
//                                 <div className="flex justify-center mt-3">
//                                   <div className="bg-forest/10 rounded-full p-3">
//                                     <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="">
//                                       <circle cx="11" cy="11" r="8"></circle>
//                                       <path d="m21 21-4.3-4.3"></path>
//                                     </svg>
//                                   </div>
//                                 </div>
//                               </div>
//                             </div>

//                             <div className="space-y-4">
//                               <div>
//                                 <h4 className="font-medium mb-2">The Forgetting Curve</h4>
//                                 <p className="text-sm text-muted-foreground mb-3">
//                                   In the 1880s, Hermann Ebbinghaus discovered that memory retention declines over time when there is no attempt to retain it. This decline follows a predictable pattern known as the "forgetting curve."
//                                 </p>
//                                 <div className="p-4 rounded-lg flex items-center justify-center">
//                                   <img
//                                     src="/placeholder.svg?height=200&width=400"
//                                     alt="Ebbinghaus Forgetting Curve"
//                                     className="max-w-full h-auto"
//                                   />
//                                 </div>
//                                 <p className="text-sm text-muted-foreground mt-3">
//                                   Without reinforcement, we forget approximately:
//                                 </p>
//                                 <ul className="list-disc list-inside text-sm text-muted-foreground mt-2 space-y-1">
//                                   <li>50% of new information within 20 minutes</li>
//                                   <li>70% within 24 hours</li>
//                                   <li>90% within a week</li>
//                                 </ul>
//                               </div>

//                               <div>
//                                 <h4 className="font-medium mb-2">Combating the Forgetting Curve</h4>
//                                 <p className="text-sm text-muted-foreground mb-3">
//                                   The good news is that we can "reset" the forgetting curve through strategic review, making the memory more durable each time. This is the foundation of effective study techniques.
//                                 </p>
//                                 <div className="p-4 rounded-lg flex items-center justify-center">
//                                   <img
//                                     src="/placeholder.svg?height=200&width=400"
//                                     alt="Combating the Forgetting Curve with Spaced Repetition"
//                                     className="max-w-full h-auto"
//                                   />
//                                 </div>
//                               </div>
//                             </div>
//                           </div>
//                         </motion.div>

//                         <motion.div variants={item}>
//                           <h3 className="text-xl font-medium mb-3">Learning Principles</h3>
//                           <div className="space-y-4 mb-6">
//                             {[
//                               {
//                                 principle: "Active vs. Passive Learning",
//                                 description: "Active learning (testing yourself, solving problems) is far more effective than passive learning (reading, highlighting, re-watching videos).",
//                                 icon: <Lightbulb className="h-8 w-8 text-amber-500" />,
//                               },
//                               {
//                                 principle: "Distributed Practice",
//                                 description: "Spreading out study sessions over time is more effective than cramming, even if the total study time is the same.",
//                                 icon: <Clock className="h-8 w-8 text-amber-500" />,
//                               },
//                               {
//                                 principle: "Interleaving",
//                                 description: "Mixing different topics or problem types in a study session leads to better long-term retention than studying one topic at a time.",
//                                 icon: <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-amber-500">
//                                   <path d="M18 8L22 12L18 16"></path>
//                                   <path d="M2 12H22"></path>
//                                   <path d="M6 16L2 12L6 8"></path>
//                                 </svg>,
//                               },
//                               {
//                                 principle: "Elaboration",
//                                 description: "Explaining concepts in your own words and connecting them to what you already know enhances understanding and retention.",
//                                 icon: <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-amber-500">
//                                   <circle cx="12" cy="12" r="10"></circle>
//                                   <path d="M12 16v-4"></path>
//                                   <path d="M12 8h.01"></path>
//                                 </svg>,
//                               },
//                             ].map((principle, index) => (
//                               <div key={index} className="p-4 rounded-lg border border-gray-100 shadow-sm">
//                                 <div className="flex items-start gap-3">
//                                   <div className="rounded-full bg-amber-100 p-2 flex-shrink-0">{principle.icon}</div>
//                                   <div>
//                                     <h4 className="font-medium mb-1">{principle.principle}</h4>
//                                     <p className="text-sm text-muted-foreground">{principle.description}</p>
//                                   </div>
//                                 </div>
//                               </div>
//                             ))}
//                           </div>
//                         </motion.div>

//                         <motion.div variants={item}>
//                           <h3 className="text-xl font-medium mb-3">The Role of Sleep and Physical Health</h3>
//                           <div className="p-5 rounded-lg border border-gray-100 shadow-sm mb-6">
//                             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                               <div>
//                                 <h4 className="font-medium mb-2">Sleep and Memory Consolidation</h4>
//                                 <p className="text-sm text-muted-foreground mb-3">
//                                   Sleep plays a crucial role in memory consolidation—the process of transferring information from short-term to long-term memory.
//                                 </p>
//                                 <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
//                                   <li>During deep sleep, your brain strengthens neural connections formed during learning</li>
//                                   <li>REM sleep helps integrate new information with existing knowledge</li>
//                                   <li>A single night of poor sleep can reduce learning ability by up to 40%</li>
//                                   <li>Studying right before sleep can improve retention</li>
//                                 </ul>
//                               </div>
//                               <div>
//                                 <h4 className="font-medium mb-2">Physical Factors Affecting Learning</h4>
//                                 <div className="space-y-3">
//                                   <div className="p-3 rounded-md">
//                                     <p className="font-medium mb-1">Exercise</p>
//                                     <p className="text-sm text-muted-foreground">
//                                       Regular physical activity increases blood flow to the brain, promotes the growth of new neurons, and improves cognitive function.
//                                     </p>
//                                   </div>
//                                   <div className="p-3 rounded-md">
//                                     <p className="font-medium mb-1">Nutrition</p>
//                                     <p className="text-sm text-muted-foreground">
//                                       Your brain consumes about 20% of your body's energy. Foods rich in omega-3 fatty acids, antioxidants, and complex carbohydrates support optimal brain function.
//                                     </p>
//                                   </div>
//                                   <div className="p-3 rounded-md">
//                                     <p className="font-medium mb-1">Hydration</p>
//                                     <p className="text-sm text-muted-foreground">
//                                       Even mild dehydration can impair attention, working memory, and physical performance. Aim to drink water consistently throughout the day.
//                                     </p>
//                                   </div>
//                                 </div>
//                               </div>
//                             </div>
//                           </div>
//                         </motion.div>

//                         <motion.div variants={item} className="bg-forest/5 p-4 rounded-lg border border-forest/10">
//                           <h3 className="flex items-center font-medium mb-2">
//                             <HelpCircle className="h-5 w-5 mr-2" />
//                             Did You Know?
//                           </h3>
//                           <p className="text-sm text-muted-foreground">
//                             The "generation effect" is a phenomenon where information is better remembered if it's generated from your own mind rather than simply read. This is why flashcards, practice tests, and problem-solving are so effective—they force you to generate the answer from memory rather than recognize it.
//                           </p>
//                         </motion.div>
//                       </motion.div>
//                     </TabsContent>

//                     <TabsContent value="step-2" className="mt-0">
//                       <motion.div variants={container} initial="hidden" animate="show" className="space-y-6">
//                         <motion.div variants={item}>
//                           <h2 className="text-2xl font-bold mb-4">Active Recall</h2>
//                           <p className="text-muted-foreground mb-4">
//                             Active recall is the practice of actively stimulating memory during the learning process. Rather than passively reviewing information, you test yourself by trying to recall specific facts or concepts from memory. This technique is one of the most powerful learning strategies backed by cognitive science.
//                           </p>
//                         </motion.div>

//                         <motion.div variants={item}>
//                           <h3 className="text-xl font-medium mb-3">Why Active Recall Works</h3>
//                           <div className="p-5 rounded-lg border border-gray-100 shadow-sm mb-6">
//                             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                               <div>
//                                 <h4 className="font-medium mb-2">The Science Behind It</h4>
//                                 <p className="text-sm text-muted-foreground mb-3">
//                                   When you attempt to recall information, you're:
//                                 </p>
//                                 <ul className="list-disc list-inside text-sm text-muted-foreground space-y-2">
//                                   <li>Strengthening neural pathways associated with that memory</li>
//                                   <li>Creating additional retrieval routes to access the information</li>
//                                   <li>Identifying knowledge gaps that need more attention</li>
//                                   <li>Practicing the exact skill you'll need during tests or real-world application</li>
//                                 </ul>
//                               </div>
//                               <div>
//                                 <h4 className="font-medium mb-2">Research Evidence</h4>
//                                 <div className="space-y-3">
//                                   <div className="p-3 rounded-md">
//                                     <p className="text-sm text-muted-foreground">
//                                       A 2013 study found that students who used active recall scored 50% better on exams than those who used passive study methods.
//                                     </p>
//                                   </div>
//                                   <div className="p-3 rounded-md">
//                                     <p className="text-sm text-muted-foreground">
//                                       Another study showed that testing yourself just once improves long-term retention more than rereading material multiple times.
//                                     </p>
//                                   </div>
//                                   <div className="p-3 rounded-md">
//                                     <p className="text-sm text-muted-foreground">
//                                       Even when students get answers wrong during practice, the act of attempting recall improves future performance.
//                                     </p>
//                                   </div>
//                                 </div>
//                               </div>
//                             </div>
//                           </div>
//                         </motion.div>

//                         <motion.div variants={item}>
//                           <h3 className="text-xl font-medium mb-3">Active Recall Techniques</h3>
//                           <div className="space-y-4 mb-6">
//                             {[
//                               {
//                                 technique: "Flashcards",
//                                 description: "The classic active recall tool. Look at the question/term side and try to recall the answer before flipping.",
//                                 howTo: [
//                                   "Create cards with questions on one side and answers on the other",
//                                   "Look at the question and attempt to recall the answer completely before checking",
//                                   "Sort cards into piles based on how well you know them",
//                                   "Focus more time on difficult cards"
//                                 ],
//                                 bestFor: "Vocabulary, definitions, formulas, facts, foreign language"
//                               },
//                               {
//                                 technique: "Practice Testing",
//                                 description: "Create or find practice questions and answer them without looking at your notes.",
//                                 howTo: [
//                                   "Use end-of-chapter questions in textbooks",
//                                   "Create your own questions based on lecture notes",
//                                   "Find practice exams or question banks online",
//                                   "Time yourself to simulate exam conditions"
//                                 ],
//                                 bestFor: "Exam preparation, complex problem-solving, application of concepts"
//                               },
//                               {
//                                 technique: "The Feynman Technique",
//                                 description: "Explain a concept in simple terms as if teaching it to someone else.",
//                                 howTo: [
//                                   "Choose a concept and write its name at the top of a page",
//                                   "Explain the concept in simple language as if teaching a child",
//                                   "Identify gaps in your explanation where you struggle",
//                                   "Review your source material to fill those gaps",
//                                   "Simplify and use analogies to strengthen your explanation"
//                                 ],
//                                 bestFor: "Complex concepts, theoretical knowledge, deep understanding"
//                               },
//                               {
//                                 technique: "Blank Page Method",
//                                 description: "Start with a blank page and write down everything you can remember about a topic.",
//                                 howTo: [
//                                   "Choose a specific topic or chapter",
//                                   "Without looking at your notes, write down everything you can recall",
//                                   "Use mind maps, bullet points, or paragraphs—whatever works for you",
//                                   "Check your notes afterward to identify what you missed",
//                                   "Focus your next study session on the gaps"
//                                 ],
//                                 bestFor: "Comprehensive topic review, identifying knowledge gaps"
//                               },
//                             ].map((technique, index) => (
//                               <div key={index} className="p-4 rounded-lg border border-gray-100 shadow-sm">
//                                 <h4 className="font-medium mb-2">{technique.technique}</h4>
//                                 <p className="text-sm text-muted-foreground mb-3">{technique.description}</p>
//                                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                                   <div>
//                                     <p className="text-sm font-medium mb-1">How to use it:</p>
//                                     <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
//                                       {technique.howTo.map((step, i) => (
//                                         <li key={i}>{step}</li>
//                                       ))}
//                                     </ul>
//                                   </div>
//                                   <div>
//                                     <p className="text-sm font-medium mb-1">Best for:</p>
//                                     <p className="text-sm text-muted-foreground">{technique.bestFor}</p>
//                                   </div>
//                                 </div>
//                               </div>
//                             ))}
//                           </div>
//                         </motion.div>

//                         <motion.div variants={item}>
//                           <h3 className="text-xl font-medium mb-3">Common Mistakes to Avoid</h3>
//                           <div className="p-5 rounded-lg border border-gray-100 shadow-sm mb-6">
//                             <div className="space-y-3">
//                               {[
//                                 {
//                                   mistake: "Confusing Recognition with Recall",
//                                   explanation: "Reading your notes and thinking 'I know this' is recognition, not recall. You need to actively retrieve information without seeing it first.",
//                                   solution: "Close your notes before testing yourself. Don't peek at the answer until you've made a genuine attempt to recall it."
//                                 },
//                                 {
//                                   mistake: "Giving Up Too Quickly",
//                                   explanation: "Many students check the answer too soon when they can't immediately recall something.",
//                                   solution: "Push yourself to think for at least 30 seconds before checking. The effort of trying to remember strengthens neural pathways even if you don't succeed."
//                                 },
//                                 {
//                                   mistake: "Not Reviewing Missed Items",
//                                   explanation: "Skipping over items you got wrong without proper review.",
//                                   solution: "Create a dedicated pile or list of items you missed and review them more frequently. Try to understand why you missed them."
//                                 },
//                                 {
//                                   mistake: "Using Only One Type of Question",
//                                   explanation: "Testing yourself with the same question format repeatedly.",
//                                   solution: "Vary your question formats (multiple choice, short answer, application problems) to build flexible knowledge."
//                                 },
//                               ].map((item, index) => (
//                                 <div key={index} className="p-3 rounded-md">
//                                   <h4 className="font-medium mb-1">{item.mistake}</h4>
//                                   <p className="text-sm text-muted-foreground mb-2">{item.explanation}</p>
//                                   <p className="text-sm">
//                                     <span className="font-medium">Solution:</span> {item.solution}
//                                   </p>
//                                 </div>
//                               ))}
//                             </div>
//                           </div>
//                         </motion.div>

//                         <motion.div variants={item} className="bg-forest/5 p-4 rounded-lg border border-forest/10">
//                           <h3 className="flex items-center font-medium mb-2">
//                             <HelpCircle className="h-5 w-5 mr-2" />
//                             Pro Tip
//                           </h3>
//                           <p className="text-sm text-muted-foreground">
//                             The "pretesting effect" shows that testing yourself on material you haven't yet learned can actually improve later learning. Before starting a new chapter or topic, try to answer questions about it based on what you might already know or can logically deduce. This creates "knowledge gaps" that your brain will naturally want to fill when you encounter the actual information.
//                           </p>
//                         </motion.div>
//                       </motion.div>
//                     </TabsContent>

//                     <TabsContent value="step-3" className="mt-0">
//                       <motion.div variants={container} initial="hidden" animate="show" className="space-y-6">
//                         <motion.div variants={item}>
//                           <h2 className="text-2xl font-bold mb-4">Spaced Repetition</h2>
//                           <p className="text-muted-foreground mb-4">
//                             Spaced repetition is a learning technique that involves reviewing information at increasing intervals over time. This method takes advantage of the psychological spacing effect, which demonstrates that we learn more effectively when we space out our learning over time rather than cramming.
//                           </p>
//                         </motion.div>

//                         <motion.div variants={item}>
//                           <h3 className="text-xl font-medium mb-3">How Spaced Repetition Works</h3>
//                           <div className="p-5 rounded-lg border border-gray-100 shadow-sm mb-6">
//                             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                               <div>
//                                 <h4 className="font-medium mb-2">The Basic Principle</h4>
//                                 <p className="text-sm text-muted-foreground mb-3">
//                                   Spaced repetition follows a simple principle: review information just as you're about to forget it. This creates an optimal level of challenge that strengthens memory.
//                                 </p>
//                                 <div className="p-3 rounded-md">
//                                   <p className="text-sm text-muted-foreground">
//                                     Instead of reviewing at fixed intervals (like every day), you increase the intervals between reviews:
//                                   </p>
//                                   <ul className="list-disc list-inside text-sm text-muted-foreground mt-2 space-y-1">
//                                     <li>First review: 1 day after learning</li>
//                                     <li>Second review: 3 days later</li>
//                                     <li>Third review: 7 days later</li>
//                                     <li>Fourth review: 14 days later</li>
//                                     <li>And so on...</li>
//                                   </ul>
//                                 </div>
//                               </div>
//                               <div>
//                                 <h4 className="font-medium mb-2">Adaptive Intervals</h4>
//                                 <p className="text-sm text-muted-foreground mb-3">
//                                   Modern spaced repetition systems adapt to your performance. Items you find difficult appear more frequently, while well-known items appear less often.
//                                 </p>
//                                 <div className="p-3 rounded-md">
//                                   <p className="text-sm font-medium mb-1">How it adapts:</p>
//                                   <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
//                                     <li>If you recall an item easily, the next interval increases significantly</li>
//                                     <li>If you struggle but remember, the interval increases slightly</li>
//                                     <li>If you forget, the item returns to a shorter interval</li>
//                                   </ul>
//                                 </div>
//                               </div>
//                             </div>
//                           </div>
//                         </motion.div>

//                         <motion.div variants={item}>
//                           <h3 className="text-xl font-medium mb-3">Implementing Spaced Repetition</h3>
//                           <div className="space-y-4 mb-6">
//                             {[
//                               {
//                                 method: "Digital Flashcard Apps",
//                                 description: "Apps like Anki, Quizlet, and StudyCards use algorithms to schedule reviews optimally.",
//                                 tips: [
//                                   "Create small, focused flashcards with one concept per card",
//                                   "Use the app daily, even if just for 10-15 minutes",
//                                   "Trust the algorithm—review cards when they're scheduled, not before",
//                                   "Rate your recall honestly to help the algorithm adapt"
//                                 ],
//                                 bestFor: "Long-term learning projects, large volumes of information"
//                               },
//                               {
//                                 method: "The Leitner System",
//                                 description: "A physical flashcard system using multiple boxes to implement spaced repetition.",
//                                 tips: [
//                                   "Set up 3-5 boxes representing different review intervals",
//                                   "Start all cards in Box 1 (daily review)",
//                                   "If you get a card right, move it to the next box",
//                                   "If you get a card wrong, move it back to Box 1",
//                                   "Review Box 1 daily, Box 2 every 3 days, Box 3 weekly, etc."
//                                 ],
//                                 bestFor: "Tactile learners, those who prefer physical flashcards"
//                               },
//                               {
//                                 method: "Calendar Method",
//                                 description: "Schedule reviews on a calendar using increasing intervals.",
//                                 tips: [
//                                   "After learning new material, schedule reviews at 1, 3, 7, 14, and 30 days",
//                                   "Use calendar reminders or a study planner",
//                                   "Adjust future review dates based on how well you recall the information",
//                                   "Group related topics together for efficient review sessions"
//                                 ],
//                                 bestFor: "Self-directed learners, those with regular study schedules"
//                               },
//                               {
//                                 method: "Integrated with Note-Taking",
//                                 description: "Build spaced repetition directly into your notes with review prompts.",
//                                 tips: [
//                                   "When taking notes, include questions in the margins",
//                                   "Create a review schedule at the top of your notes",
//                                   "Use sticky notes or flags to mark sections for review",
//                                   "Cover up your notes and try to recall the information before reviewing"
//                                 ],
//                                 bestFor: "Note-takers, students with lecture or reading materials"
//                               },
//                             ].map((method, index) => (
//                               <div key={index} className="p-4 rounded-lg border border-gray-100 shadow-sm">
//                                 <h4 className="font-medium mb-2">{method.method}</h4>
//                                 <p className="text-sm text-muted-foreground mb-3">{method.description}</p>
//                                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                                   <div>
//                                     <p className="text-sm font-medium mb-1">Tips:</p>
//                                     <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
//                                       {method.tips.map((tip, i) => (
//                                         <li key={i}>{tip}</li>
//                                       ))}
//                                     </ul>
//                                   </div>
//                                   <div>
//                                     <p className="text-sm font-medium mb-1">Best for:</p>
//                                     <p className="text-sm text-muted-foreground">{method.bestFor}</p>
//                                   </div>
//                                 </div>
//                               </div>
//                             ))}
//                           </div>
//                         </motion.div>

//                         <motion.div variants={item}>
//                           <h3 className="text-xl font-medium mb-3">Optimizing Your Spaced Repetition Practice</h3>
//                           <div className="p-5 rounded-lg border border-gray-100 shadow-sm mb-6">
//                             <div className="space-y-4">
//                               <div>
//                                 <h4 className="font-medium mb-2">Best Practices</h4>
//                                 <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
//                                   <div className="p-3 rounded-md">
//                                     <p className="text-sm font-medium mb-1">Consistency is Key</p>
//                                     <p className="text-sm text-muted-foreground">
//                                       Daily review, even if brief, is more effective than occasional long sessions. Set a specific time each day for reviews.
//                                     </p>
//                                   </div>
//                                   <div className="p-3 rounded-md">
//                                     <p className="text-sm font-medium mb-1">Quality Over Quantity</p>
//                                     <p className="text-sm text-muted-foreground">
//                                       It's better to thoroughly learn 10 cards than to superficially review 50. Focus on understanding, not just memorization.
//                                     </p>
//                                   </div>
//                                   <div className="p-3 rounded-md">
//                                     <p className="text-sm font-medium mb-1">Combine with Active Recall</p>
//                                     <p className="text-sm text-muted-foreground">
//                                       Always try to recall the answer before checking. The effort of retrieval is what strengthens memory.
//                                     </p>
//                                   </div>
//                                   <div className="p-3 rounded-md">
//                                     <p className="text-sm font-medium mb-1">Manage Your Workload</p>
//                                     <p className="text-sm text-muted-foreground">
//                                       Introduce new material gradually. Aim for 10-20 new items per day to avoid overwhelming your review schedule.
//                                     </p>
//                                   </div>
//                                 </div>
//                               </div>

//                               <div>
//                                 <h4 className="font-medium mb-2">Troubleshooting Common Issues</h4>
//                                 <div className="space-y-3">
//                                   <div className="p-3 rounded-md">
//                                     <p className="text-sm font-medium mb-1">Problem: Review Backlog</p>
//                                     <p className="text-sm text-muted-foreground mb-1">
//                                       You've missed several days and now have hundreds of cards due.
//                                     </p>
//                                     <p className="text-sm">
//                                       <span className="font-medium">Solution:</span> Don't try to clear it all at once. Set a daily limit (50-100 cards) and chip away consistently. Temporarily reduce new cards until you're caught up.
//                                     </p>
//                                   </div>
//                                   <div className="p-3 rounded-md">
//                                     <p className="text-sm font-medium mb-1">Problem: Leeches</p>
//                                     <p className="text-sm text-muted-foreground mb-1">
//                                       Certain cards you consistently forget despite multiple reviews.
//                                     </p>
//                                     <p className="text-sm">
//                                       <span className="font-medium">Solution:</span> Rewrite these cards, break them into smaller pieces, or create mnemonics. Sometimes the problem is with the card, not your memory.
//                                     </p>
//                                   </div>
//                                   <div className="p-3 rounded-md">
//                                     <p className="text-sm font-medium mb-1">Problem: Boredom</p>
//                                     <p className="text-sm text-muted-foreground mb-1">
//                                       Repetitive reviewing becomes tedious and demotivating.
//                                     </p>
//                                     <p className="text-sm">
//                                       <span className="font-medium">Solution:</span> Gamify your practice, set small rewards, or try different review contexts (different locations, times of day). Mix in different subjects to keep things fresh.
//                                     </p>
//                                   </div>
//                                 </div>
//                               </div>
//                             </div>
//                           </div>
//                         </motion.div>

//                         <motion.div variants={item} className="bg-forest/5 p-4 rounded-lg border border-forest/10">
//                           <h3 className="flex items-center font-medium mb-2">
//                             <HelpCircle className="h-5 w-5 mr-2" />
//                             Pro Tip
//                           </h3>
//                           <p className="text-sm text-muted-foreground">
//                             The "20-minute rule" can enhance your spaced repetition practice. After learning new information, do your first review within 20 minutes. This initial review significantly increases the likelihood that the information will transfer to long-term memory. Then follow your normal spaced repetition schedule for subsequent reviews.
//                           </p>
//                         </motion.div>
//                       </motion.div>
//                     </TabsContent>

//                     <TabsContent value="step-4" className="mt-0">
//                       <motion.div variants={container} initial="hidden" animate="show" className="space-y-6">
//                         <motion.div variants={item}>
//                           <h2 className="text-2xl font-bold mb-4">Study Schedules</h2>
//                           <p className="text-muted-foreground mb-4">
//                             Creating an effective study schedule is crucial for consistent learning and long-term retention. A well-designed schedule helps you manage your time efficiently, maintain motivation, and ensure you're covering all necessary material.
//                           </p>
//                         </motion.div>

//                         <motion.div variants={item}>
//                           <h3 className="text-xl font-medium mb-3">Designing Your Study Schedule</h3>
//                           <div className="p-5 rounded-lg border border-gray-100 shadow-sm mb-6">
//                             <div className="space-y-4">
//                               <div>
//                                 <h4 className="font-medium mb-2">Key Principles</h4>
//                                 <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
//                                   <div className="p-3 rounded-md">
//                                     <p className="text-sm font-medium mb-1 text-center">Consistency</p>
//                                     <p className="text-sm text-muted-foreground text-center">
//                                       Regular, shorter sessions are more effective than occasional marathon sessions
//                                     </p>
//                                   </div>
//                                   <div className="p-3 rounded-md">
//                                     <p className="text-sm font-medium mb-1 text-center">Balance</p>
//                                     <p className="text-sm text-muted-foreground text-center">
//                                       Distribute time across subjects based on difficulty and importance
//                                     </p>
//                                   </div>
//                                   <div className="p-3 rounded-md">
//                                     <p className="text-sm font-medium mb-1 text-center">Flexibility</p>
//                                     <p className="text-sm text-muted-foreground text-center">
//                                       Allow for adjustments based on progress and unexpected events
//                                     </p>
//                                   </div>
//                                 </div>
//                               </div>

//                               <div>
//                                 <h4 className="font-medium mb-2">Steps to Create Your Schedule</h4>
//                                 <ol className="list-decimal list-inside space-y-3 text-sm text-muted-foreground">
//                                   <li className="p-3 rounded-md">
//                                     <span className="font-medium ">Assess your available time</span>
//                                     <p className="mt-1">
//                                       Track your activities for a week to identify available study blocks. Be realistic about your energy levels at different times of day.
//                                     </p>
//                                   </li>
//                                   <li className="p-3 rounded-md">
//                                     <span className="font-medium ">Identify your learning goals</span>
//                                     <p className="mt-1">
//                                       Break down what you need to learn into specific topics and subtopics. Prioritize based on importance, difficulty, and upcoming deadlines.
//                                     </p>
//                                   </li>
//                                   <li className="p-3 rounded-md">
//                                     <span className="font-medium ">Allocate time blocks</span>
//                                     <p className="mt-1">
//                                       Assign specific subjects to your available time slots. Match challenging subjects with your peak energy times. Aim for 25-50 minute focused sessions with short breaks.
//                                     </p>
//                                   </li>
//                                   <li className="p-3 rounded-md">
//                                     <span className="font-medium ">Build in review sessions</span>
//                                     <p className="mt-1">
//                                       Schedule regular review periods using spaced repetition principles. Include both short daily reviews and longer weekly consolidation sessions.
//                                     </p>
//                                   </li>
//                                   <li className="p-3 rounded-md">
//                                     <span className="font-medium ">Include buffer time</span>
//                                     <p className="mt-1">
//                                       Leave some unscheduled time for catching up, unexpected tasks, or deeper exploration of difficult concepts.
//                                     </p>
//                                   </li>
//                                 </ol>
//                               </div>
//                             </div>
//                           </div>
//                         </motion.div>

//                         <motion.div variants={item}>
//                           <h3 className="text-xl font-medium mb-3">Sample Study Schedule Templates</h3>
//                           <div className="space-y-4 mb-6">
//                             {[
//                               {
//                                 type: "Weekly Block Schedule",
//                                 description: "Divides your week into dedicated subject blocks with consistent daily review time.",
//                                 example: `
//                                   Monday: Math (2 hrs), History (1 hr), Daily Review (30 min)
//                                   Tuesday: Science (2 hrs), Language (1 hr), Daily Review (30 min)
//                                   Wednesday: Math (1 hr), History (2 hrs), Daily Review (30 min)
//                                   Thursday: Science (1 hr), Language (2 hrs), Daily Review (30 min)
//                                   Friday: Mixed Review (2 hrs), Weak Areas (1 hr), Daily Review (30 min)
//                                   Weekend: Flexible catch-up time, Weekly Comprehensive Review (2 hrs)
//                                 `,
//                                 bestFor: "Students with multiple subjects, balanced workload"
//                               },
//                               {
//                                 type: "Pomodoro Technique Schedule",
//                                 description: "Uses timed intervals (typically 25 minutes) of focused study followed by short breaks.",
//                                 example: `
//                                   Morning Session:
//                                   • 25 min Subject A → 5 min break
//                                   • 25 min Subject A → 5 min break
//                                   • 25 min Subject B → 5 min break
//                                   • 25 min Subject B → 15 min break

//                                   Afternoon Session:
//                                   • 25 min Subject C → 5 min break
//                                   • 25 min Subject C → 5 min break
//                                   • 25 min Review → 5 min break
//                                   • 25 min Review → Done
//                                 `,
//                                 bestFor: "Those who struggle with focus or procrastination"
//                               },
//                               {
//                                 type: "Spaced Repetition Schedule",
//                                 description: "Organizes review sessions at increasing intervals for optimal retention.",
//                                 example: `
//                                   Day 1: Learn new material (1 hr)
//                                   Day 2: Review Day 1 material (20 min) + New material (40 min)
//                                   Day 4: Review Day 1 material (15 min) + Day 2 material (20 min) + New material (25 min)
//                                   Day 8: Review Day 1 material (10 min) + Day 2 material (15 min) + Day 4 material (20 min) + New material (15 min)
//                                   Day 16: Comprehensive review of all previous material (1 hr)
//                                 `,
//                                 bestFor: "Long-term learning projects, exam preparation"
//                               },
//                               {
//                                 type: "Time-Block Method",
//                                 description: "Assigns specific time blocks for different activities throughout your day.",
//                                 example: `
//                                   6:00-7:00 AM: Morning review (flashcards while having breakfast)
//                                   9:00-10:30 AM: Deep work on most challenging subject
//                                   12:00-12:30 PM: Lunch break review (quick concepts)
//                                   2:00-3:30 PM: Second subject deep work
//                                   5:00-6:00 PM: Exercise break (listen to educational podcast)
//                                   8:00-9:00 PM: Light review and preparation for next day
//                                 `,
//                                 bestFor: "People with busy schedules, working professionals"
//                               },
//                             ].map((schedule, index) => (
//                               <div key={index} className="p-4 rounded-lg border border-gray-100 shadow-sm">
//                                 <h4 className="font-medium mb-2">{schedule.type}</h4>
//                                 <p className="text-sm text-muted-foreground mb-3">{schedule.description}</p>
//                                 <div className="p-3 rounded-md mb-3">
//                                   <p className="text-sm font-medium mb-1">Example:</p>
//                                   <pre className="text-xs text-muted-foreground whitespace-pre-line">{schedule.example}</pre>
//                                 </div>
//                                 <p className="text-sm">
//                                   <span className="font-medium">Best for:</span> {schedule.bestFor}
//                                 </p>
//                               </div>
//                             ))}
//                           </div>
//                         </motion.div>

//                         <motion.div variants={item}>
//                           <h3 className="text-xl font-medium mb-3">Maintaining Your Schedule</h3>
//                           <div className="p-5 rounded-lg border border-gray-100 shadow-sm mb-6">
//                             <div className="space-y-4">
//                               <div>
//                                 <h4 className="font-medium mb-2">Tracking and Adjusting</h4>
//                                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                                   <div className="space-y-3">
//                                     <div className="p-3 rounded-md">
//                                       <p className="text-sm font-medium mb-1">Track Your Progress</p>
//                                       <p className="text-sm text-muted-foreground">
//                                         Keep a study journal or use an app to record what you've covered and how well you understand it. Note areas where you're struggling.
//                                       </p>
//                                     </div>
//                                     <div className="p-3 rounded-md">
//                                       <p className="text-sm font-medium mb-1">Weekly Review</p>
//                                       <p className="text-sm text-muted-foreground">
//                                         Set aside time each week to evaluate your schedule's effectiveness. Are you covering everything? Are you retaining the information?
//                                       </p>
//                                     </div>
//                                   </div>
//                                   <div className="space-y-3">
//                                     <div className="p-3 rounded-md">
//                                       <p className="text-sm font-medium mb-1">Make Adjustments</p>
//                                       <p className="text-sm text-muted-foreground">
//                                         Don't be afraid to modify your schedule based on what's working. Increase time for challenging subjects or change study methods if needed.
//                                       </p>
//                                     </div>
//                                     <div className="p-3 rounded-md">
//                                       <p className="text-sm font-medium mb-1">Celebrate Milestones</p>
//                                       <p className="text-sm text-muted-foreground">
//                                         Acknowledge your progress and reward yourself for sticking to your schedule. This reinforces the habit and maintains motivation.
//                                       </p>
//                                     </div>
//                                   </div>
//                                 </div>
//                               </div>

//                               <div>
//                                 <h4 className="font-medium mb-2">Overcoming Common Challenges</h4>
//                                 <div className="space-y-3">
//                                   <div className="p-3 rounded-md">
//                                     <p className="text-sm font-medium mb-1">Problem: Procrastination</p>
//                                     <p className="text-sm">
//                                       <span className="font-medium">Solution:</span> Use the "5-minute rule"—commit to just 5 minutes of study. Once started, you'll often continue. Also, identify and eliminate distractions before starting.
//                                     </p>
//                                   </div>
//                                   <div className="p-3 rounded-md">
//                                     <p className="text-sm font-medium mb-1">Problem: Inconsistency</p>
//                                     <p className="text-sm">
//                                       <span className="font-medium">Solution:</span> Build study habits by linking sessions to existing routines (e.g., study after breakfast). Use habit-tracking apps to maintain a streak of consistent days.
//                                     </p>
//                                   </div>
//                                   <div className="p-3 rounded-md">
//                                     <p className="text-sm font-medium mb-1">Problem: Burnout</p>
//                                     <p className="text-sm">
//                                       <span className="font-medium">Solution:</span> Schedule regular breaks and days off. Vary your study methods and environments to keep things fresh. Ensure you're getting enough sleep and exercise.
//                                     </p>
//                                   </div>
//                                   <div className="p-3 rounded-md">
//                                     <p className="text-sm font-medium mb-1">Problem: Unexpected Disruptions</p>
//                                     <p className="text-sm">
//                                       <span className="font-medium">Solution:</span> Build buffer time into your schedule. Have a "minimum viable study plan" for days when time is limited—focus on high-priority items only.
//                                     </p>
//                                   </div>
//                                 </div>
//                               </div>
//                             </div>
//                           </div>
//                         </motion.div>

//                         <motion.div variants={item} className="bg-forest/5 p-4 rounded-lg border border-forest/10">
//                           <h3 className="flex items-center font-medium mb-2">
//                             <HelpCircle className="h-5 w-5 mr-2" />
//                             Pro Tip
//                           </h3>
//                           <p className="text-sm text-muted-foreground">
//                             The "timeboxing" technique can dramatically improve your study schedule effectiveness. Instead of creating a to-do list, assign specific time blocks for each task in your calendar. This creates a realistic plan that accounts for the actual time available and prevents tasks from expanding to fill unlimited time. It also helps you prioritize what's truly important rather than just what's urgent.
//                           </p>
//                         </motion.div>
//                       </motion.div>
//                     </TabsContent>

//                     <TabsContent value="step-5" className="mt-0">
//                       <motion.div variants={container} initial="hidden" animate="show" className="space-y-6">
//                         <motion.div variants={item}>
//                           <h2 className="text-2xl font-bold mb-4">Advanced Techniques</h2>
//                           <p className="text-muted-foreground mb-4">
//                             Once you've mastered the fundamental study techniques, you can incorporate advanced methods to further enhance your learning efficiency and retention. These techniques leverage deeper cognitive processes and can be particularly effective for complex or challenging material.
//                           </p>
//                         </motion.div>

//                         <motion.div variants={item}>
//                           <h3 className="text-xl font-medium mb-3">Memory Enhancement Techniques</h3>
//                           <div className="space-y-4 mb-6">
//                             {[
//                               {
//                                 technique: "Memory Palace (Method of Loci)",
//                                 description: "A spatial memory technique where you visualize a familiar place and mentally place information at specific locations within it.",
//                                 howTo: [
//                                   "Choose a familiar location (your home, a route you know well)",
//                                   "Create a specific path through this location",
//                                   "Place vivid, unusual images representing your information at specific points",
//                                   "To recall, mentally walk through your palace and observe the images"
//                                 ],
//                                 bestFor: "Memorizing ordered lists, speeches, complex sequences"
//                               },
//                               {
//                                 technique: "Chunking",
//                                 description: "Breaking down large amounts of information into smaller, manageable units or 'chunks'.",
//                                 howTo: [
//                                   "Identify patterns or relationships in the information",
//                                   "Group related items together into meaningful units",
//                                   "Create a logical organization system for your chunks",
//                                   "Practice recalling entire chunks rather than individual items"
//                                 ],
//                                 bestFor: "Numbers, vocabulary lists, complex procedures, formulas"
//                               },
//                               {
//                                 technique: "Dual Coding",
//                                 description: "Combining verbal and visual information to create stronger memory connections.",
//                                 howTo: [
//                                   "For text-based information, create corresponding images or diagrams",
//                                   "For visual information, add verbal descriptions or explanations",
//                                   "Link the verbal and visual components in meaningful ways",
//                                   "Practice recalling both components together"
//                                 ],
//                                 bestFor: "Scientific concepts, historical events, processes and systems"
//                               },
//                               {
//                                 technique: "Elaborative Interrogation",
//                                 description: "Asking and answering 'why' questions to deepen understanding and create meaningful connections.",
//                                 howTo: [
//                                   "For each fact or concept, ask yourself 'Why is this true?'",
//                                   "Generate detailed explanations that connect to prior knowledge",
//                                   "Question assumptions and explore implications",
//                                   "Create flashcards with 'why' questions on one side and explanations on the other"
//                                 ],
//                                 bestFor: "Conceptual understanding, critical thinking, complex relationships"
//                               },
//                             ].map((technique, index) => (
//                               <div key={index} className="p-4 rounded-lg border border-gray-100 shadow-sm">
//                                 <h4 className="font-medium mb-2">{technique.technique}</h4>
//                                 <p className="text-sm text-muted-foreground mb-3">{technique.description}</p>
//                                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                                   <div>
//                                     <p className="text-sm font-medium mb-1">How to use it:</p>
//                                     <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
//                                       {technique.howTo.map((step, i) => (
//                                         <li key={i}>{step}</li>
//                                       ))}
//                                     </ul>
//                                   </div>
//                                   <div>
//                                     <p className="text-sm font-medium mb-1">Best for:</p>
//                                     <p className="text-sm text-muted-foreground">{technique.bestFor}</p>
//                                   </div>
//                                 </div>
//                               </div>
//                             ))}
//                           </div>
//                         </motion.div>

//                         <motion.div variants={item}>
//                           <h3 className="text-xl font-medium mb-3">Metacognitive Strategies</h3>
//                           <div className="p-5 rounded-lg border border-gray-100 shadow-sm mb-6">
//                             <p className="text-sm text-muted-foreground mb-4">
//                               Metacognition—thinking about your own thinking—is a powerful approach to learning. These strategies help you monitor, evaluate, and regulate your learning processes.
//                             </p>

//                             <div className="space-y-4">
//                               <div className="p-4 rounded-md">
//                                 <h4 className="font-medium mb-2">Retrieval Practice Journaling\
