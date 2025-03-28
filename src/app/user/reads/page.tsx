"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  BookOpen,
  Heart,
  Filter,
  ChevronDown,
  Star,
  StarHalf,
  BookmarkPlus,
  Share2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";

// Mock data for stories
const stories = [
  {
    id: 1,
    title: "The Lost City",
    cover: "/placeholder.svg?height=400&width=300",
    author: "Elena Martinez",
    level: "Beginner",
    language: "Spanish",
    description:
      "Join Maria as she discovers a hidden city in the Amazon rainforest. This adventure will teach you essential Spanish vocabulary and present tense verbs.",
    rating: 4.5,
    tags: ["adventure", "travel", "history"],
    favorite: false,
  },
  {
    id: 2,
    title: "Café Conversations",
    cover: "/placeholder.svg?height=400&width=300",
    author: "Jean Dupont",
    level: "Intermediate",
    language: "French",
    description:
      "Experience a day in a Parisian café through the eyes of Sophie. Learn conversational French phrases and cultural etiquette.",
    rating: 5,
    tags: ["daily life", "culture", "conversation"],
    favorite: true,
  },
  {
    id: 3,
    title: "Tokyo Mysteries",
    cover: "/placeholder.svg?height=400&width=300",
    author: "Haruki Tanaka",
    level: "Advanced",
    language: "Japanese",
    description:
      "Follow detective Kenji as he solves a series of mysterious events in Tokyo. Perfect for advanced learners looking to master complex Japanese grammar.",
    rating: 4.8,
    tags: ["mystery", "urban", "detective"],
    favorite: false,
  },
  {
    id: 4,
    title: "German Folktales",
    cover: "/placeholder.svg?height=400&width=300",
    author: "Lukas Schmidt",
    level: "Intermediate",
    language: "German",
    description:
      "Discover traditional German folktales reimagined for language learners. Each story introduces new vocabulary within the context of beloved cultural narratives.",
    rating: 4.2,
    tags: ["culture", "folktales", "tradition"],
    favorite: false,
  },
  {
    id: 5,
    title: "Italian Kitchen",
    cover: "/placeholder.svg?height=400&width=300",
    author: "Sofia Rossi",
    level: "Beginner",
    language: "Italian",
    description:
      "Join Nonna Lucia as she teaches her grandchildren traditional Italian recipes. Learn food vocabulary and imperative verb forms through cooking adventures.",
    rating: 4.7,
    tags: ["food", "family", "cooking"],
    favorite: true,
  },
  {
    id: 6,
    title: "Business Mandarin",
    cover: "/placeholder.svg?height=400&width=300",
    author: "Li Wei",
    level: "Advanced",
    language: "Mandarin",
    description:
      "Follow Zhang Wei's career journey in Shanghai's business district. Master professional Mandarin vocabulary and formal speech patterns.",
    rating: 4.6,
    tags: ["business", "professional", "formal"],
    favorite: false,
  },
  {
    id: 7,
    title: "Russian Seasons",
    cover: "/placeholder.svg?height=400&width=300",
    author: "Natasha Ivanova",
    level: "Intermediate",
    language: "Russian",
    description:
      "Experience a full year in Moscow through the eyes of the Petrov family. Learn seasonal vocabulary and cultural traditions throughout the Russian year.",
    rating: 4.3,
    tags: ["seasons", "family", "culture"],
    favorite: false,
  },
  {
    id: 8,
    title: "Portuguese Voyages",
    cover: "/placeholder.svg?height=400&width=300",
    author: "João Silva",
    level: "Beginner",
    language: "Portuguese",
    description:
      "Sail with explorer Miguel as he navigates the Atlantic. This historical adventure introduces maritime vocabulary and past tense verbs.",
    rating: 4.4,
    tags: ["history", "adventure", "travel"],
    favorite: false,
  },
];

// Filter options
const levels = ["All Levels", "Beginner", "Intermediate", "Advanced"];
const languages = [
  "All Languages",
  "Spanish",
  "French",
  "Japanese",
  "German",
  "Italian",
  "Mandarin",
  "Russian",
  "Portuguese",
];
const categories = [
  "All Categories",
  "Adventure",
  "Culture",
  "Mystery",
  "Daily Life",
  "Food",
  "Business",
  "History",
];

