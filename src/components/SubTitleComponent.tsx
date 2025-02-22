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
  return (
    <div
      className={cx(
        style,
        roboto.className,
        "absolute bottom-[100px] left-40 right-40 z-20 text-white text-xl bg-black bg-opacity-50 p-5 text-center"
      )}
    >
      {highlightWord(paragraph, highlighted_word, "bg-yellow-500")}
    </div>
  );
}
