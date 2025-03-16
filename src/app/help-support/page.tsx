"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  HelpCircle,
  MessageSquare,
  FileText,
  Mail,
  Phone,
  Send,
  Search,
  ExternalLink,
  BookOpen,
  PenTool,
  Brain,
  Gamepad2,
  Mic,
  Star,
  Play,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useToast } from "@/components/ui/use-toast";

export default function HelpSupportPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Mock FAQ data
  const faqCategories = [
    {
      category: "Account & Billing",
      questions: [
        {
          question: "How do I change my password?",
          answer:
            "To change your password, go to your Profile page, click on the 'Account' tab, and select 'Update Password'. You'll need to enter your current password and then your new password twice to confirm.",
        },
        {
          question: "How do I upgrade to Premium?",
          answer:
            "You can upgrade to Premium by going to Settings > Subscription and selecting the Premium plan that works best for you. We accept credit cards, PayPal, and Apple Pay.",
        },
        {
          question: "Can I cancel my subscription anytime?",
          answer:
            "Yes, you can cancel your subscription at any time. Go to Settings > Subscription > Manage Subscription and click 'Cancel Subscription'. Your Premium features will remain active until the end of your current billing period.",
        },
        {
          question: "How do I update my payment method?",
          answer:
            "To update your payment method, go to Settings > Subscription > Payment Methods and click 'Add Payment Method' or 'Edit' next to an existing method.",
        },
      ],
    },
    {
      category: "Learning Features",
      questions: [
        {
          question: "How does the spaced repetition system work?",
          answer:
            "Our spaced repetition system optimizes your learning by showing you words at increasing intervals based on how well you know them. Words you find difficult will appear more frequently, while words you know well will appear less often, maximizing your memory retention.",
        },
        {
          question: "Can I import word lists from other platforms?",
          answer:
            "Yes, you can import word lists from CSV files, Excel spreadsheets, or directly from other popular learning platforms. Go to 'Create Set' and click on 'Import' to get started.",
        },
        {
          question: "How do I track my progress?",
          answer:
            "Your progress is automatically tracked on your Dashboard. You can see statistics like words learned, study time, accuracy rate, and your current streak. For more detailed analytics, visit the Stats page.",
        },
        {
          question: "Can I study offline?",
          answer:
            "Premium users can download sets for offline study. Once downloaded, you can access your flashcards and use basic study modes without an internet connection. Your progress will sync when you reconnect.",
        },
      ],
    },
    {
      category: "Technical Issues",
      questions: [
        {
          question: "The app is running slowly. What can I do?",
          answer:
            "Try clearing your browser cache and cookies, or reinstalling the app if you're using a mobile device. Make sure you're using the latest version of your browser or app. If problems persist, please contact our support team.",
        },
        {
          question: "I can't hear audio pronunciations. How do I fix this?",
          answer:
            "First, check if your device volume is turned up and not muted. Make sure you've granted the app permission to play audio. If you're using a browser, check that you haven't muted the tab. If problems persist, try using a different browser or device.",
        },
        {
          question: "Why aren't my changes saving?",
          answer:
            "This could be due to a poor internet connection or a temporary server issue. Try refreshing the page and making your changes again. If the problem continues, please contact our support team with details about what you were trying to save.",
        },
      ],
    },
  ];

  const handleSubmitQuestion = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      toast({
        title: "Question submitted",
        description:
          "We've received your question and will respond within 24 hours.",
      });
      e.target.reset();
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        <div className="flex-1 p-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-forest">Help & Support</h1>
            <p className="text-muted-foreground">
              Find answers to common questions or contact our support team
            </p>
          </div>

          {/* Search Bar */}
          <div className="relative max-w-2xl mx-auto mb-12">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              placeholder="Search for help articles..."
              className="pl-10 h-12 text-lg"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <Tabs defaultValue="faq" className="max-w-5xl mx-auto">
            <TabsList className="grid w-full grid-cols-3 mb-8  h-[60px]">
              <TabsTrigger value="faq" className="text-base py-3">
                <HelpCircle className="h-5 w-5 mr-2" />
                FAQs
              </TabsTrigger>
              <TabsTrigger value="contact" className="text-base py-3">
                <MessageSquare className="h-5 w-5 mr-2" />
                Contact Us
              </TabsTrigger>
              <TabsTrigger value="guides" className="text-base py-3">
                <FileText className="h-5 w-5 mr-2" />
                User Guides
              </TabsTrigger>
            </TabsList>

            <TabsContent value="faq">
              <div className="space-y-8">
                {faqCategories.map((category, index) => (
                  <Card key={index} className="border-forest-100 shadow-sm">
                    <CardHeader>
                      <CardTitle className="text-forest">
                        {category.category}
                      </CardTitle>
                      <CardDescription>
                        Frequently asked questions about{" "}
                        {category.category.toLowerCase()}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Accordion type="single" collapsible className="w-full">
                        {category.questions.map((faq, faqIndex) => (
                          <AccordionItem
                            key={faqIndex}
                            value={`item-${index}-${faqIndex}`}
                          >
                            <AccordionTrigger className="text-left font-medium">
                              {faq.question}
                            </AccordionTrigger>
                            <AccordionContent className="text-muted-foreground">
                              {faq.answer}
                            </AccordionContent>
                          </AccordionItem>
                        ))}
                      </Accordion>
                    </CardContent>
                  </Card>
                ))}

                <div className="text-center py-6">
                  <p className="text-muted-foreground mb-4">
                    Can't find what you're looking for?
                  </p>
                  <Button
                    onClick={() =>
                      document.querySelector('[data-value="contact"]').click()
                    }
                    className="bg-forest hover:bg-forest-700 text-cream"
                  >
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Contact Support
                  </Button>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="contact">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <Card className="md:col-span-2 border-forest-100 shadow-sm">
                  <CardHeader>
                    <CardTitle className="text-forest">
                      Contact Support
                    </CardTitle>
                    <CardDescription>
                      Send us a message and we'll get back to you within 24
                      hours
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleSubmitQuestion} className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label htmlFor="name" className="text-sm font-medium">
                            Name
                          </label>
                          <Input id="name" required />
                        </div>
                        <div className="space-y-2">
                          <label
                            htmlFor="email"
                            className="text-sm font-medium"
                          >
                            Email
                          </label>
                          <Input id="email" type="email" required />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label
                          htmlFor="subject"
                          className="text-sm font-medium"
                        >
                          Subject
                        </label>
                        <Input id="subject" required />
                      </div>

                      <div className="space-y-2">
                        <label
                          htmlFor="category"
                          className="text-sm font-medium"
                        >
                          Category
                        </label>
                        <select
                          id="category"
                          className="w-full rounded-md border border-input bg-background px-3 py-2"
                          required
                        >
                          <option value="">Select a category</option>
                          <option value="account">Account Issues</option>
                          <option value="billing">Billing & Payments</option>
                          <option value="technical">Technical Problems</option>
                          <option value="feature">Feature Request</option>
                          <option value="other">Other</option>
                        </select>
                      </div>

                      <div className="space-y-2">
                        <label
                          htmlFor="message"
                          className="text-sm font-medium"
                        >
                          Message
                        </label>
                        <Textarea id="message" rows={6} required />
                      </div>

                      <div className="space-y-2">
                        <label
                          htmlFor="attachment"
                          className="text-sm font-medium"
                        >
                          Attachment (optional)
                        </label>
                        <Input id="attachment" type="file" />
                        <p className="text-xs text-muted-foreground">
                          Max file size: 5MB. Supported formats: JPG, PNG, PDF
                        </p>
                      </div>

                      <Button
                        type="submit"
                        className="bg-forest hover:bg-forest-700 text-cream"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? (
                          <>
                            <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-background border-r-transparent"></div>
                            Submitting...
                          </>
                        ) : (
                          <>
                            <Send className="h-4 w-4 mr-2" />
                            Send Message
                          </>
                        )}
                      </Button>
                    </form>
                  </CardContent>
                </Card>

                <div className="space-y-6">
                  <Card className="border-forest-100 shadow-sm">
                    <CardHeader>
                      <CardTitle className="text-forest">
                        Contact Information
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-start gap-3">
                        <Mail className="h-5 w-5 text-forest mt-0.5" />
                        <div>
                          <p className="font-medium">Email Support</p>
                          <p className="text-sm text-muted-foreground">
                            support@studycards.com
                          </p>
                          <p className="text-xs text-muted-foreground">
                            Response time: 24 hours
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <Phone className="h-5 w-5 text-forest mt-0.5" />
                        <div>
                          <p className="font-medium">Phone Support</p>
                          <p className="text-sm text-muted-foreground">
                            +1 (555) 123-4567
                          </p>
                          <p className="text-xs text-muted-foreground">
                            Mon-Fri, 9AM-5PM EST
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-forest-100 shadow-sm">
                    <CardHeader>
                      <CardTitle className="text-forest">
                        Support Hours
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span>Monday - Friday</span>
                          <span>9:00 AM - 8:00 PM EST</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Saturday</span>
                          <span>10:00 AM - 6:00 PM EST</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Sunday</span>
                          <span>Closed</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="guides">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  {
                    title: "Getting Started Guide",
                    description:
                      "Learn the basics of StudyCards and set up your first study set",
                    icon: <BookOpen className="h-8 w-8 text-forest" />,
                    link: "/guides/getting-started",
                  },
                  {
                    title: "Creating Effective Flashcards",
                    description:
                      "Tips and best practices for creating memorable flashcards",
                    icon: <PenTool className="h-8 w-8 text-forest" />,
                    link: "/guides/creating-flashcards",
                  },
                  {
                    title: "Study Techniques",
                    description:
                      "Learn about different study methods and how to use them effectively",
                    icon: <Brain className="h-8 w-8 text-forest" />,
                    link: "/guides/study-techniques",
                  },
                  {
                    title: "Using Practice Modes",
                    description:
                      "Detailed guide on all the different practice modes available",
                    icon: <Gamepad2 className="h-8 w-8 text-forest" />,
                    link: "/guides/practice-modes",
                  },
                  {
                    title: "Pronunciation Features",
                    description:
                      "How to use the pronunciation tools to improve your speaking skills",
                    icon: <Mic className="h-8 w-8 text-forest" />,
                    link: "/guides/pronunciation",
                  },
                  {
                    title: "Premium Features Guide",
                    description:
                      "Explore all the features available with a Premium subscription",
                    icon: <Star className="h-8 w-8 text-forest" />,
                    link: "/guides/premium-features",
                  },
                ].map((guide, index) => (
                  <Card
                    key={index}
                    className="border-forest-100 shadow-sm hover:shadow-md transition-shadow"
                  >
                    <CardContent className="pt-6">
                      <div className="flex flex-col items-center text-center">
                        <div className="mb-4 rounded-full bg-forest/10 p-3">
                          {guide.icon}
                        </div>
                        <h3 className="text-lg font-medium text-forest mb-2">
                          {guide.title}
                        </h3>
                        <p className="text-sm text-muted-foreground mb-4">
                          {guide.description}
                        </p>
                        <Button
                          variant="outline"
                          className="w-full border-forest text-forest hover:bg-forest hover:text-cream"
                          asChild
                        >
                          <a href={guide.link}>
                            Read Guide
                            <ExternalLink className="ml-2 h-4 w-4" />
                          </a>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="mt-12 p-6 bg-forest/5 rounded-lg">
                <h3 className="text-xl font-medium text-forest mb-4">
                  Video Tutorials
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[
                    {
                      title: "Getting Started with StudyCards",
                      duration: "5:32",
                      thumbnail: "/placeholder.svg?height=120&width=240",
                      link: "#video-1",
                    },
                    {
                      title: "Creating Your First Study Set",
                      duration: "4:15",
                      thumbnail: "/placeholder.svg?height=120&width=240",
                      link: "#video-2",
                    },
                    {
                      title: "Advanced Study Techniques",
                      duration: "8:47",
                      thumbnail: "/placeholder.svg?height=120&width=240",
                      link: "#video-3",
                    },
                  ].map((video, index) => (
                    <a
                      key={index}
                      href={video.link}
                      className="block group rounded-lg overflow-hidden bg-white shadow-sm hover:shadow-md transition-shadow"
                    >
                      <div className="relative">
                        <img
                          src={video.thumbnail || "/placeholder.svg"}
                          alt={video.title}
                          className="w-full h-auto"
                        />
                        <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                          {video.duration}
                        </div>
                        <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity">
                          <div className="rounded-full bg-white/90 p-3">
                            <Play className="h-6 w-6 text-forest" />
                          </div>
                        </div>
                      </div>
                      <div className="p-3">
                        <h4 className="font-medium text-forest group-hover:text-forest-700 transition-colors">
                          {video.title}
                        </h4>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
