// app/words/page.tsx
"use client";

import { useState, useMemo, useCallback, useEffect } from "react";
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
} from "lucide-react";
import api from "@/clients/api/api";
import { FavoriteWordResponse } from "@/clients/types/apiTypes";
import AddWordModal from "@/components/FavoriteWordModals/AddWordModal";
import EditWordModal from "@/components/FavoriteWordModals/EditWordModal";

const WordCard = ({
  word,
  viewMode,
  onEdit,
  onDelete,
}: {
  word: FavoriteWordResponse;
  viewMode: "compact" | "detailed";
  onEdit: (word: FavoriteWordResponse) => void;
  onDelete: (wordId: string) => void;
}) => {
  const CardContainer = ({ children }: { children: React.ReactNode }) => (
    <motion.div
      className="bg-white rounded-lg border border-gray-200 hover:border-blue-200 transition-colors"
      initial={{ opacity: 0, y: viewMode === "detailed" ? 20 : 0 }}
      animate={{ opacity: 1, y: 0 }}
    >
      {children}
    </motion.div>
  );

  if (viewMode === "compact") {
    return (
      <CardContainer>
        <div className="p-3">
          <div className="flex items-center justify-between">
            <h3 className="font-medium text-gray-800">{word.word}</h3>
            {word.mastered && <Star className="w-4 h-4 text-yellow-500" />}
          </div>
        </div>
      </CardContainer>
    );
  }

  return (
    <CardContainer>
      <div className="p-4">
        <div className="flex justify-between items-start mb-3">
          <div className="space-y-1">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
              {word.word}
              <span className="text-sm font-medium text-blue-600 px-2 py-1 bg-blue-50 rounded-full">
                {word.source === "VIDEO" ? "🎥 Video" : "✍️ Manual"}
              </span>
            </h3>
            <div className="text-sm text-gray-600">
              {word.description && (
                <p className="mb-2">
                  <span className="font-medium">Description:</span>{" "}
                  {word.description}
                </p>
              )}
              {word.example && (
                <p>
                  <span className="font-medium">Example:</span> {word.example}
                </p>
              )}
            </div>
          </div>
          {word.mastered && (
            <Star className="w-5 h-5 text-yellow-500 fill-yellow-100 shrink-0" />
          )}
        </div>

        <div className="flex justify-end gap-2">
          <Button
            variant="ghost"
            size="sm"
            className="text-gray-500 hover:bg-gray-50"
            onClick={() => onEdit(word)}
          >
            <Edit className="w-4 h-4 mr-1" />
            Edit
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="text-red-500 hover:bg-red-50"
            onClick={() => onDelete(word.id)}
          >
            <Trash className="w-4 h-4 mr-1" />
            Remove
          </Button>
        </div>
      </div>
    </CardContainer>
  );
};

export default function WordsPage() {
  const [viewMode, setViewMode] = useState<"compact" | "detailed">("detailed");
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingWord, setEditingWord] = useState<FavoriteWordResponse | null>(
    null,
  );
  const [filter, setFilter] = useState<"all" | "video" | "manual">("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [favoriteWords, setFavoriteWords] = useState<FavoriteWordResponse[]>(
    [],
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchFavoriteWords = useCallback(async () => {
    try {
      const response = await api.fetchFavoriteWord();
      setFavoriteWords(response.favoriteWords);
    } catch (err) {
      setError("Failed to fetch words");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchFavoriteWords();
  }, [fetchFavoriteWords]);

  const handleDeleteWord = async (wordId: string) => {
    try {
      await api.deleteWordIntoFavorite(wordId);
      setFavoriteWords((prev) => prev.filter((word) => word.id !== wordId));
    } catch (error) {
      setError("Failed to delete word");
    }
  };

  const handleAddWord = (newWord: FavoriteWordResponse) => {
    setFavoriteWords((prev) => [...prev, newWord]);
  };

  const handleUpdateWord = (updatedWord: FavoriteWordResponse) => {
    setFavoriteWords((prev) =>
      prev.map((word) => (word.id === updatedWord.id ? updatedWord : word)),
    );
  };

  const filteredWords = useMemo(
    () =>
      favoriteWords.filter((word) => {
        const matchesSearch = word.word
          .toLowerCase()
          .includes(searchQuery.toLowerCase());
        const matchesFilter =
          filter === "all" || word.source === filter.toUpperCase();
        return matchesSearch && matchesFilter;
      }),
    [favoriteWords, searchQuery, filter],
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="p-8 max-w-7xl mx-auto">
        <div className="flex flex-col gap-6 mb-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Vocabulary Manager
              </h1>
              <p className="text-gray-500 mt-2">
                {filteredWords.length} words displayed of {favoriteWords.length}
              </p>
            </div>
            <Button
              onClick={() => setShowAddModal(true)}
              className="bg-blue-600 hover:bg-blue-700 flex items-center gap-2"
            >
              <Plus className="w-5 h-5" />
              Add Word
            </Button>
          </div>

          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search words..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div className="flex gap-2 items-center">
              <Button
                variant="outline"
                onClick={() =>
                  setViewMode((prev) =>
                    prev === "compact" ? "detailed" : "compact",
                  )
                }
                className="flex items-center gap-2"
              >
                {viewMode === "compact" ? (
                  <>
                    <LayoutGrid className="w-5 h-5" />
                    <span>Grid View</span>
                  </>
                ) : (
                  <>
                    <List className="w-5 h-5" />
                    <span>List View</span>
                  </>
                )}
              </Button>
              <select
                value={filter}
                onChange={(e) =>
                  setFilter(e.target.value as "all" | "video" | "manual")
                }
                className="rounded-lg border border-gray-200 px-4 py-2 bg-white focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Sources</option>
                <option value="video">From Videos</option>
                <option value="manual">Manual Entries</option>
              </select>
            </div>
          </div>
        </div>

        <div
          className={`grid gap-4 ${viewMode === "detailed" ? "grid-cols-1 lg:grid-cols-2 xl:grid-cols-3" : "grid-cols-2 md:grid-cols-4 lg:grid-cols-5"}`}
        >
          {filteredWords.map((word) => (
            <WordCard
              key={word.id}
              word={word}
              viewMode={viewMode}
              onEdit={setEditingWord}
              onDelete={handleDeleteWord}
            />
          ))}
        </div>

        {showAddModal && (
          <AddWordModal
            setShowAddModal={setShowAddModal}
            onWordAdded={handleAddWord}
          />
        )}

        {editingWord && (
          <EditWordModal
            word={editingWord}
            setShowEditModal={setEditingWord}
            onWordUpdated={handleUpdateWord}
          />
        )}
      </main>
    </div>
  );
}
