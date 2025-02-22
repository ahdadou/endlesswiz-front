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
        "text-white text-sm md:text-2xl bg-blue-200 p-5 text-center"
      )}
    >
      {highlightWord(paragraph, highlighted_word, "bg-yellow-500")}
    </div>
  );
}
