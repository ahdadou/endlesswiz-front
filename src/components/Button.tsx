import cx from "classnames";

interface ButtonProps {
  children: React.ReactNode;
  onClick: () => void;
  style?: string;
  disabled?: boolean;
}

export function Button({
  children,
  onClick,
  style,
  disabled = false,
}: ButtonProps) {
  return (
    <button
      style={{
        fontFamily: "var(--font-josefin-sans)",
        backgroundColor: "var(--third-color)",
      }}
      className={cx(
        "flex h-10 w-20 text-white text-center items-center justify-center rounded-lg transition-all duration-300 ",
        "bg-black hover:bg-gray-800 active:scale-95",
        {
          "opacity-50 cursor-not-allowed bg-gray-600 hover:bg-gray-600":
            disabled, // Disabled state
        },
        style,
      )}
      onClick={!disabled ? onClick : undefined}
      disabled={disabled} // Properly disable button
    >
      {children}
    </button>
  );
}
