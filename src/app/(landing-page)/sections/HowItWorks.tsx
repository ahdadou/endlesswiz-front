import { Search, PlayCircle, BookOpen, BookmarkPlus } from "lucide-react";

export default function HowItWorksSection() {
  const steps = [
    {
      icon: <Search className="h-8 w-8 text-white" />,
      title: "Search for Words",
      description: "Explore words and phrases easily.",
      image: "/placeholder.svg?height=128&width=256&text=Search",
    },
    {
      icon: <PlayCircle className="h-8 w-8 text-white" />,
      title: "Watch Videos",
      description: "See words in real-life contexts.",
      image: "/placeholder.svg?height=128&width=256&text=Watch",
    },
    {
      icon: <BookOpen className="h-8 w-8 text-white" />,
      title: "Read Stories",
      description: "Enhance vocabulary through stories.",
      image: "/placeholder.svg?height=128&width=256&text=Read",
    },
    {
      icon: <BookmarkPlus className="h-8 w-8 text-white" />,
      title: "Save & Review",
      description: "Bookmark words for future learning.",
      image: "/placeholder.svg?height=128&width=256&text=Save",
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-r from-green-900 to-green-800 text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">How It Works</h2>
          <p className="text-xl text-green-200 max-w-3xl mx-auto">
            Discover the simple steps to learn English effectively.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              <div className="flex flex-col items-center">
                <div className="bg-lime-500 rounded-full w-16 h-16 flex items-center justify-center mb-6 relative z-10">
                  {step.icon}
                  <div className="absolute -top-2 -right-2 bg-white text-lime-500 w-8 h-8 rounded-full flex items-center justify-center font-bold">
                    {index + 1}
                  </div>
                </div>

                {index < steps.length - 1 && (
                  <div className="absolute top-8 left-[calc(50%+2rem)] w-[calc(100%-4rem)] h-0.5 bg-lime-400/30 hidden lg:block"></div>
                )}

                <h3 className="text-xl font-semibold mb-3 text-center">{step.title}</h3>
                <p className="text-green-200 text-center mb-6">{step.description}</p>

                <div className="h-32 w-full bg-green-700 rounded-lg overflow-hidden">
                  <img
                    src={step.image || "/placeholder.svg"}
                    alt={`Step ${index + 1} visualization`}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}