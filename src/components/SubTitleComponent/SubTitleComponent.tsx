"use client";

import { useCallback, useEffect, useState } from "react";
import { Captions, Heart, Bookmark, CheckCircle } from "lucide-react";
import cx from "classnames";
import { motion } from "framer-motion";
import { useZustandState } from "@/provider/ZustandStoreProvider";
import api from "@/clients/api/api";

interface SubTitleComponentProps {
  isAuthenticated?: boolean;
}

export function SubTitleComponent({
  isAuthenticated = false,
}: SubTitleComponentProps) {
  const { highlitedWord, currentTranscript } = useZustandState();
  const [selectedWord, setSelectedWord] = useState<{
    word: string;
    pronunciation: string;
    definition: string;
  } | null>(null);
  const [saveStatus, setSaveStatus] = useState<
    "idle" | "saving" | "saved" | "done"
  >("idle");

  // Reset save status when selecting new word
  useEffect(() => {
    setSaveStatus("idle");
  }, [selectedWord?.word]);

  const handleWordClick = (word: string) => {
    setSelectedWord({
      word,
      pronunciation: "/ˌser.ənˈdɪp.ə.ti/",
      definition: "The occurrence of events by chance in a happy way",
    });
  };

  const handleSaveWord = useCallback(async () => {
    if (!selectedWord || !isAuthenticated) return;

    try {
      await api.addWordIntoFavorite(
        selectedWord.word,
        currentTranscript.transcript_id
      );
      setSaveStatus("saved");
      setTimeout(() => setSaveStatus("done"), 2000);
    } catch (error) {
      setSaveStatus("idle");
    }
  }, [selectedWord, isAuthenticated]);

  const mockSubtitle = {
    paragraph:
      "Click any word in this example sentence to see its definition. Try serendipity for a demonstration.",
    start_time: 0,
  };

  const displayTranscript = currentTranscript?.paragraph
    ? currentTranscript
    : mockSubtitle;

  return (
    <div className="bg-white border-2 border-gray-200 rounded-2xl shadow-lg p-6 sticky top-4 h-full">
      <div className="flex gap-3 items-center mb-6">
        <Captions className="w-6 h-6 text-gray-900" />
        <h3 className="text-xl font-semibold text-gray-900">Live Subtitles</h3>
      </div>

      <div className="space-y-6">
        <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
          <p className="text-gray-700 leading-relaxed">
            {displayTranscript.paragraph.split(" ").map((word, index) => {
              const cleanWord = word.replace(/[.,]/g, "");
              const isExampleWord = cleanWord.toLowerCase() === "serendipity";

              return (
                <span
                  key={index}
                  onClick={() => handleWordClick(cleanWord)}
                  className={cx(
                    "cursor-pointer hover:bg-gray-200 rounded px-1 py-0.5 transition-colors",
                    highlitedWord.includes(cleanWord) &&
                      "bg-blue-100 text-blue-600",
                    selectedWord?.word === cleanWord && "ring-2 ring-blue-300",
                    isExampleWord && "text-blue-500 font-medium"
                  )}
                >
                  {word}{" "}
                </span>
              );
            })}
          </p>
        </div>

        {selectedWord ? (
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-100 space-y-3 relative">
            {isAuthenticated && (
              <motion.button
                onClick={handleSaveWord}
                className="absolute top-3 right-3 p-1.5 hover:bg-gray-200 rounded-full transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                disabled={saveStatus === "saving" || saveStatus === "saved"}
              >
                {saveStatus === "saved" ? (
                  <CheckCircle className="w-5 h-5 text-green-500" />
                ) : saveStatus === "idle" ? (
                  <Bookmark className="w-5 h-5 text-gray-400 hover:text-blue-400" />
                ) : null}
              </motion.button>
            )}

            <div className="pr-8">
              <div className="flex items-baseline gap-2 mb-1">
                <span className="text-lg font-semibold text-gray-900">
                  {selectedWord.word}
                </span>
                <span className="text-sm text-gray-500">
                  {selectedWord.pronunciation}
                </span>
              </div>
              <p className="text-gray-700 text-sm leading-relaxed">
                {selectedWord.definition}
              </p>
            </div>
          </div>
        ) : (
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
            <div className="text-gray-500 text-sm text-center space-y-2">
              {!currentTranscript?.paragraph && (
                <p className="text-blue-500 font-medium mb-2">
                  ✨ Welcome to Pronunciation Helper
                </p>
              )}
              <p>Click any word to see:</p>
              <ul className="list-disc pl-4 mt-2 text-left space-y-1">
                <li>Detailed definition</li>
                <li>Pronunciation guide</li>
                <li>Usage examples</li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
