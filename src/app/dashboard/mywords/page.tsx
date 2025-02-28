// app/words/page.tsx
"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  BookOpen,
  Plus,
  Star,
  Search,
  Filter,
  List,
  LayoutGrid,
  Edit,
  Trash,
  TextCursorInput,
  BookType,
  ClipboardEdit,
  Mic,
  X,
} from "lucide-react";

interface Word {
  id: string;
  word: string;
  pronunciation: string;
  definition: string;
  example: string;
  sourceType: "video" | "manual";
  createdAt: Date;
  mastered: boolean;
  tags: string[];
}

// Generate mock data
const generateMockWords = (count: number): Word[] => {
  const words: Word[] = [];
  const prefixes = [
    "Auto",
    "Bio",
    "Cyber",
    "Eco",
    "Geo",
    "Neuro",
    "Photo",
    "Tele",
    "Thermo",
  ];
  const suffixes = [
    "logy",
    "graphy",
    "meter",
    "scope",
    "sphere",
    "genesis",
    "phobia",
    "therapy",
  ];
  const tags = [
    "noun",
    "verb",
    "adjective",
    "technical",
    "science",
    "literature",
  ];

  for (let i = 1; i <= count; i++) {
    const prefix = prefixes[Math.floor(Math.random() * prefixes.length)];
    const suffix = suffixes[Math.floor(Math.random() * suffixes.length)];
    words.push({
      id: `word-${i}`,
      word: `${prefix}${suffix}`,
      pronunciation: `/${prefix.toLowerCase()}.${suffix.toLowerCase()}/`,
      definition: `The study or measurement of ${prefix.toLowerCase()}ic ${suffix.toLowerCase()} phenomena`,
      example: `The ${prefix}${suffix} conference attracted researchers from around the world.`,
      sourceType: i % 2 === 0 ? "video" : "manual",
      createdAt: new Date(Date.now() - Math.random() * 1000000000),
      mastered: Math.random() > 0.5,
      tags: [
        tags[Math.floor(Math.random() * tags.length)],
        tags[Math.floor(Math.random() * tags.length)],
      ],
    });
  }
  return words;
};