export default function ReadsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLevel, setSelectedLevel] = useState("All Levels");
  const [selectedLanguage, setSelectedLanguage] = useState("All Languages");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [hoveredStory, setHoveredStory] = useState<number | null>(null);
  const [favorites, setFavorites] = useState<number[]>(
    stories.filter((story) => story.favorite).map((story) => story.id),
  );

  // Filter stories based on search and filters
  const filteredStories = stories.filter((story) => {
    const matchesSearch =
      story.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      story.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
      story.description.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesLevel =
      selectedLevel === "All Levels" || story.level === selectedLevel;
    const matchesLanguage =
      selectedLanguage === "All Languages" ||
      story.language === selectedLanguage;
    const matchesCategory =
      selectedCategory === "All Categories" ||
      story.tags.some(
        (tag) => tag.toLowerCase() === selectedCategory.toLowerCase(),
      );

    return matchesSearch && matchesLevel && matchesLanguage && matchesCategory;
  });

  const toggleFavorite = (id: number) => {
    if (favorites.includes(id)) {
      setFavorites(favorites.filter((favId) => favId !== id));
    } else {
      setFavorites([...favorites, id]);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-forest mb-4">
            Interactive Reading Library
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl">
            Immerse yourself in engaging stories designed to improve your
            language skills naturally. Each story includes interactive features
            to enhance your reading experience.
          </p>
        </div>

        {/* Search and filters */}
        <div className="mb-8 grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="relative md:col-span-2">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              type="text"
              placeholder="Search stories, authors, or keywords..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="flex justify-between w-full">
                <div className="flex items-center">
                  <Filter className="mr-2 h-4 w-4" />
                  <span>{selectedLevel}</span>
                </div>
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {levels.map((level) => (
                <DropdownMenuItem
                  key={level}
                  onClick={() => setSelectedLevel(level)}
                  className={
                    selectedLevel === level ? "bg-accent/10 text-accent" : ""
                  }
                >
                  {level}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="flex justify-between w-full">
                <div className="flex items-center">
                  <BookOpen className="mr-2 h-4 w-4" />
                  <span>{selectedLanguage}</span>
                </div>
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {languages.map((language) => (
                <DropdownMenuItem
                  key={language}
                  onClick={() => setSelectedLanguage(language)}
                  className={
                    selectedLanguage === language
                      ? "bg-accent/10 text-accent"
                      : ""
                  }
                >
                  {language}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Stories grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredStories.map((story) => (
            <motion.div
              key={story.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="relative"
              onMouseEnter={() => setHoveredStory(story.id)}
              onMouseLeave={() => setHoveredStory(null)}
            >
              <Link href={`/user/reads/${story.id}`}>
                <div className="relative h-[320px] rounded-lg overflow-hidden shadow-md transition-all duration-300 hover:shadow-xl">
                  {/* Book cover */}
                  <img
                    src={story.cover || "/placeholder.svg"}
                    alt={story.title}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  />

                  {/* Language badge */}
                  <div className="absolute top-3 left-3 bg-white/90 text-forest text-xs font-medium px-2 py-1 rounded-full">
                    {story.language}
                  </div>

                  {/* Level badge */}
                  <div className="absolute top-3 right-3 bg-accent/90 text-white text-xs font-medium px-2 py-1 rounded-full">
                    {story.level}
                  </div>

                  {/* Hover overlay with description */}
                  <AnimatePresence>
                    {hoveredStory === story.id && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="absolute inset-0 bg-gradient-to-t from-forest/90 via-forest/70 to-transparent p-4 flex flex-col justify-end"
                      >
                        <h3 className="text-xl font-bold text-white mb-1">
                          {story.title}
                        </h3>
                        <p className="text-sm text-white/90 mb-2">
                          by {story.author}
                        </p>
                        <p className="text-sm text-white/80 line-clamp-3 mb-3">
                          {story.description}
                        </p>

                        <div className="flex items-center mb-2">
                          {[...Array(5)].map((_, i) => {
                            const starValue = i + 1;
                            return starValue <= Math.floor(story.rating) ? (
                              <Star
                                key={i}
                                className="h-4 w-4 text-yellow-400 fill-yellow-400"
                              />
                            ) : story.rating % 1 !== 0 &&
                              Math.ceil(story.rating) === starValue ? (
                              <StarHalf
                                key={i}
                                className="h-4 w-4 text-yellow-400 fill-yellow-400"
                              />
                            ) : (
                              <Star key={i} className="h-4 w-4 text-white/30" />
                            );
                          })}
                          <span className="text-white/90 text-xs ml-1">
                            {story.rating.toFixed(1)}
                          </span>
                        </div>

                        <div className="flex flex-wrap gap-1 mb-3">
                          {story.tags.map((tag, index) => (
                            <span
                              key={index}
                              className="text-xs bg-white/20 text-white px-2 py-0.5 rounded-full"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </Link>

              {/* Action buttons */}
              <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 flex space-x-2">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="bg-white shadow-md rounded-full p-2"
                  onClick={() => toggleFavorite(story.id)}
                >
                  <Heart
                    className={`h-5 w-5 ${favorites.includes(story.id) ? "text-red-500 fill-red-500" : "text-muted-foreground"}`}
                  />
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="bg-white shadow-md rounded-full p-2"
                >
                  <BookmarkPlus className="h-5 w-5 text-muted-foreground" />
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="bg-white shadow-md rounded-full p-2"
                >
                  <Share2 className="h-5 w-5 text-muted-foreground" />
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Empty state */}
        {filteredStories.length === 0 && (
          <div className="text-center py-12">
            <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-forest mb-2">
              No stories found
            </h3>
            <p className="text-muted-foreground">
              Try adjusting your filters or search query to find more stories.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
