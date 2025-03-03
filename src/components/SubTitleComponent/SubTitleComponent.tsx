"use client";

import { useCallback, useEffect, useState } from "react";
import { Captions, X, Bookmark, CheckCircle } from "lucide-react";
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
    synonyms?: string[];
  } | null>(null);

  const [saveStatus, setSaveStatus] = useState<"idle" | "saving" | "saved">(
    "idle",
  );
  const [showWordModal, setShowWordModal] = useState(false);

  // Reset save status when selecting new word
  useEffect(() => {
    setSaveStatus("idle");
  }, [selectedWord?.word]);

  const handleWordClick = (word: string) => {
    setSelectedWord({
      word,
      pronunciation: "/ˌser.ənˈdɪp.ə.ti/",
      definition: "The occurrence of events by chance in a happy way",
      synonyms: ["chance", "fortuity", "accident"],
    });
    setShowWordModal(true);
  };

  const handleSaveWord = useCallback(async () => {
    if (!selectedWord || !isAuthenticated) return;

    setSaveStatus("saving");
    try {
      await api.addWordIntoFavorite(
        selectedWord.word,
        currentTranscript.transcriptId,
      );
      setSaveStatus("saved");
    } catch (error) {
      setSaveStatus("idle");
    }
  }, [selectedWord, isAuthenticated]);

  // Close modal when clicking backdrop
  const handleCloseModal = useCallback(() => {
    setShowWordModal(false);
    setSelectedWord(null);
  }, []);

  const mockSubtitle = {
    paragraph:
      "Click any word in this example sentence to see its definition. Try serendipity for a demonstration.",
    startTime: 0,
  };

  const displayTranscript = currentTranscript?.paragraph
    ? currentTranscript
    : mockSubtitle;

  return (
    <div className="bg-white border-2 border-gray-200 rounded-2xl shadow-lg p-6 h-full">
      <div className="flex gap-3 items-center mb-6">
        <Captions className="w-6 h-6 text-gray-900" />
        <h3 className="text-xl font-semibold text-gray-900">Live Subtitles</h3>
      </div>

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
                  isExampleWord && "text-blue-500 font-medium",
                )}
              >
                {word}{" "}
              </span>
            );
          })}
        </p>
      </div>

      {/* Word Detail Modal */}
      {showWordModal && selectedWord && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
          onClick={handleCloseModal} // Close modal on backdrop click
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl shadow-xl max-w-md w-full"
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
          >
            <div className="p-6 space-y-4 relative">
              <button
                onClick={handleCloseModal}
                className="absolute top-4 right-4 p-1 hover:bg-gray-100 rounded-full"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>

              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">
                    {selectedWord.word}
                  </h3>
                  <p className="text-gray-500 text-sm mt-1">
                    {selectedWord.pronunciation}
                  </p>
                </div>
                {isAuthenticated && saveStatus !== "saved" && (
                  <motion.button
                    onClick={handleSaveWord}
                    className="p-1.5 hover:bg-gray-100 rounded-full"
                    whileHover={{ scale: 1.05 }}
                    disabled={saveStatus === "saving"}
                  >
                    {saveStatus === "saving" ? (
                      <span className="text-gray-400">Saving...</span>
                    ) : (
                      <Bookmark className="w-6 h-6 text-gray-400" />
                    )}
                  </motion.button>
                )}
                {saveStatus === "saved" && (
                  <CheckCircle className="w-6 h-6 text-green-500" />
                )}
              </div>

              <div className="space-y-3">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">
                    Definition
                  </h4>
                  <p className="text-gray-700 text-sm">
                    {selectedWord.definition}
                  </p>
                </div>

                {selectedWord.synonyms && (
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">
                      Synonyms
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedWord.synonyms.map((synonym) => (
                        <span
                          key={synonym}
                          className="px-2 py-1 bg-gray-100 text-gray-700 rounded-md text-sm"
                        >
                          {synonym}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
