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
import { X, Save } from "lucide-react";
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
      className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        initial={{ y: 20 }}
        animate={{ y: 0 }}
        className="rounded-xl w-full max-w-md shadow-xl"
      >
        <div className="p-6 border-b border-gray-200 flex justify-between items-center">
          <div className="flex items-center gap-3">
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
              <div>
                <Label className="block text-sm font-medium mb-1">Word</Label>
                <Input
                  value={formData.word}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, word: e.target.value }))
                  }
                  className="w-full"
                  required
                />
              </div>
              <div>
                <Label className="block text-sm font-medium mb-1">
                  description
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
                />
              </div>
              <div>
                <Label className="block text-sm font-medium mb-1">
                  Example
                </Label>
                <Textarea
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

            <div className="flex justify-end gap-3 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => setShowEditModal(null)}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 flex items-center gap-2"
              >
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
