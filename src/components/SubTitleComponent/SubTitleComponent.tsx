"use client";

import { useState } from "react";
import { Captions, Heart, HeartOff } from "lucide-react";
import cx from "classnames";
import { motion } from "framer-motion";
import useTranscriptStore from "@/stores/useTranscriptStore";
import type { Transcript } from "@/stores/useTranscriptStore";

interface SubTitleComponentProps {
  transcript: Transcript;
  highlightedWord: string;
  onAddToFavorite?: (word: string) => void;
  isAuthenticated?: boolean;
  favorites?: Set<string>;
}

export function SubTitleComponent({
  transcript,
  highlightedWord,
  onAddToFavorite,
  isAuthenticated = false,
  favorites = new Set(),
}: SubTitleComponentProps) {
  const [selectedWord, setSelectedWord] = useState<{
    word: string;
    pronunciation: string;
    definition: string;
  } | null>(null);

  const handleWordClick = (word: string) => {
    setSelectedWord({
      word,
      pronunciation: "/ˌser.ənˈdɪp.ə.ti/",
      definition: "The occurrence of events by chance in a happy way",
    });
  };

  const handleFavoriteClick = (word: string) => {
    if (!isAuthenticated) {
      alert("Please login to save favorites!");
      return;
    }
    onAddToFavorite?.(word);
  };

  // Mock subtitle data for empty state
  const mockSubtitle = {
    paragraph:
      "Click any word in this example sentence to see its definition. Try serendipity for a demonstration.",
    start_time: 0,
  };

  const displayTranscript = transcript?.paragraph ? transcript : mockSubtitle;

  return (
    <div className="bg-white border-2 border-gray-200 rounded-2xl shadow-lg p-6 sticky top-4 h-full">
      <div className="flex gap-3 items-center mb-4">
        <Captions className="w-6 h-6 text-gray-900" />
        <h3 className="text-xl font-semibold text-gray-900">Live Subtitles</h3>
      </div>

      <div className="space-y-4">
        <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
          <p className="text-gray-700">
            {displayTranscript.paragraph.split(" ").map((word, index) => {
              const cleanWord = word.replace(/[.,]/g, "");
              const isExampleWord = cleanWord.toLowerCase() === "serendipity";

              return (
                <span
                  key={index}
                  onClick={() => handleWordClick(cleanWord)}
                  className={cx(
                    "cursor-pointer hover:bg-gray-200 rounded px-1 py-0.5 transition-colors",
                    highlightedWord.includes(cleanWord) &&
                      "bg-blue-100 text-blue-600",
                    selectedWord?.word === cleanWord && "ring-2 ring-blue-300",
                    isExampleWord && "text-blue-500 font-medium",
                  )}
                >
                  {word}{" "}
                </span>
              );
            })}
          </p>
        </div>

        {selectedWord ? (
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-100 space-y-2 relative">
            {/* Favorite Button */}
            {onAddToFavorite && (
              <motion.button
                onClick={() => handleFavoriteClick(selectedWord.word)}
                className="absolute top-2 right-2 p-1.5 hover:bg-gray-200 rounded-full transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                {favorites.has(selectedWord.word) ? (
                  <HeartOff className="w-5 h-5 text-red-500 fill-red-100" />
                ) : (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <Heart className="w-5 h-5 text-gray-400 hover:text-red-400" />
                  </motion.div>
                )}
              </motion.button>
            )}

            {/* Shine Animation */}
            <motion.div
              initial={{ backgroundPosition: "-100%" }}
              animate={{ backgroundPosition: "200%" }}
              transition={{
                repeat: Infinity,
                duration: 2,
                ease: "linear",
              }}
              className="absolute inset-0 pointer-events-none"
              style={{
                background: `linear-gradient(
                  110deg,
                  transparent 25%,
                  rgba(255, 255, 255, 0.4) 50%,
                  transparent 75%
                )`,
              }}
            />

            <div className="flex items-baseline gap-2">
              <span className="text-lg font-semibold text-gray-900">
                {selectedWord.word}
              </span>
              <span className="text-sm text-gray-500">
                {selectedWord.pronunciation}
              </span>
            </div>
            <p className="text-gray-700 text-sm">{selectedWord.definition}</p>
          </div>
        ) : (
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
            <p className="text-gray-500 text-sm text-center">
              {!transcript?.paragraph && (
                <span className="block mb-2">
                  ✨ Welcome to pronunciation helper!
                </span>
              )}
              Click any word in the subtitle above to see:
              <ul className="list-disc pl-4 mt-2 text-left">
                <li>Detailed definition</li>
                <li>Usage examples</li>
              </ul>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
