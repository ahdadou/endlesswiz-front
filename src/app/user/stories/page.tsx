"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { BookMarked, Search } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import api from "@/clients/api/api";
import { GetPageableStories, GetStories } from "@/clients/types/apiTypes";
import { motion } from "framer-motion";

export default function StoriesPage() {
  const [page, setPage] = useState(0);
  const [data, setData] = useState<GetPageableStories | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(true);

  const fetchStories = useCallback(async () => {
    setIsLoading(true);
    const response = await api.fetchStories(page, 8);
    if (response) {
      setData(response);
    }
    setIsLoading(false);
  }, [page]);

  useEffect(() => {
    fetchStories();
  }, [fetchStories]);

  const handlePageChange = (newPage: number) => {
    if (newPage >= 0 && (!data || newPage < data.totalPages)) {
      setPage(newPage);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <header className="text-center mb-12 space-y-4">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-5xl font-bold text-primary mb-4 bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent"
        >
          Stories to Learn English
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-lg text-muted-foreground max-w-2xl mx-auto"
        >
          Improve your English skills with our collection of engaging stories.
        </motion.p>
      </header>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-10 py-4 mb-8 border-b"
      >
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-4 w-full max-w-2xl">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                placeholder="Search stories..."
                className="w-full pl-10 pr-4 py-2 rounded-lg bg-muted/50 border focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <Select defaultValue="all">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="All Levels" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Levels</SelectItem>
                <SelectItem value="A1">A1 - Beginner</SelectItem>
                <SelectItem value="A2">A2 - Elementary</SelectItem>
                <SelectItem value="B1">B1 - Intermediate</SelectItem>
                <SelectItem value="B2">B2 - Upper Intermediate</SelectItem>
                <SelectItem value="C1">C1 - Advanced</SelectItem>
                <SelectItem value="C2">C2 - Proficiency</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </motion.div>

      {isLoading ? (
        <div className="text-center py-8">Loading...</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {data?.stories?.map((story, index) => (
            <motion.div
              key={story.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Link href={`/user/stories/${story.id}`} className="group">
                <div className="bg-card rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 ease-in-out hover:-translate-y-1 h-[400px]">
                  <div className="relative h-[75%] w-full overflow-hidden">
                    {story.cover && (
                      <div
                        className="absolute inset-0 z-0 bg-cover bg-center"
                        style={{
                          backgroundImage: `url(${story.cover})`,
                          filter: "blur(8px) brightness(0.8)",
                        }}
                      />
                    )}
                    {story.cover && (
                      <img
                        src={story.cover}
                        alt={story.title}
                        className="relative z-20 w-full h-full object-contain transition-transform duration-300 group-hover:scale-105"
                      />
                    )}
                    <div className="absolute top-2 right-2 bg-primary text-primary-foreground px-3 py-1 rounded-full text-xs font-semibold z-30">
                      {story.level}
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="text-sm font-semibold mb-2 group-hover:text-primary transition-colors line-clamp-2">
                      {story.title}
                    </h3>
                    <div className="flex justify-between items-center">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-primary hover:bg-forest-400"
                      >
                        Read Now
                      </Button>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      )}

      <div className="mt-8 flex justify-center gap-2">
        <Button
          variant="outline"
          onClick={() => handlePageChange(page - 1)}
          disabled={page === 0}
        >
          Previous
        </Button>
        <Button
          variant="outline"
          onClick={() => handlePageChange(page + 1)}
          disabled={!data || page >= data.totalPages - 1}
        >
          Next
        </Button>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        className="mt-16 bg-gradient-to-r from-primary/10 to-purple-500/10 rounded-xl p-6 md:p-8"
      >
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left">
            <h2 className="text-2xl font-bold mb-2">Your Learning Journey</h2>
            <p className="text-muted-foreground max-w-md">
              Track your progress, save favorite words, and practice your
              English skills all in one place.
            </p>
          </div>
          <div className="flex gap-4">
            <Button variant="outline" asChild>
              <Link href="/favorites">
                <BookMarked className="mr-2 h-4 w-4" /> My Favorites
              </Link>
            </Button>
            <Button asChild>
              <Link href="/practice">Continue Learning</Link>
            </Button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
