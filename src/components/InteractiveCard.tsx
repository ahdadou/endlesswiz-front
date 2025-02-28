
import { useState } from 'react';
import { Check, Play } from 'lucide-react';

interface InteractiveCardProps {
  word: string;
  pronunciation: string;
  definition: string;
  example: string;
}

const InteractiveCard = ({
  word,
  pronunciation,
  definition,
  example
}: InteractiveCardProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [showPronunciation, setShowPronunciation] = useState(false);

  const handlePlayClick = () => {
    setIsPlaying(true);
    // Simulate audio playback
    setTimeout(() => {
      setIsPlaying(false);
    }, 2000);
  };

  const togglePronunciation = () => {
    setShowPronunciation(!showPronunciation);
  };

  return (
    <div className="bg-card rounded-xl p-6 shadow-sm border border-border transition-all card-hover">
      <div className="flex justify-between items-start mb-3">
        <div>
          <span className="micro-text text-primary/60 block mb-1">Word</span>
          <h3 className="text-2xl font-medium">{word}</h3>
        </div>
        <button
          onClick={handlePlayClick}
          className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
            isPlaying 
              ? 'bg-primary/10 text-primary animate-pulse' 
              : 'bg-secondary hover:bg-secondary/80 text-foreground'
          }`}
          disabled={isPlaying}
        >
          <Play className="w-5 h-5 ml-0.5" />
        </button>
      </div>
      
      <div className="mb-4">
        <button 
          onClick={togglePronunciation}
          className="text-sm text-primary/80 hover:text-primary transition-colors flex items-center gap-1.5"
        >
          <span>Pronunciation guide</span>
          <span className="text-xs">({pronunciation})</span>
        </button>
        
        {showPronunciation && (
          <div className="mt-2 p-3 bg-secondary/50 rounded-lg animate-scale-in">
            <p className="text-sm">
              Break it down: <span className="font-medium">{pronunciation}</span>
            </p>
          </div>
        )}
      </div>
      
      <div className="mb-4">
        <span className="micro-text text-primary/60 block mb-1">Definition</span>
        <p className="text-foreground/80">{definition}</p>
      </div>
      
      <div>
        <span className="micro-text text-primary/60 block mb-1">Example</span>
        <p className="text-foreground/80 italic">"{example}"</p>
      </div>
      
      <div className="mt-5 pt-4 border-t border-border">
        <button className="button-secondary w-full flex items-center justify-center gap-2">
          <Check className="w-4 h-4" />
          <span>Mark as learned</span>
        </button>
      </div>
    </div>
  );
};

export default InteractiveCard;
