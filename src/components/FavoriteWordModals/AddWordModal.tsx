// components/AddWordModal/AddWordModal.tsx
"use client";

import { motion } from "framer-motion";
import { Button } from "../ui/button";
import { toast } from "@/hooks/use-toast";
import api from "@/clients/api/api";
import { useState } from "react";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Label } from "../ui/label";
import {
  BookOpen,
  BookType,
  ClipboardEdit,
  Mic,
  Plus,
  TextCursorInput,
  X,
} from "lucide-react";
import { FavoriteWordResponse } from "@/clients/types/apiTypes";


interface AddWordModalProps {
  setShowAddModal: (show: boolean) => void;
  onWordAdded: (newWord: FavoriteWordResponse) => void;
}

const AddWordModal = ({ setShowAddModal, onWordAdded }: AddWordModalProps) => {
  const [word, setWord] = useState("");
  const [definition, setDefinition] = useState("");
  const [example, setExample] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await api.addWordIntoFavorite({
        word, 
        source: "MANUAL",
        definition,
        example
      });
      if (response) {
        onWordAdded(response);
        setShowAddModal(false);
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
  return (
    <motion.div
      className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
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

        <form className="p-6 space-y-4" onSubmit={handleSubmit}>
          <div className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <ClipboardEdit className="w-5 h-5 text-blue-500" />
                <div className="flex-1">
                  <Label className="block text-sm font-medium mb-1">Word</Label>
                  <Input
                    type="text"
                    value={word}
                    onChange={(e) => setWord(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-gray-200"
                    required
                  />
                </div>
              </div>
              <div className="flex items-center gap-3">
                <BookType className="w-5 h-5 text-blue-500" />
                <div className="flex-1">
                  <Label className="block text-sm font-medium mb-1">
                    Definition
                  </Label>
                  <Textarea
                    value={definition}
                    onChange={(e) => setDefinition(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-gray-200"
                    rows={3}
                  />
                </div>
              </div>

              <div className="flex items-center gap-3">
                <TextCursorInput className="w-5 h-5 text-blue-500" />
                <div className="flex-1">
                  <Label className="block text-sm font-medium mb-1">
                    Example Sentence
                  </Label>
                  <Textarea
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
};

export default AddWordModal;
