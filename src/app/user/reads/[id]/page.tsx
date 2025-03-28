"use client";

import { useState, useRef, useEffect } from "react";
import {
  ArrowLeft,
  Heart,
  Volume2,
  BookOpen,
  Settings,
  Moon,
  Sun,
  Plus,
  Bookmark,
  VolumeX,
  ChevronLeft,
  ChevronRight,
  Maximize,
  Minimize,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";

// Mock story data
const story = {
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
  content: [
    {
      paragraph:
        "Maria miró el mapa antiguo con curiosidad. Según la leyenda, una ciudad perdida se escondía en lo profundo de la selva amazónica. Ella había soñado con este momento durante años.",
      translation:
        "Maria looked at the ancient map with curiosity. According to legend, a lost city was hidden deep in the Amazon rainforest. She had dreamed of this moment for years.",
    },
    {
      paragraph:
        "El sol brillaba intensamente mientras Maria preparaba su mochila. Necesitaba agua, comida, una brújula y su cámara. La aventura estaba a punto de comenzar.",
      translation:
        "The sun was shining brightly as Maria prepared her backpack. She needed water, food, a compass, and her camera. The adventure was about to begin.",
    },
    {
      paragraph:
        "Su guía, Carlos, la esperaba en la entrada del sendero. 'Buenos días, señorita Maria. ¿Está lista para nuestra expedición?' preguntó con una sonrisa.",
      translation:
        "Her guide, Carlos, was waiting for her at the trailhead. 'Good morning, Miss Maria. Are you ready for our expedition?' he asked with a smile.",
    },
    {
      paragraph:
        "Maria asintió con entusiasmo. 'Sí, estoy muy emocionada. He estudiado este mapa durante meses. Creo que la ciudad perdida existe realmente.'",
      translation:
        "Maria nodded enthusiastically. 'Yes, I'm very excited. I've studied this map for months. I believe the lost city really exists.'",
    },
    {
      paragraph:
        "Caminaron durante horas a través de la densa vegetación. Los sonidos de la selva los rodeaban: pájaros exóticos, monos distantes y el constante zumbido de los insectos.",
      translation:
        "They walked for hours through the dense vegetation. The sounds of the jungle surrounded them: exotic birds, distant monkeys, and the constant buzz of insects.",
    },
    {
      paragraph:
        "De repente, Carlos se detuvo. 'Mire allí, señorita Maria.' Señaló hacia una formación rocosa cubierta de enredaderas. 'Eso no es natural.'",
      translation:
        "Suddenly, Carlos stopped. 'Look there, Miss Maria.' He pointed to a rock formation covered in vines. 'That's not natural.'",
    },
    {
      paragraph:
        "Maria se acercó lentamente. Con cuidado, apartó algunas de las plantas. Sus ojos se abrieron con asombro. Tallado en la piedra había un símbolo idéntico al del mapa.",
      translation:
        "Maria approached slowly. Carefully, she pushed aside some of the plants. Her eyes widened in amazement. Carved into the stone was a symbol identical to the one on the map.",
    },
    {
      paragraph:
        "'¡Lo encontramos, Carlos! Esta es la entrada.' Con manos temblorosas, Maria presionó el símbolo. La pared de roca comenzó a moverse, revelando un pasaje oculto.",
      translation:
        "'We found it, Carlos! This is the entrance.' With trembling hands, Maria pressed the symbol. The rock wall began to move, revealing a hidden passage.",
    },
    {
      paragraph:
        "El pasaje los condujo a un valle escondido. Ante ellos se extendía una ciudad antigua, con edificios de piedra y templos majestuosos. La ciudad perdida era real.",
      translation:
        "The passage led them to a hidden valley. Before them stretched an ancient city, with stone buildings and majestic temples. The lost city was real.",
    },
    {
      paragraph:
        "Maria sacó su cámara con emoción. 'Este es el descubrimiento de mi vida,' susurró. 'La ciudad perdida de los antiguos.'",
      translation:
        "Maria took out her camera with excitement. 'This is the discovery of my lifetime,' she whispered. 'The lost city of the ancients.'",
    },
  ],
};

// Mock vocabulary data
const vocabulary = {
  miró: {
    word: "miró",
    translation: "looked",
    definition: "Past tense of 'mirar' (to look)",
    pronunciation: "/mi'ro/",
    examples: ["Ella miró el cielo", "Él miró a su alrededor"],
    image: "/placeholder.svg?height=200&width=200",
  },
  mapa: {
    word: "mapa",
    translation: "map",
    definition: "A diagrammatic representation of an area",
    pronunciation: "/'mapa/",
    examples: ["Necesito un mapa de la ciudad", "El mapa muestra el camino"],
    image: "/placeholder.svg?height=200&width=200",
  },
  antiguo: {
    word: "antiguo",
    translation: "ancient, old",
    definition: "Having existed for a very long time",
    pronunciation: "/an'tigwo/",
    examples: ["Un libro antiguo", "Una ciudad antigua"],
    image: "/placeholder.svg?height=200&width=200",
  },
  selva: {
    word: "selva",
    translation: "jungle, rainforest",
    definition: "A dense forest in a tropical region",
    pronunciation: "/'selba/",
    examples: ["La selva amazónica", "Los animales de la selva"],
    image: "/placeholder.svg?height=200&width=200",
  },
  ciudad: {
    word: "ciudad",
    translation: "city",
    definition: "A large town",
    pronunciation: "/siu'dad/",
    examples: ["Vivo en la ciudad", "Una ciudad moderna"],
    image: "/placeholder.svg?height=200&width=200",
  },
  perdida: {
    word: "perdida",
    translation: "lost",
    definition: "Unable to be found or recovered",
    pronunciation: "/per'dida/",
    examples: ["La ciudad perdida", "Una oportunidad perdida"],
    image: "/placeholder.svg?height=200&width=200",
  },
  soñado: {
    word: "soñado",
    translation: "dreamed",
    definition: "Past participle of 'soñar' (to dream)",
    pronunciation: "/so'ɲado/",
    examples: ["He soñado contigo", "Ella ha soñado con viajar"],
    image: "/placeholder.svg?height=200&width=200",
  },
};

export default function ReadStoryPage({ params }: { params: { id: string } }) {
  const [currentPage, setCurrentPage] = useState(0);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [fontSize, setFontSize] = useState(18);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isReading, setIsReading] = useState(false);
  const [selectedWord, setSelectedWord] = useState<string | null>(null);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [showTranslation, setShowTranslation] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);

  // Toggle fullscreen
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen().catch((err) => {
        console.error(`Error attempting to enable fullscreen: ${err.message}`);
      });
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  // Handle word click
  const handleWordClick = (word: string) => {
    // Clean the word from punctuation
    const cleanWord = word.toLowerCase().replace(/[.,!?;:'"()]/g, "");

    // Check if word exists in vocabulary
    if (vocabulary[cleanWord as keyof typeof vocabulary]) {
      setSelectedWord(cleanWord);
    }
  };

  // Toggle favorite word
  const toggleFavoriteWord = (word: string) => {
    if (favorites.includes(word)) {
      setFavorites(favorites.filter((w) => w !== word));
    } else {
      setFavorites([...favorites, word]);
    }
  };

  // Text-to-speech for word pronunciation
  const speakWord = (word: string) => {
    if ("speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(word);
      utterance.lang = "es-ES"; // Spanish
      window.speechSynthesis.speak(utterance);
    }
  };

  // Text-to-speech for paragraph
  const speakParagraph = (text: string) => {
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel(); // Stop any current speech

      if (isReading) {
        setIsReading(false);
        return;
      }

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = "es-ES"; // Spanish
      utterance.onend = () => setIsReading(false);

      setIsReading(true);
      window.speechSynthesis.speak(utterance);
    }
  };

  // Stop speech when component unmounts
  useEffect(() => {
    return () => {
      if ("speechSynthesis" in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  // Render paragraph with interactive words
  const renderInteractiveText = (text: string) => {
    const words = text.split(" ");

    return words.map((word, index) => {
      // Clean the word from punctuation for checking
      const cleanWord = word.toLowerCase().replace(/[.,!?;:'"()]/g, "");

      // Check if word exists in vocabulary
      const isVocabularyWord = vocabulary[cleanWord as keyof typeof vocabulary];

      return (
        <span key={index} className="inline-block">
          <span
            className={`${isVocabularyWord ? "cursor-pointer hover:text-accent transition-colors" : ""} ${
              favorites.includes(cleanWord) ? "text-accent font-medium" : ""
            }`}
            onClick={() => isVocabularyWord && handleWordClick(cleanWord)}
          >
            {word}
          </span>
          {index < words.length - 1 ? " " : ""}
        </span>
      );
    });
  };

  return (
    <div
      ref={containerRef}
      className={`min-h-screen ${isDarkMode ? "bg-gray-900 text-gray-100" : "bg-white text-gray-800"} transition-colors duration-300`}
    >
      {/* Header */}
      <header
        className={`sticky top-0 z-10 ${isDarkMode ? "bg-gray-900/90 backdrop-blur-md" : "bg-white/90 backdrop-blur-md"} border-b ${isDarkMode ? "border-gray-700" : "border-gray-200"}`}
      >
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href="/reads">
              <Button variant="ghost" size="icon">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <div>
              <h1 className="text-lg font-semibold line-clamp-1">
                {story.title}
              </h1>
              <p className="text-sm text-muted-foreground">by {story.author}</p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setShowTranslation(!showTranslation)}
                    className={showTranslation ? "text-accent" : ""}
                  >
                    <BookOpen className="h-5 w-5" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{showTranslation ? "Hide" : "Show"} Translation</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setIsDarkMode(!isDarkMode)}
                  >
                    {isDarkMode ? (
                      <Sun className="h-5 w-5" />
                    ) : (
                      <Moon className="h-5 w-5" />
                    )}
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{isDarkMode ? "Light" : "Dark"} Mode</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setIsBookmarked(!isBookmarked)}
                  >
                    <Bookmark
                      className={`h-5 w-5 ${isBookmarked ? "fill-accent text-accent" : ""}`}
                    />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{isBookmarked ? "Remove Bookmark" : "Bookmark"}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={toggleFullscreen}
                  >
                    {isFullscreen ? (
                      <Minimize className="h-5 w-5" />
                    ) : (
                      <Maximize className="h-5 w-5" />
                    )}
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{isFullscreen ? "Exit Fullscreen" : "Fullscreen"}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <Settings className="h-5 w-5" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Settings</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="max-w-3xl mx-auto px-4 py-8">
        {/* Reading progress */}
        <div className="mb-6 flex items-center justify-between">
          <span className="text-sm text-muted-foreground">
            Page {currentPage + 1} of {story.content.length}
          </span>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setFontSize(Math.max(14, fontSize - 2))}
            >
              A-
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setFontSize(Math.min(24, fontSize + 2))}
            >
              A+
            </Button>
          </div>
        </div>

        {/* Story content */}
        <div
          className={`mb-8 p-6 rounded-lg ${isDarkMode ? "bg-gray-800" : "bg-cream-gradient"} shadow-md`}
        >
          {/* Paragraph */}
          <div
            className="mb-6"
            style={{ fontSize: `${fontSize}px`, lineHeight: 1.6 }}
          >
            {renderInteractiveText(story.content[currentPage].paragraph)}
          </div>

          {/* Translation */}
          {showTranslation && (
            <div
              className={`p-4 rounded-md ${isDarkMode ? "bg-gray-700/50" : "bg-white/70"} text-sm italic`}
            >
              {story.content[currentPage].translation}
            </div>
          )}

          {/* Audio controls */}
          <div className="mt-6 flex justify-center">
            <Button
              variant="outline"
              className={`flex items-center space-x-2 ${isReading ? "bg-accent text-white hover:bg-accent/90" : ""}`}
              onClick={() =>
                speakParagraph(story.content[currentPage].paragraph)
              }
            >
              {isReading ? (
                <>
                  <VolumeX className="h-4 w-4" />
                  <span>Stop Reading</span>
                </>
              ) : (
                <>
                  <Volume2 className="h-4 w-4" />
                  <span>Read Aloud</span>
                </>
              )}
            </Button>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex justify-between items-center">
          <Button
            variant="outline"
            onClick={() => {
              if (currentPage > 0) {
                setCurrentPage(currentPage - 1);
                window.scrollTo(0, 0);
              }
            }}
            disabled={currentPage === 0}
            className="flex items-center space-x-2"
          >
            <ChevronLeft className="h-4 w-4" />
            <span>Previous</span>
          </Button>

          <div className="flex-1 mx-4">
            <Slider
              value={[currentPage]}
              min={0}
              max={story.content.length - 1}
              step={1}
              onValueChange={(value) => {
                setCurrentPage(value[0]);
                window.scrollTo(0, 0);
              }}
            />
          </div>

          <Button
            variant="outline"
            onClick={() => {
              if (currentPage < story.content.length - 1) {
                setCurrentPage(currentPage + 1);
                window.scrollTo(0, 0);
              }
            }}
            disabled={currentPage === story.content.length - 1}
            className="flex items-center space-x-2"
          >
            <span>Next</span>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </main>

      {/* Word definition dialog */}
      <Dialog
        open={!!selectedWord}
        onOpenChange={(open) => !open && setSelectedWord(null)}
      >
        <DialogContent
          className={`${isDarkMode ? "bg-gray-800 text-white" : "bg-white"} max-w-md`}
        >
          <DialogHeader>
            <DialogTitle className="flex items-center justify-between">
              <div className="flex items-center">
                <span className="text-2xl font-bold text-accent mr-2">
                  {selectedWord &&
                    vocabulary[selectedWord as keyof typeof vocabulary]?.word}
                </span>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => selectedWord && speakWord(selectedWord)}
                >
                  <Volume2 className="h-4 w-4" />
                </Button>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => selectedWord && toggleFavoriteWord(selectedWord)}
              >
                <Heart
                  className={`h-5 w-5 ${selectedWord && favorites.includes(selectedWord) ? "fill-red-500 text-red-500" : ""}`}
                />
              </Button>
            </DialogTitle>
            <DialogDescription>
              {selectedWord && (
                <span className="text-muted-foreground">
                  {
                    vocabulary[selectedWord as keyof typeof vocabulary]
                      ?.translation
                  }{" "}
                  •{" "}
                  {
                    vocabulary[selectedWord as keyof typeof vocabulary]
                      ?.pronunciation
                  }
                </span>
              )}
            </DialogDescription>
          </DialogHeader>

          {selectedWord && (
            <>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="text-sm font-medium mb-1">Definition</h4>
                  <p className="text-sm">
                    {
                      vocabulary[selectedWord as keyof typeof vocabulary]
                        ?.definition
                    }
                  </p>

                  <h4 className="text-sm font-medium mt-4 mb-1">Examples</h4>
                  <ul className="text-sm space-y-1">
                    {vocabulary[
                      selectedWord as keyof typeof vocabulary
                    ]?.examples.map((example, index) => (
                      <li key={index} className="italic">
                        "{example}"
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex items-center justify-center">
                  <img
                    src={
                      vocabulary[selectedWord as keyof typeof vocabulary]
                        ?.image || "/placeholder.svg"
                    }
                    alt={
                      vocabulary[selectedWord as keyof typeof vocabulary]?.word
                    }
                    className="rounded-md max-h-32 object-cover"
                  />
                </div>
              </div>

              <DialogFooter className="flex justify-between items-center">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setSelectedWord(null)}
                >
                  Close
                </Button>
                <Button size="sm" className="flex items-center space-x-1">
                  <Plus className="h-4 w-4" />
                  <span>Add to My Words</span>
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