export default function WordsPage() {
  const [viewMode, setViewMode] = useState<"compact" | "detailed">("detailed");
  const [showAddModal, setShowAddModal] = useState(false);
  const [filter, setFilter] = useState<"all" | "video" | "manual">("all");
  const [searchQuery, setSearchQuery] = useState("");

  // Generate 100 mock words
  const words = useMemo(() => generateMockWords(100), []);

  const filteredWords = words.filter((word) => {
    const matchesSearch = word.word
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesFilter = filter === "all" || word.sourceType === filter;
    return matchesSearch && matchesFilter;
  });

  const WordCompact = ({ word }: { word: Word }) => (
    <motion.div
      className="bg-white p-3 rounded-lg border border-gray-200 hover:border-blue-200 transition-colors"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-medium">{word.word}</h3>
          <p className="text-sm text-gray-500">{word.pronunciation}</p>
        </div>
        {word.mastered && <Star className="w-4 h-4 text-yellow-500" />}
      </div>
    </motion.div>
  );

  const WordDetailed = ({ word }: { word: Word }) => (
    <motion.div
      className="bg-white p-4 rounded-xl border border-gray-200 hover:border-blue-200 transition-all"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="flex justify-between items-start mb-3">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">
            {word.word}
            <span className="ml-2 text-sm font-normal text-blue-600">
              {word.sourceType === "video" ? "🎥 Video" : "✍️ Manual"}
            </span>
          </h3>
          <p className="text-sm text-gray-500">{word.pronunciation}</p>
        </div>
        {word.mastered && (
          <Star className="w-5 h-5 text-yellow-500 fill-yellow-100" />
        )}
      </div>

      {viewMode === "detailed" && (
        <div className="space-y-2">
          <p className="text-gray-600 text-sm">{word.definition}</p>
          <div className="bg-gray-50 p-2 rounded-lg">
            <p className="text-xs text-gray-500 italic">"{word.example}"</p>
          </div>
          <div className="flex flex-wrap gap-2 mt-2">
            {word.tags.map((tag) => (
              <span
                key={tag}
                className="px-2 py-1 bg-blue-50 text-blue-600 text-xs rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      )}

      <div className="mt-4 flex justify-end gap-2">
        <Button variant="ghost" size="sm" className="text-gray-500">
          <Edit className="w-4 h-4 mr-1" />
          Edit
        </Button>
        <Button variant="ghost" size="sm" className="text-red-500">
          <Trash className="w-4 h-4 mr-1" />
          Remove
        </Button>
      </div>
    </motion.div>
  );

  const AddWordModal = () => (
    <motion.div
      className="fixed inset-0 bg-black/50 flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        initial={{ y: 20 }}
        animate={{ y: 0 }}
        className="bg-white rounded-xl w-full max-w-md shadow-xl"
      >
        <div className="p-6 border-b border-gray-200 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <BookOpen className="w-6 h-6 text-blue-600" />
            <h2 className="text-xl font-bold">Add New Word</h2>
          </div>
          <button
            onClick={() => setShowAddModal(false)}
            className="p-1 hover:bg-gray-100 rounded-lg"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        <form className="p-6 space-y-4">
          <div className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <ClipboardEdit className="w-5 h-5 text-blue-500" />
                <div className="flex-1">
                  <label className="block text-sm font-medium mb-1">Word</label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 rounded-lg border border-gray-200"
                    required
                  />
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Mic className="w-5 h-5 text-blue-500" />
                <div className="flex-1">
                  <label className="block text-sm font-medium mb-1">
                    Pronunciation
                  </label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 rounded-lg border border-gray-200"
                  />
                </div>
              </div>

              <div className="flex items-center gap-3">
                <BookType className="w-5 h-5 text-blue-500" />
                <div className="flex-1">
                  <label className="block text-sm font-medium mb-1">
                    Definition
                  </label>
                  <textarea
                    className="w-full px-3 py-2 rounded-lg border border-gray-200"
                    rows={3}
                    required
                  />
                </div>
              </div>

              <div className="flex items-center gap-3">
                <TextCursorInput className="w-5 h-5 text-blue-500" />
                <div className="flex-1">
                  <label className="block text-sm font-medium mb-1">
                    Example Sentence
                  </label>
                  <textarea
                    className="w-full px-3 py-2 rounded-lg border border-gray-200"
                    rows={2}
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-4">
              <Button
                type="button"
                variant="ghost"
                onClick={() => setShowAddModal(false)}
                className="text-gray-600 hover:bg-gray-100"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="bg-blue-600 text-white hover:bg-blue-700 flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                Add Word
              </Button>
            </div>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-white text-gray-900 flex">
      {/* Shared Sidebar */}
      {showAddModal && <AddWordModal />}

      <main className="flex-1 p-8 bg-gray-50">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold">Vocabulary Management</h1>
            <p className="text-gray-500 mt-1">
              Showing {filteredWords.length} of {words.length} words
            </p>
          </div>
          <Button
            onClick={() => setShowAddModal(true)}
            className="bg-blue-600 text-white hover:bg-blue-700"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add New Word
          </Button>
        </div>

        {/* Controls */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search words..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            />
          </div>

          <div className="flex gap-2 items-center">
            <Button
              variant="ghost"
              onClick={() =>
                setViewMode(viewMode === "compact" ? "detailed" : "compact")
              }
              className="text-gray-500"
            >
              {viewMode === "compact" ? (
                <LayoutGrid className="w-5 h-5" />
              ) : (
                <List className="w-5 h-5" />
              )}
            </Button>
            <Filter className="text-gray-500" />
            <select
              value={filter}
              onChange={(e) =>
                setFilter(e.target.value as "all" | "video" | "manual")
              }
              className="rounded-lg border border-gray-200 px-4 py-2 bg-white"
            >
              <option value="all">All Sources</option>
              <option value="video">From Videos</option>
              <option value="manual">Manual Entries</option>
            </select>
          </div>
        </div>

        {/* Words Grid */}
        <div
          className={`grid gap-3 ${
            viewMode === "detailed"
              ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
              : "grid-cols-2 md:grid-cols-4 lg:grid-cols-5"
          }`}
        >
          {filteredWords.map((word) =>
            viewMode === "detailed" ? (
              <WordDetailed key={word.id} word={word} />
            ) : (
              <WordCompact key={word.id} word={word} />
            ),
          )}
        </div>

        {/* Add Word Modal (keep from previous example) */}
      </main>
    </div>
  );
}
