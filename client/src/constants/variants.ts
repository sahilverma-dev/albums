import { Variants } from "framer-motion";

export const page: Variants = {
  hidden: { opacity: 0, x: 200 },
  visible: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -200 },
};

export const container: Variants = {
  initial: { opacity: 0, y: 50 },
  hidden: { opacity: 0, x: "-100wh" },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      when: "beforeChildren",
      type: "spring",
      stiffness: 100,
      damping: 15,
      staggerChildren: 0.05,
    },
  },
};

export const item: Variants = {
  hidden: { x: -50, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
  },
};
