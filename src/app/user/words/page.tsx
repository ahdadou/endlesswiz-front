"use client";

import { useState, useCallback, useEffect, Fragment } from "react";
import { Button } from "@/components/ui/button";
import { Plus, Search, BookOpen, List, LayoutGrid } from "lucide-react";
import api from "@/clients/api/api";
import { FavoriteWordResponse } from "@/clients/types/apiTypes";
import AddWordModal from "@/components/FavoriteWordModals/AddWordModal";
import { toast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import PracticeDropdown from "@/components/PracticeDropdown/PracticeDropdown";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import NoteCard from "@/components/FavoriteWordModals/NoteCard";
import { useIsMobile } from "@/hooks/use-mobile";

const categories = [
  { id: "VOCABULARY", name: "Vocabulary" },
  { id: "GRAMMAR", name: "Grammar" },
  { id: "IDIOMS", name: "Idioms" },
  { id: "EMAIL", name: "Email Writing" },
  { id: "PRESENTATIONS", name: "Presentations" },
  { id: "PHRASES", name: "Useful Phrases" },
];

const initialWord: FavoriteWordResponse = {
  word: "",
  source: "MANUAL",
  description: "",
  example: "",
  category: "VOCABULARY",
  proficiency: 0,
  translation: "",
};

export type ViewMode = "CARD" | "LIST";

export default function WordsPage() {
  const router = useRouter();
  const isMobile = useIsMobile();
  const [editingWord, setEditingWord] =
    useState<FavoriteWordResponse>(initialWord);
  const [searchQuery, setSearchQuery] = useState("");
  const [favoriteWords, setFavoriteWords] = useState<FavoriteWordResponse[]>(
    [],
  );
  const [filteredWords, setFilteredWords] = useState<FavoriteWordResponse[]>(
    [],
  );

  const [activeTab, setActiveTab] = useState("all");
  const [isNoteFormOpen, setIsNoteFormOpen] = useState(false);
  const [viewMode, setViewMode] = useState<ViewMode>("CARD");

  const fetchFavoriteWords = useCallback(async () => {
    try {
      const response = await api.fetchFavoriteWord();
      setFavoriteWords(response.favoriteWords);
    } catch (err) {
      toast({
        title: "Error fetching words",
        description: "Failed to fetch favorite words.",
        variant: "destructive",
      });
    }
  }, []);

  useEffect(() => {
    fetchFavoriteWords();
  }, [fetchFavoriteWords]);

  const handleDeleteWord = async (wordId: string) => {
    try {
      const response = await api.deleteWordIntoFavorite(wordId);
      if (response) {
        setFavoriteWords((prev) => prev.filter((word) => word.id !== wordId));
        toast({
          title: "Word deleted!",
          description: "Your word has been successfully deleted.",
        });
      } else {
        toast({
          title: "Something Wrong!",
          description: "this word can not deleted.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Something Wrong!",
        description: "this word can not deleted.",
        variant: "destructive",
      });
    }
  };

  const handleSubmit = async (request: FavoriteWordResponse) => {
    if (editingWord?.id) {
      handleUpdateNote(request);
    } else {
      handleAddNote(request);
    }
    setIsNoteFormOpen(false);
    setEditingWord(initialWord);
  };

  const handleAddNote = async (request: FavoriteWordResponse) => {
    try {
      const response = await api.addWordIntoFavorite({
        id: request.id,
        word: request.word,
        source: request.source,
        description: request.description,
        example: request.example,
        category: request.category || "VOCABULARY",
        proficiency: request.proficiency,
        translation: request.translation,
      });
      if (response) {
        setFavoriteWords((prev) => [...prev, response]);
        toast({
          title: "Word Added!",
          description: "Your word has been successfully added.",
        });
      }
    } catch (error: any) {
      toast({
        title: "Error adding word",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const handleUpdateNote = async (request: FavoriteWordResponse) => {
    try {
      const response = await api.updateWordIntoFavorite({
        id: request.id,
        word: request.word,
        source: request.source,
        description: request.description,
        example: request.example,
        category: request.category,
        proficiency: request.proficiency,
        translation: request.translation,
      });
      if (response) {
        setFavoriteWords((prev) =>
          prev.map((word) => (word.id === response.id ? response : word)),
        );
        toast({
          title: "Word Updated!",
          description: "Your changes have been saved successfully.",
        });
      }
    } catch (error: any) {
      toast({
        title: "Error updating word",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    const filtered = favoriteWords.filter((note) => {
      const matchesSearch =
        note.word?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        note.example?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        note.description?.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesTab = activeTab === "all" || activeTab === note.category;
      return matchesSearch && matchesTab;
    });
    setFilteredWords(
      filtered.map((word) => ({
        ...word,
        viewMode: viewMode,
      })),
    );
  }, [searchQuery, activeTab, favoriteWords]);

  const handlePractice = (mode: string) => {
    router.push(`/user/practice/${mode}/words-library`);
  };

  const splitIntoColumns = (array: FavoriteWordResponse[]) => {
    const numColumns = isMobile ? 1 : 3; // Adjust the number of columns based on screen size
    const columns: FavoriteWordResponse[][] = Array.from(
      { length: numColumns },
      () => [],
    );
    array.forEach((item, index) => {
      columns[index % numColumns].push(item);
    });
    return columns;
  };

  const columns = splitIntoColumns(filteredWords);

  return (
    <div className="min-h-screen lg:p-8">
      <div className="flex flex-col gap-6 mb-8">
        <div className="flex justify-between flex-col sm:flex-row gap-5 sm:items-center">
          <div>
            <h1 className="text-3xl font-bold">My Notes & Practice</h1>
            <p className="text-muted-foreground">
              Save, organize, and actively practice important vocabulary,
              phrases, and grammar rules.
            </p>
          </div>

          <div className="flex flex-row gap-2">
            <Button
              onClick={() => {
                setEditingWord(editingWord);
                setIsNoteFormOpen(true);
              }}
              className="flex items-center gap-2"
            >
              <Plus className="w-5 h-5" />
              Add Word
            </Button>

            <div className="flex gap-2">
              <PracticeDropdown
                hasNoWords={favoriteWords.length <= 0}
                handlePractice={handlePractice}
              />
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search words..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200"
            />
          </div>

          <div className="flex items-center gap-2">
            {/* Tabs for desktop */}
            <div className="hidden sm:block">
              <Tabs
                defaultValue="all"
                value={activeTab}
                onValueChange={setActiveTab}
              >
                <TabsList className="flex flex-wrap bg-forest/5">
                  <TabsTrigger value="all">All</TabsTrigger>
                  {categories.map((category) => (
                    <TabsTrigger key={category.id} value={category.id}>
                      {category.name}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </Tabs>
            </div>
          </div>

          <div className="flex flex-row">
            <div className="sm:hidden w-full px-2">
              <Select value={activeTab} onValueChange={setActiveTab}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select category">
                    {activeTab === "all"
                      ? "All Categories"
                      : categories.find((c) => c.id === activeTab)?.name ||
                        "All Categories"}
                  </SelectValue>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {categories.map((category) => (
                    <SelectItem key={category.id} value={category.id}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center border rounded-md">
              <Button
                variant={viewMode === "CARD" ? "default" : "ghost"}
                size="sm"
                className="h-8 px-2 rounded-r-none"
                onClick={() => setViewMode("CARD")}
              >
                <LayoutGrid className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === "LIST" ? "default" : "ghost"}
                size="sm"
                className="h-8 px-2 rounded-l-none"
                onClick={() => setViewMode("LIST")}
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="h-[100vh] flex gap-4">
        {filteredWords.length > 0 ? (
          columns.map((column, columnIndex) => (
            <div key={columnIndex} className="flex flex-col gap-4 flex-1">
              {column.map((note) => (
                <NoteCard
                  key={note.id}
                  note={note}
                  setEditingWord={setEditingWord}
                  setIsNoteFormOpen={setIsNoteFormOpen}
                  handleDeleteWord={handleDeleteWord}
                  viewMode={viewMode}
                />
              ))}
            </div>
          ))
        ) : (
          <div className="col-span-full flex flex-col items-center justify-center py-12 text-center">
            <BookOpen className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium">No notes found</h3>
            <p className="text-muted-foreground mt-1">
              {searchQuery
                ? `No notes match your search for "${searchQuery}"`
                : "You haven't created any notes in this category yet"}
            </p>
            <Button className="mt-4" onClick={() => setIsNoteFormOpen(true)}>
              <Plus className="mr-2 h-4 w-4" /> Create Your First Note
            </Button>
          </div>
        )}
      </div>
      <AddWordModal
        isOpen={isNoteFormOpen}
        onClose={() => {
          setIsNoteFormOpen(false);
          setEditingWord(initialWord);
        }}
        onSave={handleSubmit}
        initialData={editingWord}
        categories={categories}
        isEditing={!!editingWord}
      />
    </div>
  );
}
