import { useState, useEffect } from "react";
import { Play } from "lucide-react";

interface VideoPlayerProps {
  videoId: string;
  title?: string;
  description?: string;
}

const VideoPlayer = ({
  videoId,
  title = "English Pronunciation Guide",
  description = "Learn the proper pronunciation of common English words and phrases.",
}: VideoPlayerProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [showPreview, setShowPreview] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  const handlePlayClick = () => {
    setShowPreview(false);
  };

  return (
    <div className="rounded-xl overflow-hidden bg-card shadow-sm border border-border">
      <div className="relative w-full aspect-video">
        {showPreview ? (
          <div
            className="absolute inset-0 bg-secondary flex flex-col items-center justify-center cursor-pointer"
            onClick={handlePlayClick}
          >
            {isLoading ? (
              <div className="w-16 h-16 rounded-full bg-background/80 animate-pulse-slow flex items-center justify-center">
                <Play className="w-8 h-8 text-foreground ml-1" />
              </div>
            ) : (
              <>
                <div className="w-20 h-20 rounded-full bg-background/80 backdrop-blur-sm hover:bg-background hover:scale-105 transition-all duration-300 flex items-center justify-center">
                  <Play className="w-10 h-10 text-foreground ml-1" />
                </div>
                <p className="mt-4 text-foreground/80 text-sm">
                  Click to play video
                </p>
              </>
            )}
          </div>
        ) : (
          <iframe
            src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
            title={title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="absolute inset-0 w-full h-full border-0"
          ></iframe>
        )}
      </div>
      <div className="p-5">
        <h3 className="text-xl font-medium mb-2">{title}</h3>
        <p className="text-muted-foreground">{description}</p>
      </div>
    </div>
  );
};

export default VideoPlayer;
