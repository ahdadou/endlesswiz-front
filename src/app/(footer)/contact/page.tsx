import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Mail, HelpCircle } from "lucide-react";

export default function ContactPage() {
  return (
    <div className="container max-w-7xl mx-auto px-4 py-16">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">
          Contact EndlessWiz
        </h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Questions about learning English with us? We're here to support you
          every step of the way.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-12 items-start mb-24">
        {/* Contact Form */}
        <div className="bg-card rounded-xl border p-8">
          <h2 className="text-2xl font-bold mb-6">Reach Out to Us</h2>
          <form className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium">
                Your Name
              </label>
              <Input id="name" placeholder="Your name" />
            </div>

            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium">
                Email Address
              </label>
              <Input
                id="email"
                type="email"
                placeholder="your.email@example.com"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="subject" className="text-sm font-medium">
                What’s on Your Mind?
              </label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Choose a topic" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="general">General Questions</SelectItem>
                  <SelectItem value="learning">Learning Support</SelectItem>
                  <SelectItem value="account">Account Help</SelectItem>
                  <SelectItem value="feedback">Share Feedback</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label htmlFor="message" className="text-sm font-medium">
                Your Message
              </label>
              <Textarea
                id="message"
                placeholder="How can we assist you?"
                rows={5}
              />
            </div>

            <Button type="submit" className="w-full">
              Send Message
            </Button>
          </form>
        </div>

        {/* Contact Information & FAQs */}
        <div className="space-y-8">
          <div>
            <h2 className="text-2xl font-bold mb-6">Get in Touch</h2>
            <p className="text-muted-foreground mb-6">
              Our support team is here to help with your English learning
              journey. We aim to respond within 24-48 hours.
            </p>

            <div className="flex items-start">
              <Mail className="h-5 w-5 text-primary mt-1 mr-4" />
              <div>
                <h3 className="font-medium">Email Us</h3>
                <p className="text-muted-foreground">support@endlesswiz.com</p>
                <p className="text-sm text-muted-foreground mt-1">
                  Reach out anytime—we’re here for you!
                </p>
              </div>
            </div>
          </div>

          <div className="bg-muted rounded-xl p-6">
            <h3 className="text-xl font-semibold mb-4 flex items-center">
              <HelpCircle className="h-5 w-5 mr-2 text-primary" /> Quick Answers
            </h3>
            <div className="space-y-4">
              {[
                {
                  question: "How do I start learning with EndlessWiz?",
                  answer:
                    "Sign up at /auth/signup, and you’ll get instant access to our lessons!",
                },
                {
                  question: "Can I practice pronunciation?",
                  answer:
                    "Yes! Our app includes guided exercises to help you speak clearly.",
                },
                {
                  question: "What if I forget my password?",
                  answer:
                    "Click 'Forgot Password' on the login page to reset it easily.",
                },
                {
                  question: "Is EndlessWiz free to use?",
                  answer:
                    "We offer free core features, with optional premium upgrades for more tools.",
                },
              ].map((faq) => (
                <div
                  key={faq.question}
                  className="border-b border-border pb-4 last:border-0 last:pb-0"
                >
                  <h4 className="font-medium mb-2">{faq.question}</h4>
                  <p className="text-sm text-muted-foreground">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
