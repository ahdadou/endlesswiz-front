import TrueFocus from "../animations/TrueFocus/TrueFocus";

type NavbarProps = {};

export const Navbar = ({}: NavbarProps) => {
  return (
    <div className="h-16 w-full bg-white flex flex-col justify-center items-center">
      <div className="relative w-[300px]">
        <TrueFocus
          sentence="endless Wiz"
          manualMode={false}
          blurAmount={5}
          borderColor="red"
          animationDuration={2}
          pauseBetweenAnimations={1}
        />
      </div>
    </div>
  );
};
