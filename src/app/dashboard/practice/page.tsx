"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import {
  BookOpen,
  Search,
  Plus,
  Clock,
  Star,
  Filter,
  BarChart2,
  Layers,
  FlaskConical,
  Puzzle,
  Gamepad2,
  PenTool,
  Brain,
  Trash2,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Skeleton } from "@/components/ui/skeleton"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import api from "@/clients/api/api"
import type { PracticeSetResponse } from "@/clients/types/apiTypes"
import { useToast } from "@/hooks/use-toast"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

export default function SetList() {
  const [sets, setSets] = useState<PracticeSetResponse[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedTab, setSelectedTab] = useState("all")
  const router = useRouter()
  const { toast } = useToast()

  // Add a state to track the set being deleted and dialog open state
  const [setToDelete, setSetToDelete] = useState<PracticeSetResponse | null>(null)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)

  useEffect(() => {
    const fetchSets = async () => {
      try {
        setIsLoading(true)
        const data = await api.fetchPracticeSets()
        setSets(data)
      } catch (error) {
        console.error("Failed to fetch sets:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchSets()
  }, [])

  // Update the handleDeleteSet function to first open a confirmation dialog
  const handleDeleteSet = (set: PracticeSetResponse) => {
    setSetToDelete(set)
    setIsDeleteDialogOpen(true)
  }

  // Add a new function to handle the actual deletion after confirmation
  const confirmDeleteSet = async () => {
    if (!setToDelete) return

    try {
      await api.deletePracticeSet(setToDelete.id)

      // Update local state
      setSets(sets.filter((set) => set.id !== setToDelete.id))

      toast({
        title: "Set deleted",
        description: "The study set has been successfully deleted",
      })

      // Close the dialog
      setIsDeleteDialogOpen(false)
      setSetToDelete(null)
    } catch (error) {
      console.error("Failed to delete set:", error)
      toast({
        title: "Error",
        description: "Failed to delete study set",
        variant: "destructive",
      })
    }
  }

  const filteredSets = sets.filter(
    (set) =>
      set.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      set.description.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const filteredByTab = () => {
    switch (selectedTab) {
      case "favorites":
        return filteredSets.filter((set) => set.isFavorite)
      case "recent":
        return [...filteredSets]
          .sort(
            (a, b) =>
              new Date(b.lastPracticed || b.createdAt).getTime() - new Date(a.lastPracticed || a.createdAt).getTime(),
          )
          .slice(0, 5)
      case "progress":
        return [...filteredSets].sort((a, b) => (b.progress || 0) - (a.progress || 0))
      default:
        return filteredSets
    }
  }

  const displaySets = filteredByTab()

  const handlePractice = (setId?: string, mode?: string) => {
    router.push(`/practice/${setId}?mode=${mode}`)
  }

  const toggleFavorite = async (setId: string) => {
    try {
      await api.toggleFavorite(setId)
      setSets(sets.map((set) => (set.id === setId ? { ...set, isFavorite: !set.isFavorite } : set)))
    } catch (error) {
      console.error("Failed to toggle favorite:", error)
    }
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold">Your Study Sets</h1>
          <p className="text-muted-foreground mt-1">Manage and practice your study materials</p>
        </div>
        <Button onClick={() => router.push("/dashboard/practice/create-set")} className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Create New Set
        </Button>
      </div>

      <div className="grid gap-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search your sets..."
              className="pl-9"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="flex items-center gap-2">
                <Filter className="h-4 w-4" />
                Filter
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>Most Recent</DropdownMenuItem>
              <DropdownMenuItem>Alphabetical</DropdownMenuItem>
              <DropdownMenuItem>Most Words</DropdownMenuItem>
              <DropdownMenuItem>Least Progress</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <Tabs defaultValue="all" className="w-full" onValueChange={setSelectedTab}>
          <TabsList className="grid grid-cols-4 md:w-fit">
            <TabsTrigger value="all">All Sets</TabsTrigger>
            <TabsTrigger value="favorites">Favorites</TabsTrigger>
            <TabsTrigger value="recent">Recent</TabsTrigger>
            <TabsTrigger value="progress">In Progress</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="mt-6">
            {isLoading ? (
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {[1, 2, 3].map((i) => (
                  <Card key={i} className="overflow-hidden">
                    <CardHeader className="pb-2">
                      <Skeleton className="h-6 w-3/4 mb-2" />
                      <Skeleton className="h-4 w-1/2" />
                    </CardHeader>
                    <CardContent>
                      <Skeleton className="h-4 w-full mb-2" />
                      <Skeleton className="h-4 w-2/3" />
                    </CardContent>
                    <CardFooter>
                      <Skeleton className="h-9 w-full" />
                    </CardFooter>
                  </Card>
                ))}
              </div>
            ) : displaySets.length > 0 ? (
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {displaySets.map((set) => (
                  <Card key={set.id} className="overflow-hidden">
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <div className="space-y-1">
                          <h3 className="font-semibold text-lg line-clamp-1">{set.title}</h3>
                          <p className="text-sm text-muted-foreground line-clamp-1">{set.description}</p>
                        </div>
                        {/* <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => toggleFavorite(set.id)}
                          className={set.isFavorite ? "text-yellow-500" : ""}
                        >
                          <Star className="h-5 w-5" fill={set.isFavorite ? "currentColor" : "none"} />
                        </Button> */}

                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDeleteSet(set)}
                          className="h-8 w-8 text-destructive/70 hover:text-destructive"
                        >
                          <Trash2 className="h-4 w-4" />
                          <span className="sr-only">Delete set</span>
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center gap-2 mb-3">
                        <Badge variant="outline" className="flex items-center gap-1">
                          <Layers className="h-3 w-3" />
                          {set.wordCount} words
                        </Badge>
                        {set.lastPracticed && (
                          <Badge variant="outline" className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            Last practiced {new Date(set.lastPracticed).toLocaleDateString()}
                          </Badge>
                        )}
                      </div>
                      {set.tags && set.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1 mb-3">
                          {set.tags.map((tag) => (
                            <Badge key={tag} variant="secondary" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      )}
                      {set.progress !== undefined && (
                        <div className="space-y-1">
                          <div className="flex justify-between text-xs">
                            <span>Progress</span>
                            <span>{set.progress}%</span>
                          </div>
                          <Progress value={set.progress} className="h-2" />
                        </div>
                      )}
                    </CardContent>
                    <CardFooter className="flex-col space-y-2 pt-0">
                      <div className="grid grid-cols-5 gap-1 w-full">
                        <Button
                          variant="outline"
                          size="sm"
                          className="flex flex-col items-center p-1 h-auto"
                          onClick={() => handlePractice(set?.id, "flashcards")}
                        >
                          <BookOpen className="h-4 w-4 mb-1" />
                          <span className="text-xs">Flashcards</span>
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="flex flex-col items-center p-1 h-auto"
                          onClick={() => handlePractice(set?.id, "hangman")}
                        >
                          <Gamepad2 className="h-4 w-4 mb-1" />
                          <span className="text-xs">Hangman</span>
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="flex flex-col items-center p-1 h-auto"
                          onClick={() => handlePractice(set.id, "puzzle")}
                        >
                          <Puzzle className="h-4 w-4 mb-1" />
                          <span className="text-xs">Puzzle</span>
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="flex flex-col items-center p-1 h-auto"
                          onClick={() => handlePractice(set.id, "test")}
                        >
                          <PenTool className="h-4 w-4 mb-1" />
                          <span className="text-xs">Test</span>
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="flex flex-col items-center p-1 h-auto"
                          onClick={() => handlePractice(set.id, "learn")}
                        >
                          <Brain className="h-4 w-4 mb-1" />
                          <span className="text-xs">Learn</span>
                        </Button>
                      </div>
                      <Link href={`/dashboard/practice/set/${set.id}`} className="w-full">
                        <Button variant="default" className="w-full">
                          View Set
                        </Button>
                      </Link>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 border rounded-lg bg-muted/20">
                <BookOpen className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium mb-2">No study sets found</h3>
                <p className="text-muted-foreground mb-6">
                  {searchQuery ? "Try a different search term" : "Create your first study set to get started"}
                </p>
                <Button onClick={() => router.push("/dashboard/practice/create-set")}>Create New Set</Button>
              </div>
            )}
          </TabsContent>

          <TabsContent value="favorites" className="mt-6">
            {/* Same structure as "all" tab but with filtered content */}
            {displaySets.length > 0 ? (
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {/* Same card structure as above */}
                {/* ... */}
              </div>
            ) : (
              <div className="text-center py-12 border rounded-lg bg-muted/20">
                <Star className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium mb-2">No favorite sets yet</h3>
                <p className="text-muted-foreground mb-6">Mark sets as favorites to find them quickly</p>
              </div>
            )}
          </TabsContent>

          {/* Similar structure for "recent" and "progress" tabs */}
          <TabsContent value="recent" className="mt-6">
            {/* Recent sets content */}
          </TabsContent>

          <TabsContent value="progress" className="mt-6">
            {/* Progress-sorted sets content */}
          </TabsContent>
        </Tabs>
      </div>

      {/* Study Tips Section */}
      <div className="mt-12 bg-gradient-to-r from-primary/10 to-primary/5 rounded-xl p-6">
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <FlaskConical className="h-5 w-5" />
          Study Smart
        </h2>
        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardContent className="pt-6">
              <h3 className="font-medium mb-2">Spaced Repetition</h3>
              <p className="text-sm text-muted-foreground">
                Study at increasing intervals to improve long-term retention. Review cards you find difficult more
                frequently.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <h3 className="font-medium mb-2">Active Recall</h3>
              <p className="text-sm text-muted-foreground">
                Test yourself instead of passively reading. Try to recall information before flipping flashcards.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <h3 className="font-medium mb-2">Mix Practice Types</h3>
              <p className="text-sm text-muted-foreground">
                Alternate between different study modes to engage different parts of your brain and improve memory.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Study Statistics */}
      <div className="mt-8 border rounded-xl p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <BarChart2 className="h-5 w-5" />
            Your Study Stats
          </h2>
          <Button variant="outline" size="sm">
            View Detailed Stats
          </Button>
        </div>
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardContent className="pt-6 flex flex-col items-center text-center">
              <div className="text-3xl font-bold mb-1">12</div>
              <p className="text-sm text-muted-foreground">Total Sets</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6 flex flex-col items-center text-center">
              <div className="text-3xl font-bold mb-1">347</div>
              <p className="text-sm text-muted-foreground">Words Studied</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6 flex flex-col items-center text-center">
              <div className="text-3xl font-bold mb-1">5.2h</div>
              <p className="text-sm text-muted-foreground">Study Time</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6 flex flex-col items-center text-center">
              <div className="text-3xl font-bold mb-1">86%</div>
              <p className="text-sm text-muted-foreground">Avg. Accuracy</p>
            </CardContent>
          </Card>
        </div>
      </div>

      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Delete Study Set</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this study set? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            {setToDelete && (
              <>
                <p className="font-medium">{setToDelete.title}</p>
                <p className="text-sm text-muted-foreground mt-1">
                  This set contains {setToDelete.wordCount} {setToDelete.wordCount === 1 ? "word" : "words"}.
                </p>
              </>
            )}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={confirmDeleteSet}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

