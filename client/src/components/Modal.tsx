import { ReactElement } from "react";

// framer motion
import { PanInfo, Variants, motion, useDragControls } from "framer-motion";

// icons
import { GrFormClose as CloseIcon } from "react-icons/gr";

// prop type
type Props = {
  children: ReactElement;
  close(): void;
};

// variants
const closeButtonVariant: Variants = {
  hidden: {
    x: 1000,
    transition: {
      delay: 0.1,
    },
  },
  visible: {
    x: 0,
    transition: {
      type: "spring",
      damping: 30,
      stiffness: 300,
    },
  },
};

const overlayVariant: Variants = {
  hidden: {
    opacity: 0,
    transition: {
      delay: 0.1,
    },
  },
  visible: {
    opacity: 1,
  },
};

const panelVariants: Variants = {
  hidden: {
    y: 1000,
    x: "-50%",
  },
  visible: {
    y: 0,
    x: "-50%",
    transition: {
      type: "spring",
      damping: 30,
      stiffness: 300,
    },
  },
};

const Modal = ({ children, close }: Props) => {
  const dragControls = useDragControls();
  const handleDragEnd = (event: any, info: PanInfo) => {
    if (info.offset.y > 200) close();
  };

  return (
    <>
      <motion.button
        type="button"
        whileTap={{
          scale: 0.92,
        }}
        variants={closeButtonVariant}
        initial="hidden"
        animate="visible"
        exit="hidden"
        onClick={close}
        className="fixed top-4 right-3 flex items-center justify-center text-2xl sm:text-3xl text-slate-700 bg-white rounded-full border aspect-square h-9 sm:h-11 z-20"
      >
        <CloseIcon />
      </motion.button>
      <motion.div
        variants={overlayVariant}
        initial="hidden"
        animate="visible"
        exit="hidden"
        className="fixed inset-0 bg-black/50 backdrop-blur z-10 cursor-pointer"
        onClick={close}
      ></motion.div>

      <motion.div
        layout
        variants={panelVariants}
        initial="hidden"
        animate="visible"
        exit="hidden"
        drag="y"
        dragConstraints={{
          top: 0,
          bottom: 0,
        }}
        dragElastic={0.8}
        onDragEnd={handleDragEnd}
        dragControls={dragControls}
        dragListener={false}
        className="fixed left-1/2 bottom-0 w-full max-w-[500px] shadow z-30 bg-white p-2 rounded-t-lg transition-all overflow-hidden"
      >
        <div
          className=" py-6 mx-auto w-40 cursor-grab active:cursor-grabbing"
          onPointerDown={(event) => dragControls.start(event)}
          style={{ touchAction: "none" }}
        >
          <div className="bg-black h-2 rounded-full"></div>
        </div>
        <div className="aspect-square">{children}</div>
      </motion.div>
    </>
  );
};

export default Modal;
