'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import YouTube from 'react-youtube';
// import { useNavigate } from 'react-router-dom';
import { Bookmark, Search, Trash2, Volume2, ChevronLeft, ChevronRight, BookmarkIcon, TrashIcon } from 'lucide-react';
import { useGesture } from '@use-gesture/react';

const FavoritePage = () => {

  const [displayedWords, setDisplayedWords] = useState(10);
  const [videoPage, setVideoPage] = useState(1);
  const wordsContainerRef = useRef<HTMLDivElement>(null);
  const videosContainerRef = useRef<HTMLDivElement>(null);
  
  // Temporary data with different sizes
  const favoriteWords = Array.from({ length: 25 }, (_, i) => ({
    id: i + 1,
    word: `Word ${i + 1}`,
    meaning: `Meaning of word ${i + 1}`
  }));

  const generateVideos = (page: number) => [
    { id: page * 5 - 4, videoId: "dQw4w9WgXcQ", size: 'medium' },
    { id: page * 5 - 3, videoId: "5qap5aO4i9A", size: 'large' },
    { id: page * 5 - 2, videoId: "LXb3EKWsInQ", size: 'small' },
    { id: page * 5 - 1, videoId: "ygTZZpVkmKg", size: 'medium' },
    { id: page * 5, videoId: "dQw4w9WgXcQ", size: 'small' },
  ];

  const [favoriteVideos, setFavoriteVideos] = useState(() => generateVideos(1));

  const handleWordsScroll = () => {
    if (wordsContainerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = wordsContainerRef.current;
      if (scrollTop + clientHeight >= scrollHeight - 20) {
        setDisplayedWords(prev => Math.min(prev + 10, favoriteWords.length));
      }
    }
  };

  const loadMoreVideos = (direction: 'next' | 'prev') => {
    const newPage = direction === 'next' ? videoPage + 1 : videoPage - 1;
    setVideoPage(newPage);
    setFavoriteVideos(generateVideos(newPage));
  };

  const bind = useGesture({
    onDrag: ({ movement: [mx], direction: [xDir], cancel }) => {
      if (videosContainerRef.current && Math.abs(mx) > 50) {
        loadMoreVideos(xDir > 0 ? 'prev' : 'next');
        cancel();
      }
    }
  });

  const getVideoSize = (size: string) => {
    switch(size) {
      case 'small': return 'w-full h-48';
      case 'medium': return 'w-full h-64';
      case 'large': return 'w-full h-80';
      default: return 'w-full h-64';
    }
  };


  const scrollVideos = (direction: 'left' | 'right') => {
    if (videosContainerRef.current) {
      const scrollAmount = direction === 'right' ? 300 : -300;
      videosContainerRef.current.scrollBy({
        left: scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  const navigateToVideoPage = (videoId: string) => {
    // navigate(`/video/${videoId}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white p-6">
      <div className="max-w-7xl mx-auto">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-bold text-gray-900 mb-8 flex items-center gap-3"
        >
          <BookmarkIcon className="h-9 w-9 text-indigo-600" />
          Your Favorites
        </motion.h1>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Words Section */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-2xl p-6 border border-gray-100 shadow-lg"
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold text-gray-900">
                Saved Words
                <span className="text-indigo-600 ml-2">{favoriteWords.length}</span>
              </h2>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search words..."
                  className="pl-10 pr-4 py-2 bg-gray-50 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <Search className="h-5 w-5 text-gray-400 absolute left-3 top-2.5" />
              </div>
            </div>

            <div 
              ref={wordsContainerRef}
              onScroll={handleWordsScroll}
              className="space-y-4 h-[600px] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-50"
            >
              <AnimatePresence>
                {favoriteWords.slice(0, displayedWords).map((word, index) => (
                  <motion.div
                    key={word.id}
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="group p-4 rounded-xl bg-gray-50 hover:bg-indigo-50 transition-all border border-gray-200 hover:border-indigo-200"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-xl font-semibold text-indigo-600">{word.word}</h3>
                        <p className="text-gray-600 mt-1">{word.meaning}</p>
                      </div>
                      <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button className="p-2 hover:bg-indigo-100 rounded-lg">
                          <TrashIcon className="h-5 w-5 text-red-600" />
                        </button>
                        <button className="p-2 hover:bg-indigo-100 rounded-lg">
                          <Volume2 className="h-5 w-5 text-gray-600" />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </motion.div>

          {/* Redesigned Videos Section */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-2xl p-6 border border-gray-100 shadow-lg"
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold text-gray-900">
                Saved Videos
                <span className="text-indigo-600 ml-2">{videoPage * 5}</span>
              </h2>
              <div className="flex gap-2">
                <button 
                  onClick={() => loadMoreVideos('prev')}
                  disabled={videoPage === 1}
                  className="p-2 hover:bg-indigo-100 rounded-full transition-transform hover:scale-105 disabled:opacity-50"
                >
                  <ChevronLeft className="h-6 w-6 text-gray-600" />
                </button>
                <button 
                  onClick={() => loadMoreVideos('next')}
                  className="p-2 hover:bg-indigo-100 rounded-full transition-transform hover:scale-105"
                >
                  <ChevronRight className="h-6 w-6 text-gray-600" />
                </button>
              </div>
            </div>

            <div 
              {...bind()}
              ref={videosContainerRef}
              className="grid grid-cols-2 md:grid-cols-3 gap-4 cursor-grab active:cursor-grabbing"
            >
              {favoriteVideos.map((video) => (
                <motion.div 
                  key={video.id}
                  whileHover={{ scale: 1.02 }}
                  className={`relative group ${getVideoSize(video.size)}`}
                >
                  <div className="relative h-full rounded-xl overflow-hidden shadow-lg">
                    <YouTube
                      videoId={video.videoId}
                      opts={{
                        height: '100%',
                        width: '100%',
                        playerVars: {
                          modestbranding: 1,
                          rel: 0,
                          autoplay: 0
                        }
                      }}
                      className="absolute inset-0 w-full h-full"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <button className="p-3 bg-white/90 rounded-full shadow-lg hover:bg-white transition-colors">
                        <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="mt-6 flex justify-center gap-2">
              {[1, 2, 3].map((page) => (
                <button
                  key={page}
                  onClick={() => setVideoPage(page)}
                  className={`h-2 w-8 rounded-full transition-all ${videoPage === page ? 'bg-indigo-600' : 'bg-gray-200'}`}
                />
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default FavoritePage;