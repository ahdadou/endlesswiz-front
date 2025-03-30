import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function FAQPage() {
  return (
    <div className="container max-w-4xl mx-auto px-4 py-16">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">Frequently Asked Questions</h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Got questions about learning English with EndlessWiz? We’ve got answers! Explore below to learn more about how
          we can help you master English.
        </p>
      </div>

      {/* FAQ Accordion */}
      <div className="mb-16">
        <Accordion type="single" collapsible className="w-full space-y-4">
          {[
            {
              question: "What is EndlessWiz?",
              answer:
                "EndlessWiz is an app designed to make learning English fun, effective, and accessible for everyone. Whether you’re a beginner or looking to polish your skills, we offer interactive lessons, pronunciation practice, vocabulary builders, and real-world conversation tools. Launched in 2024, we’re already helping over 50,000 learners worldwide improve their English with confidence!",
            },
            {
              question: "How do I get started with EndlessWiz?",
              answer:
                "Getting started is easy! Just head to /auth/signup, create your free account with your name and email, and dive into our core lessons right away. You’ll get instant access to pronunciation guides, vocabulary exercises, and more. Want extra features like ad-free learning? Check out our premium options after signing up!",
            },
            {
              question: "Is EndlessWiz free to use?",
              answer:
                "Yes, we offer a robust free version that includes essential tools like basic lessons, pronunciation practice, and vocabulary exercises—perfect for getting started. For learners who want more, our premium subscription unlocks advanced lessons, personalized feedback, and an ad-free experience. You can see pricing details when you sign up!",
            },
            {
              question: "Who can use EndlessWiz?",
              answer:
                "Anyone 13 or older can use EndlessWiz! Whether you’re a student, professional, traveler, or just curious about English, our app adapts to your level and goals. If you’re under 18, we recommend getting parental consent to ensure a safe and enjoyable learning experience.",
            },
            {
              question: "How does EndlessWiz help me improve my English?",
              answer:
                "We focus on three key areas: pronunciation, vocabulary, and conversation. Our guided exercises help you master tricky sounds (like 'th' or 'r'), our vocabulary builder introduces words you’ll actually use, and our conversation practice prepares you for real-life chats—like ordering coffee or chatting with friends. It’s all interactive, so you learn by doing!",
            },
            {
              question: "Can I practice speaking with EndlessWiz?",
              answer:
                "Absolutely! Our pronunciation tools let you record yourself, compare your speech to native speakers, and get tips to sound clearer. It’s like having a speaking coach in your pocket. Premium users also get access to advanced speaking challenges to take it up a notch!",
            },
            {
              question: "What if I forget my password?",
              answer:
                "No worries! On the login page, click 'Forgot Password,' enter your email, and we’ll send you a link to reset it. It’s quick and easy, so you can get back to learning in no time. Still stuck? Email us at support@endlesswiz.com—we’re here to help.",
            },
            {
              question: "How do I cancel or change my subscription?",
              answer:
                "You’re in control! Go to your account settings after logging in, find the subscription section, and you can cancel or switch plans anytime. Cancellations take effect at the end of your current billing cycle—no refunds for partial periods, but no hassle either!",
            },
            {
              question: "Is my data safe with EndlessWiz?",
              answer:
                "We take your privacy seriously. Your personal info (like your name and email) is protected, and we only use your learning data to improve your experience—like tracking progress or suggesting lessons. Check out our Privacy Policy (linked in the Terms of Service) for all the details!",
            },
            {
              question: "How can I contact the EndlessWiz team?",
              answer:
                "We’d love to hear from you! Drop us an email at support@endlesswiz.com with any questions, feedback, or ideas. Our team responds within 24-48 hours, Monday through Friday. You can also use the contact form on our Contact page for a quick message!",
            },
            {
              question: "Do you offer support in other languages?",
              answer:
                "Our app is focused on teaching English, so all lessons and tools are in English to immerse you fully. However, our support team can assist you in basic Spanish, French, or Mandarin if you email us—we want to make sure everyone feels welcome!",
            },
            {
              question: "Can I use EndlessWiz offline?",
              answer:
                "Some features, like downloaded lessons, work offline so you can learn on the go—like during a flight or commute. However, most interactive tools (like pronunciation feedback) need an internet connection to function fully. We’re working to expand offline options—stay tuned!",
            },
          ].map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`} className="border rounded-lg">
              <AccordionTrigger className="text-left px-4 py-3 font-semibold hover:no-underline">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="px-4 pb-4 text-muted-foreground">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>

      {/* CTA Section */}
      <div className="text-center bg-primary/5 rounded-2xl p-8">
        <h2 className="text-2xl font-bold mb-4">Still Have Questions?</h2>
        <p className="text-lg text-muted-foreground mb-6">
          We’re here to help you succeed with English. Reach out or dive in to start learning today!
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild size="lg">
            <Link href="/auth/signup">Start Learning Now</Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="/contact">Contact Us</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}