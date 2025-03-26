// components/FavoriteWordModals/EditWordModal.tsx
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
  X,
  Save,
  Edit,
  TextCursorInput,
  BookType,
  ClipboardEdit,
} from "lucide-react";
import { FavoriteWordResponse } from "@/clients/types/apiTypes";

interface EditWordModalProps {
  word: FavoriteWordResponse;
  setShowEditModal: (word: FavoriteWordResponse | null) => void;
  onWordUpdated: (updatedWord: FavoriteWordResponse) => void;
}

const EditWordModal = ({
  word,
  setShowEditModal,
  onWordUpdated,
}: EditWordModalProps) => {
  const [formData, setFormData] = useState({
    word: word.word,
    description: word.description || "",
    example: word.example || "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const updatedWord = await api.updateWordIntoFavorite({
        ...formData,
        id: word.id,
        source: word.source,
      });

      onWordUpdated(updatedWord);
      setShowEditModal(null);
      toast({
        title: "Word Updated!",
        description: "Your changes have been saved successfully.",
      });
    } catch (error: any) {
      toast({
        title: "Update Failed",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  return (
    <motion.div
      className="fixed inset-0 flex items-center justify-center p-4 z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        initial={{ y: 20 }}
        animate={{ y: 0 }}
        className="rounded-xl w-full max-w-md shadow-xl bg-white dark:bg-forest text-forest-700 dark:text-white"
      >
        <div className="p-6 border-b border-gray-200 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <Edit className="w-6 h-6" />
            <span className="text-xl font-bold">Edit Word</span>
          </div>
          <button
            onClick={() => setShowEditModal(null)}
            className="p-1 hover:bg-gray-100 rounded-lg"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        <form className="p-6 space-y-4" onSubmit={handleSubmit}>
          <div className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <ClipboardEdit className="w-5 h-5" />
                <div className="flex-1">
                  <Label className="block text-sm font-medium mb-1">Word</Label>
                  <Input
                    value={formData.word}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, word: e.target.value }))
                    }
                    className="w-full px-3 py-2 rounded-lg border border-gray-200"
                    required
                  />
                </div>
              </div>

              <div className="flex items-center gap-3">
                <BookType className="w-5 h-5 " />
                <div className="flex-1">
                  <Label className="block text-sm font-medium mb-1">
                    Description
                  </Label>
                  <Textarea
                    value={formData.description}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        description: e.target.value,
                      }))
                    }
                    rows={3}
                    className="w-full px-3 py-2 rounded-lg border border-gray-200"
                  />
                </div>
              </div>

              <div className="flex items-center gap-3">
                <TextCursorInput className="w-5 h-5" />
                <div className="flex-1">
                  <Label className="block text-sm font-medium mb-1">
                    Example
                  </Label>
                  <Textarea
                    className="w-full px-3 py-2 rounded-lg border border-gray-200"
                    value={formData.example}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        example: e.target.value,
                      }))
                    }
                    rows={2}
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => setShowEditModal(null)}
              >
                Cancel
              </Button>
              <Button type="submit" className="flex items-center gap-2">
                <Save className="w-4 h-4" />
                Save Changes
              </Button>
            </div>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
};

export default EditWordModal;
