import { motion } from "framer-motion";

interface FlashcardProps {
  front: string;
  back: string;
  isFlipped: boolean;
  onFlip: () => void;
}

function Flashcard({ front, back, isFlipped, onFlip }: FlashcardProps) {
  return (
    <motion.div
      className="w-80 h-48 mx-auto cursor-pointer rounded-lg shadow-lg"
      onClick={onFlip}
      animate={{ rotateY: isFlipped ? 180 : 0 }}
      transition={{ duration: 0.6 }}
      style={{ position: "relative" }}
    >
      <motion.div
        className="absolute w-full h-full flex items-center justify-center text-2xl bg-white rounded-lg border"
        style={{ backfaceVisibility: "hidden" }}
      >
        {front}
      </motion.div>
      <motion.div
        className="absolute w-full h-full flex items-center justify-center text-2xl bg-white rounded-lg border"
        style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
      >
        {back}
      </motion.div>
    </motion.div>
  );
}

export default Flashcard;
