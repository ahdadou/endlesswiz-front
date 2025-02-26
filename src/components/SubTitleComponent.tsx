import useModalStore, { ModalType } from "@/stores/useModalStore";
import useTranscriptStore, { Transcript } from "@/stores/useTranscriptStore";
import { highlightWord } from "@/utils/highlightWord";
import cx from "classnames";
import { Roboto } from "next/font/google";

interface SubTitleComponentProps {
  transcript: Transcript;
  highlighted_word: string;
  style?: string;
}

const roboto = Roboto({
  weight: "900",
  subsets: ["latin"],
});

export function SubTitleComponent({
  transcript,
  style,
  highlighted_word,
}: SubTitleComponentProps) {
  const { setIsOpen, setData, setType } = useModalStore();
  const { currentTranscript } = useTranscriptStore();

  const handleWordClick = (word: string) => {
    setData({
      word: word,
      transcript: currentTranscript,
    });
    setType(ModalType.DECTIONARY);
    setIsOpen(true);
  };

  return (
    <div className={cx(
      style,
      "text-white text-center text-lg leading-relaxed p-4 transition-all",
      "font-medium"
    )}>
      {transcript?.paragraph?.split(" ").map((word, index) => (
        <span
          key={index}
          className={cx(
            "cursor-pointer px-1 py-1 inline-block transition-all",
            "hover:bg-white/10 rounded-lg",
            "hover:scale-105 active:scale-95",
            highlighted_word.includes(word)
              ? "text-blue-400 font-bold drop-shadow-glow"
              : "text-white/90"
          )}
          onClick={() => handleWordClick(word)}
        >
          {word}
        </span>
      ))}
    </div>
  );
}