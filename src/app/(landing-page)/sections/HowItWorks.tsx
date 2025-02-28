"use client";

import { motion } from "framer-motion";
import { CheckCircle, PlayCircle, Search, Volume2 } from "lucide-react";

const HowItWorks = () => {
  return (
    <section id="HowItWorks" className="py-20">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold text-center text-white mb-16">
          How It Works
        </h2>
        <div className="grid md:grid-cols-4 gap-8">
          {[
            {
              icon: <Search size={24} />,
              title: "Search",
              text: "Find your target word or phrase",
            },
            {
              icon: <PlayCircle size={24} />,
              title: "Watch",
              text: "View native speaker examples",
            },
            {
              icon: <Volume2 size={24} />,
              title: "Practice",
              text: "Record your pronunciation",
            },
            {
              icon: <CheckCircle size={24} />,
              title: "Improve",
              text: "Get instant feedback",
            },
          ].map((step, i) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-white p-6 rounded-xl shadow-lg text-center"
            >
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                {step.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                {step.title}
              </h3>
              <p className="text-gray-600">{step.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
