"use client";

import { useCallback, useEffect, useState } from "react";
import { Bookmark, CheckCircle, Loader } from "lucide-react";
import { motion } from "framer-motion";
import api from "@/clients/api/api";
import TextToSpeech from "../TextToSpeech/TextToSpeech";
import { DictionaryResponse } from "@/clients/types/apiTypes";
import { cleanText } from "@/utils/StringUtils";

interface WordDictionaryComponentProps {
  handleCloseModal: () => void;
  word: string;
  transcriptId?: string;
  isPublicPage?: boolean;
}

export function WordDictionaryComponent({
  handleCloseModal,
  word,
  transcriptId,
  isPublicPage,
}: WordDictionaryComponentProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedWord, setSelectedWord] = useState<{
    word: string;
    data: DictionaryResponse;
  } | null>(null);
  const [saveStatus, setSaveStatus] = useState<"idle" | "saving" | "saved">(
    "idle",
  );

  // Memoized function to fetch word dictionary data
  const fetchWordDictionary = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = isPublicPage
        ? await api.fetchPublicWordDictionary(cleanText(word))
        : await api.fetchWordDictionary(cleanText(word));
      setSelectedWord({ word, data });
    } catch (error) {
      console.error("Failed to fetch word details:", error);
      setSelectedWord(null);
    } finally {
      setIsLoading(false);
    }
  }, [word]);

  // Fetch data when word changes
  useEffect(() => {
    fetchWordDictionary();
  }, [fetchWordDictionary]);

  // Memoized function to handle saving the word
  const handleSaveWord = useCallback(async () => {
    setSaveStatus("saving");
    try {
      await api.addWordIntoFavorite({
        word: word,
        source: "VIDEO",
        category: "VOCABULARY",
        transcript_id: transcriptId,
      });
      setSaveStatus("saved");
    } catch (error) {
      setSaveStatus("idle");
    }
  }, [word, transcriptId]);

  // Smooth scroll to part of speech section
  const handleScrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  // Reset save status when word changes
  useEffect(() => {
    setSaveStatus("idle");
  }, [selectedWord?.word]);

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      onClick={handleCloseModal}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="rounded-xl shadow-2xl max-w-2xl w-full max-h-[70vh] flex flex-col bg-white dark:bg-forest-500 border border-gray-200 dark:border-forest-600"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative overflow-y-auto">
          {isLoading ? (
            <div className="flex items-center justify-center h-32">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-forest-500"></div>
            </div>
          ) : selectedWord ? (
            <>
              {/* Header Section */}
              <div className="flex items-start justify-between sticky top-0 p-4 bg-white dark:bg-forest-500 z-20 shadow-sm">
                <div className="pr-4">
                  <div className="flex items-center gap-2">
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                      {selectedWord.word}
                    </h3>
                    <TextToSpeech text={selectedWord.word} />
                  </div>
                  <div className="mt-2 flex gap-2 flex-wrap">
                    {selectedWord.data.entries.map((entry, index) => (
                      <button
                        key={index}
                        onClick={() => handleScrollToSection(`pos-${index}`)}
                        className="px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-forest-800 hover:bg-blue-200 transition-colors duration-200"
                      >
                        {entry.partOfSpeech}
                      </button>
                    ))}
                  </div>
                </div>
                <motion.button
                  onClick={handleSaveWord}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-forest-600 rounded-lg shrink-0 transition-colors duration-200"
                  whileHover={{ scale: 1.05 }}
                  disabled={saveStatus !== "idle"}
                  title={saveStatus === "saved" ? "Saved" : "Save to favorites"}
                  aria-label={
                    saveStatus === "saved" ? "Saved" : "Save to favorites"
                  }
                >
                  {saveStatus === "saving" ? (
                    <Loader className="w-6 h-6 text-gray-400 animate-spin" />
                  ) : saveStatus === "saved" ? (
                    <CheckCircle className="w-6 h-6 text-green-500" />
                  ) : (
                    <Bookmark className="w-6 h-6 text-gray-400 hover:text-forest-500 transition-colors duration-200" />
                  )}
                </motion.button>
              </div>

              {/* Content Section with Padding */}
              <div className="space-y-6 p-6">
                {selectedWord.data.entries.map((entry, index) => (
                  <div
                    key={index}
                    id={`pos-${index}`}
                    className="border-l-4 pl-4 pt-2 scroll-mt-16"
                  >
                    <h4 className="text-lg font-semibold  mb-3">
                      {entry.partOfSpeech}
                    </h4>
                    <div className="space-y-4">
                      {entry.definitions.map((definition, defIndex) => (
                        <div key={defIndex} className="group">
                          <div className="flex items-start gap-2">
                            <div className="mt-1 w-2 h-2 rounded-full bg-forest-200 shrink-0"></div>
                            <div className="flex-1">
                              <p className="text-gray-800 dark:text-gray-200 font-medium leading-relaxed">
                                {definition.definition}
                              </p>
                              {definition.examples.length > 0 && (
                                <div className="mt-2 ml-4 space-y-2">
                                  {definition.examples.map(
                                    (example, exIndex) => (
                                      <div
                                        key={exIndex}
                                        className="flex items-start gap-2 text-gray-600 dark:text-gray-400"
                                      >
                                        <span className="text-xs mt-1">•</span>
                                        <p className="text-sm italic leading-relaxed">
                                          "{example}"
                                        </p>
                                      </div>
                                    ),
                                  )}
                                </div>
                              )}
                            </div>
                          </div>
                          {defIndex < entry.definitions.length - 1 && (
                            <hr className="my-4 border-gray-200 dark:border-forest-600" />
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className="p-6 rounded-lg h-[50vh] w-full flex flex-col justify-center items-center text-red-600 dark:text-red-400">
              <p>Failed to load word details</p>
              <button
                onClick={fetchWordDictionary}
                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-forest-600 transition-colors duration-200"
              >
                Retry
              </button>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
