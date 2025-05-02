import { Button } from "@/components/ui/button";
import { ArrowRight, Users, Award, Globe, Heart } from "lucide-react";
import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="container max-w-7xl mx-auto px-4 py-16">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">
          About EndlessWiz
        </h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          We're dedicated to making English learning fun, accessible, and
          effective for thousands of learners worldwide.
        </p>
      </div>

      {/* Our Story */}
      <div className="grid md:grid-cols-2 gap-12 items-center mb-24">
        <div>
          <h2 className="text-3xl font-bold mb-6">Our Journey</h2>
          <p className="text-lg mb-4">
            Launched in 2024, EndlessWiz was born from a passion for helping
            people master English with confidence. What started as a simple idea
            has grown into a vibrant app embraced by thousands of learners
            across the globe.
          </p>
          <p className="text-lg mb-6">
            Our team of passionate educators and language enthusiasts crafts
            engaging tools for pronunciation, vocabulary, and everyday
            conversation—designed to fit your unique learning journey.
          </p>
          <Button asChild className="group">
            <Link href="/auth/signup">
              Start Learning{" "}
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition" />
            </Link>
          </Button>
        </div>
        <div className="bg-muted rounded-lg p-8 h-[400px] flex items-center justify-center gap-8">
          <div className="text-center">
            <p className="text-4xl font-bold mb-2">50K+</p>
            <p className="text-xl">Active Learners</p>
          </div>
          <div className="h-16 w-px bg-border"></div>
          <div className="text-center">
            <p className="text-4xl font-bold mb-2">15+</p>
            <p className="text-xl">Countries</p>
          </div>
          <div className="h-16 w-px bg-border"></div>
          <div className="text-center">
            <p className="text-4xl font-bold mb-2">200K+</p>
            <p className="text-xl">Lessons Completed</p>
          </div>
        </div>
      </div>

      {/* Our Values */}
      <div className="mb-24">
        <h2 className="text-3xl font-bold mb-12 text-center">What Drives Us</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            {
              icon: <Users className="h-10 w-10 mb-4 text-primary" />,
              title: "Open to All",
              description:
                "We welcome every English learner, no matter where you’re from or where you’re starting.",
            },
            {
              icon: <Award className="h-10 w-10 mb-4 text-primary" />,
              title: "Quality First",
              description:
                "Our lessons are thoughtfully designed to help you speak English with confidence.",
            },
            {
              icon: <Globe className="h-10 w-10 mb-4 text-primary" />,
              title: "Global Community",
              description:
                "Join thousands of learners worldwide and connect through the power of language.",
            },
            {
              icon: <Heart className="h-10 w-10 mb-4 text-primary" />,
              title: "Learner-Focused",
              description:
                "Your goals inspire us to create tools that make English learning enjoyable and effective.",
            },
          ].map((value) => (
            <div key={value.title} className="bg-card p-6 rounded-lg border">
              {value.icon}
              <h3 className="text-xl font-semibold mb-2">{value.title}</h3>
              <p className="text-muted-foreground">{value.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Our Approach */}
      <div className="mb-24">
        <h2 className="text-3xl font-bold mb-12 text-center">
          How We Help You Learn
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              title: "Practice Pronunciation",
              description:
                "Master tricky sounds and speak clearly with guided exercises.",
            },
            {
              title: "Build Vocabulary",
              description:
                "Learn words that matter to you with fun, interactive lessons.",
            },
            {
              title: "Real Conversations",
              description:
                "Gain confidence with practical phrases for everyday life.",
            },
          ].map((approach) => (
            <div key={approach.title} className="text-center">
              <h3 className="text-xl font-semibold mb-2">{approach.title}</h3>
              <p className="text-muted-foreground">{approach.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-primary/5 rounded-2xl p-8 md:p-12 text-center">
        <h2 className="text-3xl font-bold mb-4">Start Your English Journey</h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
          Join thousands of learners mastering English with EndlessWiz. Whether
          you're a beginner or brushing up your skills, we’re here to help you
          succeed.
        </p>
        <Button asChild size="lg">
          <Link href="/auth/signup">Get Started Now</Link>
        </Button>
      </div>
    </div>
  );
}
