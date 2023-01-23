import { FC, ReactNode } from "react";
import { motion, PanInfo, Variants } from "framer-motion";

type Props = {
  children: ReactNode;
  onClose: () => void;
};

const overlayVariants: Variants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
  },
};

const panelVariant: Variants = {
  hidden: {
    y: 1000,
  },
  visible: {
    y: 0,
    transition: {
      type: "spring",
      damping: 30,
      stiffness: 300,
    },
  },
};

const Modal: FC<Props> = ({ children, onClose }) => {
  const handelDragEnd = (
    e: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo
  ) => {
    if (info.offset.y > 200) onClose();
  };
  return (
    <>
      <motion.div
        className="bg-black/50 backdrop-blur fixed inset-0 z-20"
        variants={overlayVariants}
        initial="hidden"
        animate="visible"
        exit="hidden"
        onClick={() => onClose()}
      />
      <motion.div
        variants={panelVariant}
        initial="hidden"
        animate="visible"
        exit="hidden"
        drag="y"
        dragConstraints={{
          top: 0,
          bottom: 0,
        }}
        dragElastic={0.8}
        onDragEnd={handelDragEnd}
        className="fixed bottom-0 rounded-xl shadow-lg w-full h-auto bg-white z-30"
      >
        <div className="bg-black/90 h-2 w-40 mx-auto my-4 rounded-full"></div>
        <motion.div
          className="div"
          drag="y"
          dragConstraints={{
            top: 0,
            bottom: 0,
          }}
          dragElastic={0}
        >
          {children}
        </motion.div>
      </motion.div>
    </>
  );
};

export default Modal;
