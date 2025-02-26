import cx from "classnames";
import { motion } from "framer-motion";

interface ButtonWithAnimationProps {
  children: React.ReactNode;
  onClick: () => void;
  style?: string;
  disabled?: boolean;
}

export function ButtonWithAnimation({
  children,
  onClick,
  style,
  disabled = false,
}: ButtonWithAnimationProps) {
  return (
    <div className={cx(style,"px-4 flex flex-col md:flex-row items-center justify-between")}>
    {/* Animated Button */}
    <motion.div
      initial={{ scale: 0.95 }}
      animate={{ 
        scale: [1, 1.05, 1],
        rotate: [0, -2, 2, 0],
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
        repeatType: "reverse"
      }}
    >
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onClick}
        className="bg-blue-500 text-white px-8 py-4 rounded-full text-lg font-semibold relative overflow-hidden"
      >
        <motion.div
          className="absolute inset-0 bg-white/20"
          initial={{ x: "-100%" }}
          animate={{ x: "100%" }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        {children}
      </motion.button>
    </motion.div>
  </div>
  );
}
