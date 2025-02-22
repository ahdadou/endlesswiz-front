
export const highlightWord = (text: string, word: string, className: any) => {
    const parts = text.split(new RegExp(`(${word})`, "gi"));
    return parts.map((part, index) =>
      part.toLowerCase() === word.toLowerCase() ? (
        <span key={index} className={className}>
          {part}
        </span>
      ) : (
        part
      )
    );
};
  