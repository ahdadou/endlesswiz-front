import useModalStore from "@/stores/useModalStore";
import { useEffect, useState } from "react";
import axios from "axios";
import { IoMdVolumeHigh, IoMdClose } from "react-icons/io"; // Icons

const DecitionaryModal = () => {
  const { data, setIsOpen } = useModalStore();
  const rawWord = data?.word || ""; // Ensure safe extraction

  // Remove punctuation (, . ! ? etc.) from the end of the word
  const word = rawWord.replace(/[.,!?;:]$/, "");

  const [definitions, setDefinitions] = useState<string[]>([]);
  const [synonyms, setSynonyms] = useState<string[]>([]);
  const [antonyms, setAntonyms] = useState<string[]>([]);
  const [examples, setExamples] = useState<string[]>([]);
  const [partOfSpeech, setPartOfSpeech] = useState<string | null>(null);
  const [audio, setAudio] = useState<string | null>(null);
  const [sourceUrl, setSourceUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!word) return;

    const fetchWordData = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await axios.get(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
        const data = response.data;

        if (data.length > 0) {
          const wordData = data[0];

          // Extract first available audio
          const validPhonetic = wordData.phonetics.find((p) => p.audio);
          setAudio(validPhonetic?.audio || null);

          // Extract source URL
          setSourceUrl(wordData.sourceUrls?.[0] || null);

          // Extract all meanings
          const allDefinitions: string[] = [];
          const allSynonyms: string[] = [];
          const allAntonyms: string[] = [];
          const allExamples: string[] = [];

          wordData.meanings.forEach((meaning) => {
            if (!partOfSpeech) setPartOfSpeech(meaning.partOfSpeech); // Set first part of speech

            meaning.definitions.forEach((def) => {
              if (def.definition) allDefinitions.push(def.definition);
              if (def.example) allExamples.push(def.example);
              if (def.synonyms.length > 0) allSynonyms.push(...def.synonyms);
              if (def.antonyms.length > 0) allAntonyms.push(...def.antonyms);
            });
          });

          setDefinitions(allDefinitions);
          setSynonyms([...new Set(allSynonyms)]); // Remove duplicates
          setAntonyms([...new Set(allAntonyms)]);
          setExamples(allExamples);
        }
      } catch (err) {
        setError("Failed to fetch word details. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchWordData();
  }, [word]);

  return (
    <div 
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 backdrop-blur-md animate-fade-in"
      onClick={() => setIsOpen(false)} // Close modal when clicking outside
    >
      <div 
        className="bg-white p-6 rounded-lg shadow-xl w-[90%] md:w-[65%] h-auto max-h-[80%] overflow-auto animate-slide-up relative"
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the modal
      >
        
        {/* Close Button (Top Right) */}
        <button
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
          onClick={() => setIsOpen(false)}
        >
          <IoMdClose size={24} />
        </button>

        {/* Header */}
        <div className="flex items-center space-x-2">
          <h2 className="text-2xl font-bold text-blue-600 capitalize">{word}</h2>
          {audio && (
            <button onClick={() => new Audio(audio).play()} className="text-blue-500 hover:text-blue-700">
              <IoMdVolumeHigh size={24} />
            </button>
          )}
        </div>

        {/* Loading & Error Handling */}
        {loading ? (
          <p className="text-center text-gray-500 mt-4">Loading...</p>
        ) : error ? (
          <p className="text-center text-red-500 mt-4">{error}</p>
        ) : (
          <>
            {/* Word Type */}
            {partOfSpeech && <p className="text-gray-500 text-sm mt-1">{partOfSpeech}</p>}

            {/* Definitions List */}
            <div className="mt-3">
              <strong className="text-blue-700">Definitions:</strong>
              <ul className="list-disc list-inside text-gray-800 mt-1">
                {definitions.length > 0 ? (
                  definitions.map((def, index) => <li key={index}>{def}</li>)
                ) : (
                  <p>No definitions available.</p>
                )}
              </ul>
            </div>

            {/* Example Sentences */}
            {examples.length > 0 && (
              <div className="mt-3">
                <strong className="text-blue-700">Examples:</strong>
                <ul className="list-disc list-inside text-gray-700 mt-1 italic">
                  {examples.map((ex, index) => <li key={index}>"{ex}"</li>)}
                </ul>
              </div>
            )}

            {/* Synonyms & Antonyms */}
            <div className="mt-4 flex flex-wrap gap-3">
              {synonyms.length > 0 && (
                <div>
                  <p className="text-blue-700 font-semibold">Synonyms:</p>
                  <p className="text-gray-800">{synonyms.join(", ")}</p>
                </div>
              )}
              {antonyms.length > 0 && (
                <div>
                  <p className="text-red-700 font-semibold">Antonyms:</p>
                  <p className="text-gray-800">{antonyms.join(", ")}</p>
                </div>
              )}
            </div>

            {/* Source Link */}
            {sourceUrl && (
              <div className="mt-4">
                <a
                  href={sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  View More on Wiktionary
                </a>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default DecitionaryModal;
