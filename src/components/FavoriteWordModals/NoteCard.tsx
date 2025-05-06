"use client";

import { ViewMode } from "@/app/user/words/page";
import { FavoriteWordResponse } from "@/clients/types/apiTypes";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Edit, Eye, EyeClosedIcon, Star, Stars, Trash2 } from "lucide-react";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { ScrollArea } from "../ui/scroll-area";
import { useEffect, useState } from "react";
import { cx } from "class-variance-authority";

interface NoteCardProps {
  note: FavoriteWordResponse;
  setEditingWord: any;
  setIsNoteFormOpen: any;
  handleDeleteWord: (wordId: string) => Promise<void>;
  viewMode: ViewMode;
}

const NoteCard = ({
  note,
  setEditingWord,
  setIsNoteFormOpen,
  handleDeleteWord,
  viewMode,
}: NoteCardProps) => {
  const [currentViewMode, setCurrentViewMode] = useState<ViewMode>(viewMode);

  useEffect(() => {
    setCurrentViewMode(viewMode);
  }, [viewMode]);

  return (
    <Card key={note.id} className="flex flex-col">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2">
            <CardTitle className="text-lg">{note.word}</CardTitle>
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-3 w-3 ${
                    i < note.proficiency
                      ? "fill-yellow-400 text-yellow-400"
                      : "text-muted-foreground/30"
                  }`}
                />
              ))}
            </div>
          </div>
          <div className="flex gap-1">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => {
                setCurrentViewMode((prev) =>
                  prev === "CARD" ? "LIST" : "CARD",
                );
              }}
            >
              {currentViewMode === "CARD" ? (
                <EyeClosedIcon className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => {
                setEditingWord(note);
                setIsNoteFormOpen(true);
              }}
            >
              <Edit className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => {
                note?.id && handleDeleteWord(note?.id);
              }}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
        <CardDescription className="flex items-center gap-2 pt-1">
          <Badge variant="outline">{note.category}</Badge>
          <span className="text-xs text-muted-foreground">
            {note?.createdAt && new Date(note.createdAt).toLocaleDateString()}
          </span>
        </CardDescription>
      </CardHeader>
      <CardContent
        className={cx(
          currentViewMode === "LIST" ? "hidden" : "block",
          "pb-3 flex-1",
        )}
      >
        <ScrollArea className="h-[150px] w-full rounded-md">
          <pre className="whitespace-pre-wrap font-sans text-sm">
            {note.description}
          </pre>
          {note.example && (
            <div className="mt-3 space-y-1">
              <p className="text-xs font-medium text-muted-foreground">
                Example:
              </p>
              <p className="text-sm italic">{note.example}</p>
            </div>
          )}
          {note.translation && (
            <div className="mt-3">
              <p className="text-xs font-medium text-muted-foreground">
                Translation:
              </p>
              <p className="text-sm">{note.translation}</p>
            </div>
          )}
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default NoteCard;
