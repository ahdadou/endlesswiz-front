'use client';

import { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import SearchBar from '@/components/SearchBar';
import InteractiveCard from '@/components/InteractiveCard';


const Practice = () => {
  const [activeLevel, setActiveLevel] = useState('intermediate');

  const levels = [
    { id: 'beginner', name: 'Beginner' },
    { id: 'intermediate', name: 'Intermediate' },
    { id: 'advanced', name: 'Advanced' }
  ];

  const words = [
    {
      id: '1',
      word: 'Pronunciation',
      pronunciation: 'prə-ˌnən-sē-ˈā-shən',
      definition: 'The way in which a word is pronounced.',
      example: 'Her pronunciation of French words is excellent.',
      level: 'intermediate'
    },
    {
      id: '2',
      word: 'Endeavor',
      pronunciation: 'in-ˈde-vər',
      definition: 'An attempt to achieve a goal.',
      example: 'His endeavors to learn English have been successful.',
      level: 'advanced'
    },
    {
      id: '3',
      word: 'Collaborate',
      pronunciation: 'kə-ˈla-bə-ˌrāt',
      definition: 'To work jointly with others or together.',
      example: 'We collaborated on the research project.',
      level: 'intermediate'
    },
    {
      id: '4',
      word: 'Phenomenal',
      pronunciation: 'fə-ˈnä-mə-nᵊl',
      definition: 'Remarkable or exceptional, especially in an extraordinary way.',
      example: "The team's performance was phenomenal.",
      level: 'advanced'
    },
    {
      id: '5',
      word: 'Opportunity',
      pronunciation: 'ä-pər-ˈtü-nə-tē',
      definition: 'A favorable combination of circumstances, time, and place.',
      example: 'He was given the opportunity to study abroad.',
      level: 'intermediate'
    },
    {
      id: '6',
      word: 'Fundamental',
      pronunciation: 'ˌfən-də-ˈmen-tᵊl',
      definition: 'Forming a necessary base or core; of central importance.',
      example: 'These concepts are fundamental to understanding the subject.',
      level: 'intermediate'
    }
  ];

  const filteredWords = words.filter(word => word.level === activeLevel);

  const handleSearch = (query: string) => {
    console.log('Searching for:', query);
    // Implement search functionality
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="pt-32 pb-16">
        <div className="container mx-auto px-6">
          <motion.div 
            className="max-w-3xl mx-auto text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="title-text mb-6">
              Interactive Practice
            </h1>
            <p className="subtitle-text mb-10 max-w-2xl mx-auto">
              Perfect your English with our interactive pronunciation and vocabulary exercises.
            </p>
            
            <SearchBar 
              placeholder="Search for words to practice..." 
              onSearch={handleSearch} 
              className="mb-6"
            />
          </motion.div>
        </div>
      </section>

      {/* Level Selection */}
      <section className="pb-12">
        <div className="container mx-auto px-6">
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {levels.map((level) => (
              <button
                key={level.id}
                onClick={() => setActiveLevel(level.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  activeLevel === level.id
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-secondary hover:bg-secondary/80 text-foreground'
                }`}
              >
                {level.name}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredWords.map((word, index) => (
              <motion.div
                key={word.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <InteractiveCard
                  word={word.word}
                  pronunciation={word.pronunciation}
                  definition={word.definition}
                  example={word.example}
                />
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-16">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-secondary/50 p-8 rounded-xl max-w-2xl mx-auto"
            >
              <h3 className="text-xl font-medium mb-4">Ready for more challenges?</h3>
              <p className="text-muted-foreground mb-6">
                Complete practice exercises to unlock more advanced content and track your progress.
              </p>
              <a href="#" className="button-primary flex items-center gap-2 mx-auto w-fit">
                <span>Start Challenge</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Practice;
