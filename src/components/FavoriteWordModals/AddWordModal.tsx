"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { FavoriteWordResponse } from "@/clients/types/apiTypes";

type Category = {
  id: string;
  name: string;
};

type AddWordModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSave: (note: FavoriteWordResponse) => void;
  initialData: FavoriteWordResponse;
  categories: Category[];
  isEditing?: boolean;
};

export default function AddWordModalProps({
  isOpen,
  onClose,
  onSave,
  initialData,
  categories,
  isEditing = false,
}: AddWordModalProps) {
  const [formData, setFormData] = useState<FavoriteWordResponse>(initialData);

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  const [newExample, setNewExample] = useState("");

  const handleChange = (
    field: keyof FavoriteWordResponse,
    value: string | string[] | number,
  ) => {
    setFormData({
      ...formData,
      [field]: value,
    });
  };

  const addExample = () => {
    if (newExample) {
      handleChange("example", newExample);
      setNewExample("");
    }
  };

  const removeExample = () => {
    handleChange("example", "None");
  };

  const handleSubmit = () => {
    onSave(formData);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>
            {isEditing ? "Edit Note" : "Create New Note"}
          </DialogTitle>
          <DialogDescription>
            {isEditing
              ? "Update your note details below."
              : "Add a new note to your collection."}
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="word"
              value={formData.word}
              onChange={(e) => handleChange("word", e.target.value)}
              placeholder="Note title"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="content">Content</Label>
            <Textarea
              id="content"
              value={formData.description}
              onChange={(e) => handleChange("description", e.target.value)}
              placeholder="Note content"
              className="min-h-[150px]"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="translation">Translation (Optional)</Label>
            <Input
              id="translation"
              value={formData.translation || ""}
              onChange={(e) => handleChange("translation", e.target.value)}
              placeholder="Translation in your native language"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="category">Category</Label>
            <Select
              value={formData.category}
              onValueChange={(value) => handleChange("category", value)}
            >
              <SelectTrigger id="category">
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category.id} value={category.id}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-2">
            <Label>Example Sentences</Label>
            <div className="space-y-2 mb-2">
              <div className="flex items-center gap-2">
                <div className="flex-1 bg-muted p-2 rounded-md text-sm">
                  {formData.example}
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => removeExample()}
                  className="shrink-0"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <div className="flex gap-2">
              <Input
                value={newExample}
                onChange={(e) => setNewExample(e.target.value)}
                placeholder="Add an example sentence"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    addExample();
                  }
                }}
              />
              <Button type="button" onClick={addExample} variant="outline">
                Add
              </Button>
            </div>
          </div>
          <div className="grid gap-2">
            <Label>Proficiency Level</Label>
            <div className="flex items-center gap-2">
              <input
                type="range"
                min="0"
                max="5"
                value={formData.proficiency}
                onChange={(e) =>
                  handleChange("proficiency", Number.parseInt(e.target.value))
                }
                className="flex-1"
              />
              <span className="w-8 text-center">{formData.proficiency}/5</span>
            </div>
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Beginner</span>
              <span>Advanced</span>
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSubmit}>
            {isEditing ? "Save Changes" : "Create Note"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
