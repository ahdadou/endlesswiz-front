'use client';

import { useState } from 'react';
import { ArrowRight, Check } from 'lucide-react';
import { motion } from 'framer-motion';
import SearchBar from '@/components/SearchBar';
import VideoPlayer from '@/components/VideoPlayer';


const Learn = () => {
  const [activeCategory, setActiveCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'All Videos' },
    { id: 'pronunciation', name: 'Pronunciation' },
    { id: 'vocabulary', name: 'Vocabulary' },
    { id: 'conversation', name: 'Conversation' },
    { id: 'grammar', name: 'Grammar' }
  ];

  const videos = [
    {
      id: '1',
      videoId: 'dQw4w9WgXcQ', // This is just a placeholder - use a real educational video ID
      title: 'Master English Vowel Sounds',
      description: 'Learn how to pronounce English vowel sounds with perfect clarity.',
      category: 'pronunciation',
      duration: '15:22'
    },
    {
      id: '2',
      videoId: 'dQw4w9WgXcQ', // Placeholder
      title: '50 Essential Business English Terms',
      description: 'Expand your professional vocabulary with these common business terms.',
      category: 'vocabulary',
      duration: '12:45'
    },
    {
      id: '3',
      videoId: 'dQw4w9WgXcQ', // Placeholder
      title: 'Casual Conversation Techniques',
      description: 'Learn how to maintain natural English conversations in informal settings.',
      category: 'conversation',
      duration: '18:10'
    },
    {
      id: '4',
      videoId: 'dQw4w9WgXcQ', // Placeholder
      title: 'Mastering Tricky Consonants',
      description: 'Practice pronouncing the most challenging English consonant sounds.',
      category: 'pronunciation',
      duration: '14:35'
    }
  ];

  const filteredVideos = activeCategory === 'all' 
    ? videos 
    : videos.filter(video => video.category === activeCategory);

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
              Learn with Video Lessons
            </h1>
            <p className="subtitle-text mb-10 max-w-2xl mx-auto">
              Watch expert-created videos to improve your pronunciation, vocabulary, and overall English fluency.
            </p>
            
            <SearchBar
              placeholder="Search for lessons by topic, word, or phrase..." 
              onSearch={handleSearch} 
              className="mb-6"
            />
          </motion.div>
        </div>
      </section>

      {/* Video Categories */}
      <section className="pb-12">
        <div className="container mx-auto px-6">
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  activeCategory === category.id
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-secondary hover:bg-secondary/80 text-foreground'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {filteredVideos.map((video, index) => (
              <motion.div
                key={video.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <VideoPlayer
                  videoId={video.videoId}
                  title={video.title}
                  description={video.description}
                />
                <div className="flex items-center justify-between mt-3">
                  <span className="text-sm text-muted-foreground">{video.duration}</span>
                  <div className="flex items-center gap-3">
                    <button className="text-sm text-primary hover:text-primary/80 transition-colors flex items-center gap-1.5">
                      <Check className="w-4 h-4" />
                      <span>Mark as watched</span>
                    </button>
                    <button className="text-sm text-primary hover:text-primary/80 transition-colors flex items-center gap-1.5">
                      <span>Next video</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-16">
            <p className="text-muted-foreground mb-6">Want to practice what you've learned?</p>
            <a href="/practice" className="button-primary">
              Try Interactive Practice
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Learn;
