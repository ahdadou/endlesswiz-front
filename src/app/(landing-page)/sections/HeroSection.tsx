"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Loader2, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCallback, useState } from "react";
import { useZustandState } from "@/provider/ZustandStoreProvider";
import api from "@/clients/api/api";
import RotatingText from "@/components/animations/RotatingText/RotatingText";

const HeroSection = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { setVideosWithPosition, setHighlitedWord } = useZustandState();

  const fetchVideos = useCallback(
    async (query: string) => {
      if (!query.trim()) return;
      setIsLoading(true);
      try {
        const response = await api.getVideos(query);
        setHighlitedWord(query);
        if (response) {
          setVideosWithPosition(response);
          const nextSection = document.getElementById("search-section");
          nextSection?.scrollIntoView({ behavior: "smooth" });
        }
      } finally {
        setIsLoading(false);
      }
    },
    [setHighlitedWord, setVideosWithPosition]
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const query = formData.get("query") as string;
    query && fetchVideos(query);
  };

  return (
    <section className="relative flex h-screen items-center justify-center overflow-hidden">
      {/* Background Image with Gradient Overlay */}
      <motion.div
        className="absolute inset-0 z-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="relative h-full w-full">
          <div className="absolute inset-0 z-10 bg-gradient-to-b from-background/100 to-background/80" />
          <Image
            fill
            src="/133679140_10219929.jpg"
            alt="Language learning concept"
            className="object-cover object-center"
            priority
          />
        </div>
      </motion.div>

      {/* Content Container */}
      <div className="container relative z-10 mx-auto px-6">
        <motion.div
          className="mx-auto max-w-4xl text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="flex flex-col items-center gap-6">
            {/* Headings */}
            <div className="space-y-4">
              <motion.h1
                className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl flex flex-col justify-center items-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                <span className="block font-sans font-black text-forest-700 leading-tight">
                  Master Your Language
                </span>
                <span className="relative mt-2 block h-20 sm:h-24 w-[70%]">
                  <RotatingText
                    texts={["Skills.", "Vocabulary.", "Pronunciation."]}
                    mainClassName="absolute inset-0 bg-gradient-to-r from-forest-800 to-forest-600 text-white flex items-center justify-center px-4 py-2 rounded-xl"
                    staggerFrom="last"
                    initial={{ y: "100%" }}
                    animate={{ y: 0 }}
                    exit={{ y: "-120%" }}
                    staggerDuration={0.025}
                    splitLevelClassName="overflow-hidden"
                    transition={{ type: "spring", damping: 30, stiffness: 400 }}
                    rotationInterval={2000}
                    // textClassName="font-sans font-semibold text-3xl sm:text-4xl lg:text-5xl"
                  />
                </span>
              </motion.h1>

              <motion.p
                className="mx-auto max-w-2xl text-sm md:text-lg text-muted-foreground sm:text-lg text-forest-700"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                Learn, practice, and perfect your language skills through immersive, AI-powered experiences
              </motion.p>
            </div>

            {/* Search Form */}
            <motion.div
              className="w-full max-w-3xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                  <div className="relative flex-1 rounded-lg border border-gray-200 bg-white shadow-sm focus-within:ring-2 focus-within:ring-forest-500">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
                      <Search className="h-5 w-5 text-gray-400" />
                    </div>
                    <Input
                      name="query"
                      required
                      placeholder="Search any word or phrase..."
                      className="h-14 border-0 pl-12 text-base focus-visible:ring-0"
                    />
                  </div>
                  <Button
                    type="submit"
                    size="lg"
                    className="h-14 w-full bg-gradient-to-r from-forest-700 to-forest-600 px-8 text-lg font-semibold hover:from-forest-700 hover:to-forest-600 sm:w-auto"
                  >
                    {isLoading ? (
                      <Loader2 className="h-5 w-5 animate-spin" />
                    ) : (
                      "Search Now"
                    )}
                  </Button>
                </div>

                {/* CTA */}
                <p className="text-sm text-muted-foreground">
                  Start learning for free -{' '}
                  <Link
                    href="/auth/signup"
                    className="font-semibold text-forest-700 hover:underline"
                  >
                    Create account
                  </Link>
                </p>
              </form>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;