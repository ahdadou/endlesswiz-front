"use client";
import { ArrowRight, GraduationCap } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ButtonWithAnimation } from "@/components/ButtonWithAnimation";
import { Search, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCallback, useState } from "react";
import { useZustandState } from "@/provider/ZustandStoreProvider";
import api from "@/clients/api/api";

const HeroSection = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [wordSearch, setWordSearch] = useState<string>("");
  const { videos, setVideosWithPosition, setHighlitedWord, currentTranscript } =
    useZustandState();

  const fetchVideos = useCallback(
    async (query: string) => {
      if (!query.trim()) return;
      setIsLoading(true);
      try {
        const response = await api.getVideos(query);
        setHighlitedWord(query);
        if (response) {
          setVideosWithPosition(response); // Update state for video player
          const nextSection = document.getElementById("search-section");
          if (nextSection) {
            nextSection.scrollIntoView({ behavior: "smooth" });
          }
        }
      } catch {
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

    if (query) {
      fetchVideos(query);
    }
  };

  return (
    <section className="flex justify-center items-center relative overflow-hidden h-[100vh]">
      <motion.div
        className="absolute inset-0 z-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="relative w-full h-full">
          <div className="absolute inset-0 bg-gradient-to-b from-background/100 to-background/80 z-10" />
          <Image
            height={500}
            width={500}
            src="/133679140_10219929.jpg"
            alt="Main background"
            className="w-full h-full object-cover object-center"
            priority
          />
        </div>
      </motion.div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          className="max-w-3xl mx-auto text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="max-w-4xl mx-auto text-center flex flex-col gap-6">
            <div>
              <h1 className="text-2xl lg:text-5xl font-bold text-gray-900 tracking-tight">
                Master Your Language Skills with Endlesswiz.
              </h1>
            </div>

            <p className="text-md lg:text-xl text-gray-600 mb-10">
              Learn, Practice, and Improve Your Language Like Never Before.
            </p>

            <div>
              <form onSubmit={handleSubmit}>
                <div className="flex flex-row max-w-3xl mx-auto rounded-lg overflow-hidden shadow-lg border border-gray-200">
                  <div className="flex-1 flex items-center px-4 py-3 bg-white">
                    <Search className="h-5 w-5 text-gray-400 mr-2" />
                    <Input
                      type="text"
                      name="query"
                      required
                      onClick={handleSubmit}
                      placeholder="What word are you looking for?"
                      className="border-0 focus-visible:ring-0 focus-visible:ring-offset-0 px-0 bg-white"
                    />
                  </div>
                  <Button
                    type="submit"
                    className="px-8 py-6 rounded-none bg-black hover:bg-gray-800 text-white h-full"
                  >
                    Search
                  </Button>
                </div>
              </form>
            </div>

            <div className="w-full justify-center items-center flex mt-10">
              <Link href="/auth/signup">
                <Button className="bg-black hover:bg-gray-800 text-white rounded-md">
                  Get Started — It's Free
                </Button>
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
