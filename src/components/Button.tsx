import cx from "classnames";

interface ButtonProps {
    children: React.ReactNode;
    onClick: () => void;
    style?: string;
}

export function Button({ children, onClick, style }: ButtonProps) {
    return (
      <div
        className={cx(
          style,
          "flex bg-blue-500 h-10 w-20 text-white text-center items-center justify-center cursor-pointer"
        )}
        onClick={onClick}
      >
        {children}
      </div>
    );
  }
  