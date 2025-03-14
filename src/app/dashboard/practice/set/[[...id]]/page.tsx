"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  BookOpen,
  Trash2,
  Edit,
  ChevronDown,
  Brain,
  PenTool,
  Puzzle,
  Gamepad2,
  ArrowLeft,
  Plus,
  Download,
  Share2,
  Printer,
  MoreHorizontal,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/components/ui/use-toast";
import api from "@/clients/api/api";
import {
  GetPracticeSetDetailsResponse,
  PracticeWordResponse,
} from "@/clients/types/apiTypes";

export default function SetPage() {
  const [set, setSet] = useState<GetPracticeSetDetailsResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [editingWord, setEditingWord] = useState<PracticeWordResponse | null>(
    null,
  );
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [updatedWord, setUpdatedWord] = useState({ word: "", description: "" });
  const router = useRouter();
  const { toast } = useToast();
  const { id } = useParams();

  useEffect(() => {
    const fetchSet = async () => {
      try {
        setIsLoading(true);
        const data = await api.fetchPracticeSetDetailsById(id as string);
        setSet(data);
      } catch (error) {
        console.error("Failed to fetch set:", error);
        toast({
          title: "Error",
          description: "Failed to load study set",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchSet();
  }, [id, toast]);

  const handleDeleteWord = async (wordId: string) => {
    if (!set) return;

    try {
      await api.deletePracticeWord(wordId);

      // Update local state
      setSet({
        ...set,
        words: set.words.filter((word) => word.id !== wordId),
      });

      toast({
        title: "Word deleted",
        description: "The word has been removed from this set",
      });
    } catch (error) {
      console.error("Failed to delete word:", error);
      toast({
        title: "Error",
        description: "Failed to delete word",
        variant: "destructive",
      });
    }
  };

  const handleEditWord = (word: PracticeWordResponse) => {
    setEditingWord(word);
    setUpdatedWord({
      word: word.word,
      description: word.description,
    });
    setIsEditModalOpen(true);
  };

  const handleUpdateWord = async () => {
    if (!set || !editingWord) return;

    try {
      await api.updatePracticeWord({
        id: editingWord.id,
        word: updatedWord.word,
        description: updatedWord.description,
      });

      // Update local state
      setSet({
        ...set,
        words: set.words.map((word) =>
          word.id === editingWord.id
            ? {
                ...word,
                word: updatedWord.word,
                description: updatedWord.description,
              }
            : word,
        ),
      });

      setIsEditModalOpen(false);
      toast({
        title: "Word updated",
        description: "The word has been updated successfully",
      });
    } catch (error) {
      console.error("Failed to update word:", error);
      toast({
        title: "Error",
        description: "Failed to update word",
        variant: "destructive",
      });
    }
  };

  const handlePractice = (mode: string) => {
    router.push(`/dashboard/practice/${mode}/${id}`);
  };

  if (isLoading) {
    return (
      <div className="container mx-auto py-8 px-4">
        <div className="flex items-center gap-2 mb-8 text-muted-foreground">
          <ArrowLeft className="h-4 w-4" />
          <span>Loading...</span>
        </div>
        <div className="h-8 w-1/3 bg-muted animate-pulse rounded mb-2"></div>
        <div className="h-4 w-1/4 bg-muted animate-pulse rounded mb-8"></div>

        <div className="space-y-4">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="h-24 bg-muted animate-pulse rounded"></div>
          ))}
        </div>
      </div>
    );
  }

  if (!set) {
    return (
      <div className="container mx-auto py-8 px-4 text-center">
        <h1 className="text-2xl font-bold mb-4">Set not found</h1>
        <p className="text-muted-foreground mb-6">
          The study set you're looking for doesn't exist or has been removed.
        </p>
        <Button onClick={() => router.push("/dashboard/practice")}>
          Back to Sets
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex items-center gap-2 mb-8">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => router.push("/dashboard/practice")}
        >
          <ArrowLeft className="h-4 w-4" />
          <span className="sr-only">Back to sets</span>
        </Button>
        <span className="text-muted-foreground">Back to sets</span>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-bold mb-2">{set.title}</h1>
          <p className="text-muted-foreground">{set.description}</p>

          {set.tags && set.tags.length > 0 && (
            <div className="flex flex-wrap gap-1 mt-2">
              {set.tags.map((tag) => (
                <Badge key={tag} variant="secondary" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>
          )}
        </div>

        <div className="flex gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button className="flex items-center gap-2">
                Practice <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuItem
                onClick={() => handlePractice("flashcards")}
                className="flex items-center gap-2 cursor-pointer"
              >
                <BookOpen className="h-4 w-4" />
                <span>Flashcards</span>
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => handlePractice("test")}
                className="flex items-center gap-2 cursor-pointer"
              >
                <PenTool className="h-4 w-4" />
                <span>Test</span>
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => handlePractice("learn")}
                className="flex items-center gap-2 cursor-pointer"
              >
                <Brain className="h-4 w-4" />
                <span>Learn</span>
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => handlePractice("puzzle")}
                className="flex items-center gap-2 cursor-pointer"
              >
                <Puzzle className="h-4 w-4" />
                <span>Word Puzzle</span>
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => handlePractice("hangman")}
                className="flex items-center gap-2 cursor-pointer"
              >
                <Gamepad2 className="h-4 w-4" />
                <span>Hangman</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem className="flex items-center gap-2 cursor-pointer">
                <Share2 className="h-4 w-4" />
                <span>Share</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="flex items-center gap-2 cursor-pointer">
                <Download className="h-4 w-4" />
                <span>Export</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="flex items-center gap-2 cursor-pointer">
                <Printer className="h-4 w-4" />
                <span>Print</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="flex items-center gap-2 cursor-pointer text-destructive">
                <Trash2 className="h-4 w-4" />
                <span>Delete Set</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <div className="flex justify-between items-center mb-4">
        <div className="text-sm text-muted-foreground">
          {set.words?.length} {set.words?.length === 1 ? "word" : "words"} •
          Created {new Date(set.createdAt).toLocaleDateString()}
          {set.lastPracticed &&
            ` • Last practiced ${new Date(set.lastPracticed).toLocaleDateString()}`}
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() =>
            router.push(`/dashboard/practice/create-set/${set.id}`)
          }
          className="flex items-center gap-1"
        >
          <Plus className="h-3.5 w-3.5" />
          Add Words
        </Button>
      </div>

      <Separator className="mb-6" />

      <div className="space-y-4">
        {set.words?.length > 0 ? (
          set.words?.map((word, index) => (
            <Card key={word.id} className="overflow-hidden">
              <CardContent className="p-0">
                <div className="flex flex-col md:flex-row">
                  <div className="flex-1 p-4 border-b md:border-b-0 md:border-r">
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="text-xs text-muted-foreground mb-1">
                          Word {index + 1}
                        </div>
                        <div className="font-medium">{word.word}</div>
                      </div>
                      <div className="flex gap-1">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleEditWord(word)}
                          className="h-8 w-8 text-muted-foreground hover:text-foreground"
                        >
                          <Edit className="h-4 w-4" />
                          <span className="sr-only">Edit word</span>
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDeleteWord(word.id)}
                          className="h-8 w-8 text-destructive/70 hover:text-destructive"
                        >
                          <Trash2 className="h-4 w-4" />
                          <span className="sr-only">Delete word</span>
                        </Button>
                      </div>
                    </div>
                  </div>
                  <div className="flex-1 p-4">
                    <div className="text-xs text-muted-foreground mb-1">
                      Definition
                    </div>
                    <div>{word.description}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <div className="text-center py-12 border rounded-lg bg-muted/20">
            <h3 className="text-lg font-medium mb-2">
              No words in this set yet
            </h3>
            <p className="text-muted-foreground mb-6">
              Add some words to start studying
            </p>
            <Button
              onClick={() =>
                router.push(`/dashboard/practice/create-set/${set.id}`)
              }
            >
              Add Words
            </Button>
          </div>
        )}
      </div>

      <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Edit Word</DialogTitle>
            <DialogDescription>
              Update the word and its definition.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="edit-word">Word</Label>
              <Input
                id="edit-word"
                value={updatedWord.word}
                onChange={(e) =>
                  setUpdatedWord({ ...updatedWord, word: e.target.value })
                }
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="edit-definition">Definition</Label>
              <Textarea
                id="edit-definition"
                value={updatedWord.description}
                onChange={(e) =>
                  setUpdatedWord({
                    ...updatedWord,
                    description: e.target.value,
                  })
                }
                rows={3}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditModalOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleUpdateWord}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
