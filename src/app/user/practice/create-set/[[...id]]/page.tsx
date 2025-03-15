"use client";

import type React from "react";

import { useState, useEffect } from "react";
import { PlusCircle, Trash2, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import api from "@/clients/api/api";
import { useToast } from "@/components/ui/use-toast";
import { useParams, useRouter } from "next/navigation";

export default function CreateSetWithId() {
  const { toast } = useToast();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [practiceWords, setPracticeWords] = useState<
    { id?: string; word: string; description: string }[]
  >([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const router = useRouter();
  const { id } = useParams();

  useEffect(() => {
    const fetchSetData = async () => {
      if (id) {
        setIsFetching(true);
        setIsEditMode(true);
        try {
          const data = await api.fetchPracticeSetDetailsById(id as string);
          setTitle(data.title);
          setDescription(data.description);
          setPracticeWords(data.words);
        } catch (error) {
          console.error("Failed to fetch set data:", error);
          toast({
            title: "Error",
            description: "Failed to load study set data",
            variant: "destructive",
          });
        } finally {
          setIsFetching(false);
        }
      }
    };

    fetchSetData();
  }, [id, toast]);

  const addWord = () => {
    setPracticeWords([...practiceWords, { word: "", description: "" }]);
  };

  const removeWord = (index: number) => {
    const newWords = [...practiceWords];
    newWords.splice(index, 1);
    setPracticeWords(newWords);
  };

  const updateWord = (
    index: number,
    field: "word" | "description",
    value: string,
  ) => {
    const newWords = [...practiceWords];
    newWords[index][field] = value;
    setPracticeWords(newWords);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (isEditMode) {
        let response = await api.updatePracticeSetDetails(id as string, {
          title,
          description,
          words: practiceWords,
        });

        toast({
          title: "Set Updated!",
          description: "Your study set has been successfully updated.",
        });

        if (response) {
          router.push(`/dashboard/practice/set/${id}`);
        }
      } else {
        let response = await api.addPracticeSet({
          title,
          description,
          words: practiceWords,
        });

        toast({
          title: "Set Created!",
          description: "Your new study set has been successfully created.",
        });

        if (response) {
          router.push(`/dashboard/practice`);
        }
      }
    } catch (error: any) {
      toast({
        title: isEditMode ? "Error updating set" : "Error creating set",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (isFetching) {
    return (
      <div className="container mx-auto py-8 max-w-3xl">
        <div className="flex items-center gap-2 mb-8">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => router.push(`/dashboard/practice/set/${id}`)}
          >
            <ArrowLeft className="h-4 w-4" />
            <span className="sr-only">Back to set {title}</span>
          </Button>
          <span className="text-muted-foreground">Loading set data...</span>
        </div>
        <div className="h-8 w-1/3 bg-muted animate-pulse rounded mb-4"></div>
        <div className="h-24 bg-muted animate-pulse rounded mb-6"></div>
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-32 bg-muted animate-pulse rounded"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 max-w-3xl">
      <div className="flex items-center gap-2 mb-8">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => router.push(`/dashboard/practice/set/${id}`)}
        >
          <ArrowLeft className="h-4 w-4" />
          <span className="sr-only">Back to set {title}</span>
        </Button>
        <span className="text-muted-foreground">Back to set {title}</span>
      </div>

      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">
          {isEditMode ? `Edit ${title} set` : "Create a new study set"}
        </h1>
        <p className="text-muted-foreground">
          {isEditMode
            ? "Update your study set information and words"
            : "Add a title, description, and words to create your study set."}
        </p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="space-y-6">
          <div className="space-y-4">
            <div>
              <Label htmlFor="title" className="text-lg">
                Title
              </Label>
              <Input
                id="title"
                placeholder="Enter a title for your study set"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="mt-1"
                required
              />
            </div>

            <div>
              <Label htmlFor="description" className="text-lg">
                Description (optional)
              </Label>
              <Textarea
                id="description"
                placeholder="Add a description to help you remember what this set is for"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="mt-1"
                rows={3}
              />
            </div>
          </div>

          <div className="pt-4">
            <h2 className="text-xl font-semibold mb-4">Words</h2>

            {practiceWords?.length > 0 ? (
              <div className="space-y-4">
                {practiceWords?.map((item, index) => (
                  <Card key={index} className="overflow-hidden">
                    <CardContent className="p-0">
                      <div className="flex flex-col md:flex-row">
                        <div className="flex-1 p-4 border-b md:border-b-0 md:border-r">
                          <div className="flex justify-between items-center mb-2">
                            <Label className="text-sm font-medium">
                              Word {index + 1}
                            </Label>
                            <Button
                              type="button"
                              variant="ghost"
                              size="icon"
                              onClick={() => removeWord(index)}
                              className="h-8 w-8 text-destructive"
                            >
                              <Trash2 className="h-4 w-4" />
                              <span className="sr-only">Remove word</span>
                            </Button>
                          </div>
                          <Textarea
                            placeholder="Enter word"
                            value={item.word}
                            onChange={(e) =>
                              updateWord(index, "word", e.target.value)
                            }
                            className="resize-none"
                            rows={2}
                          />
                        </div>
                        <div className="flex-1 p-4">
                          <Label className="text-sm font-medium mb-2 block">
                            Description
                          </Label>
                          <Textarea
                            placeholder="Enter description"
                            value={item.description}
                            onChange={(e) =>
                              updateWord(index, "description", e.target.value)
                            }
                            className="resize-none"
                            rows={2}
                          />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 border rounded-lg bg-muted/20">
                <p className="text-muted-foreground mb-2">No words added yet</p>
                <p className="text-sm text-muted-foreground">
                  Click the button below to add words to your study set
                </p>
              </div>
            )}

            <Button
              type="button"
              variant="outline"
              onClick={addWord}
              className="mt-4 w-full flex items-center justify-center gap-2"
            >
              <PlusCircle className="h-4 w-4" />
              Add word
            </Button>
          </div>

          <div className="pt-6">
            <Button
              type="submit"
              className="w-full md:w-auto"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-background border-r-transparent"></span>
                  {isEditMode ? "Updating..." : "Creating..."}
                </>
              ) : isEditMode ? (
                "Update study set"
              ) : (
                "Create study set"
              )}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
