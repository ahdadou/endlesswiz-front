import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function FaqSection() {
  const faqs = [
    {
      question: "What languages are supported?",
      answer:
        "Currently, we support English. We plan to add more languages in the future.",
    },
    {
      question: "How do I track my progress?",
      answer:
        "Your progress is tracked in your dashboard. You can see statistics on words saved, videos watched, stories read, and games played. You can also set goals and monitor your learning journey.",
    },
    {
      question: "Can I save words and create sets?",
      answer:
        "Yes, you can save words to your personal collection and create sets for focused study. This helps you memorize vocabulary more effectively.",
    },
    {
      question: "What kind of games are available for memorizing words?",
      answer:
        "We offer a variety of games designed to reinforce vocabulary learning, including matching, flashcards, and fill-in-the-blanks. These games make memorizing words fun and engaging.",
    },
    {
      question: "What types of content are available?",
      answer:
        "You can watch videos, read stories, and play games. Our platform is designed to provide diverse learning experiences to help you master English.",
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Find answers to common questions about our platform
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left text-lg font-medium">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-gray-600">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        {/* <div className="mt-12 text-center">
          <p className="text-gray-600 mb-4">Still have questions? We're here to help.</p>
          <a href="/contact" className="text-primary font-medium hover:underline">
            Contact our support team
          </a>
        </div> */}
      </div>
    </section>
  );
}
