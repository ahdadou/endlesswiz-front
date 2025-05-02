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
import { useCallback, useEffect, useState } from "react";
import api from "@/clients/api/api";
import { GetPageableStories, GetStories } from "@/clients/types/apiTypes";
import { motion } from "framer-motion";

export default function StoriesPage() {
  const [page, setPage] = useState(0);
  const [level, setLevel] = useState("B1");
  const [data, setData] = useState<GetPageableStories | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setPage(0);
  }, [level]);

  const fetchStories = useCallback(async () => {
    setIsLoading(true);
    const response = await api.fetchStories(page, 8, level);
    if (response) {
      setData(response);
    }
    setIsLoading(false);
  }, [page, level]);

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
          className="text-4xl md:text-5xl font-bold text-primary mb-4 bg-gradient-to-r from-primary to-forest-600 bg-clip-text"
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
            <Select
              defaultValue="B1"
              onValueChange={(value) => {
                setLevel(value);
              }}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="B1 - Intermediate" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="B1">B1 - Intermediate</SelectItem>
                {/* <SelectItem value="ALL">All Levels</SelectItem> */}
                <SelectItem value="A1">A1 - Beginner</SelectItem>
                <SelectItem value="A2">A2 - Elementary</SelectItem>
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
    </div>
  );
}
