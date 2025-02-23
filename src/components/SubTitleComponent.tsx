import useModalStore, { ModalType } from "@/stores/useModalStore";
import { highlightWord } from "@/utils/highlightWord";
import cx from "classnames";
import { Roboto } from "next/font/google";

interface SubTitleComponentProps {
  paragraph: string;
  highlighted_word: string;
  style?: string;
}

const roboto = Roboto({
  weight: "900",
  subsets: ["latin"],
});

export function SubTitleComponent({
  paragraph,
  style,
  highlighted_word,
}: SubTitleComponentProps) {
  const { setIsOpen, setData, setType } = useModalStore();

  const handleWordClick = (word: string) => {
    setData({
      word: word,
    });
    setType(ModalType.DECTIONARY);
    setIsOpen(true);
  };

  return (
    <div
      className={cx(
        style,
        roboto.className,
        "text-white text-sm md:text-2xl bg-blue-200 p-5 text-center"
      )}
    >
      {paragraph.split(" ").map((word, index) => (
        <span
          key={index}
          className={cx(
            "cursor-pointer px-1 inline-block transition-all",
            word === highlighted_word ? "bg-yellow-500" : "hover:underline"
          )}
          onClick={() => handleWordClick(word)}
        >
          {word}
        </span>
      ))}
    </div>
  );
}
