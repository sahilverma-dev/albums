import { useState, useEffect } from "react";
import {
  motion,
  AnimatePresence,
  wrap,
  PanInfo,
  Variants,
} from "framer-motion";
import { images } from "../constants/images";

// icons
import {
  FiChevronLeft as LeftIcon,
  FiChevronRight as RightIcon,
} from "react-icons/fi";
import { MdFileDownload as DownloadIcon } from "react-icons/md";

// props type
interface PropType {
  index: number;
}

const carouselVariants: Variants = {
  enter: (direction: number) => {
    return {
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
      scale: 1,
    };
  },
  stay: {
    zIndex: 1,
    x: 0,
    opacity: 1,
    scale: 1,
  },
  exit: (direction: number) => {
    return {
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
      scale: 1,
    };
  },
};

const textVariant: Variants = {
  enter: {
    y: 100,
    opacity: 0,
  },
  stay: {
    y: 0,
    opacity: 1,
  },
  exit: {
    y: -100,
    opacity: 0,
  },
};

const swipeConfidenceThreshold = 10000;
const swipePower = (offset: number, velocity: number) => {
  return Math.abs(offset) * velocity;
};

const Carousel = ({ index }: PropType) => {
  const [[page, direction], setPage] = useState([0, 0]);

  const imageIndex = wrap(index, images.length, page);

  const paginate = (newDirection: number) => {
    setPage([page + newDirection, newDirection]);
  };

  const handelDragEnd = (e: any, { offset, velocity }: PanInfo) => {
    const swipe = swipePower(offset.x, velocity.x);
    if (swipe < -swipeConfidenceThreshold) {
      paginate(1);
    } else if (swipe > swipeConfidenceThreshold) {
      paginate(-1);
    }
  };

  useEffect(() => {
    window.onkeydown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") paginate(-1);
      else if (e.key === "ArrowRight") paginate(1);
    };
  }, []);

  return (
    <div className="p-2 w-full text-center">
      <div className="overflow-hidden px-6">
        <motion.div
          key={page}
          custom={direction}
          variants={textVariant}
          initial="enter"
          animate="stay"
          exit="exit"
          className="w-full sm:text-xl text-md font-bold truncate"
        >
          {images[imageIndex].caption}
        </motion.div>
      </div>
      <div className="flex aspect-square items-center justify-between gap-2">
        <button
          type="button"
          className="aspect-square p-2 bg-gray-200 rounded-full flex items-center justify-center active:bg-gray-400"
          onClick={() => paginate(-1)}
        >
          <LeftIcon />
        </button>
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={page}
            custom={direction}
            variants={carouselVariants}
            initial="enter"
            animate="stay"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 },
            }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={1}
            className="aspect-square border rounded-md relative overflow-hidden"
            onDragEnd={handelDragEnd}
          >
            <div className="overlay" />
            <img
              src={images[imageIndex].src}
              className="h-full w-full object-cover"
            />
            <a
              // ts ignore
              href={images[imageIndex].src}
              target="_blank"
              className="absolute bottom-2 right-2 aspect-square bg-green-500 rounded-md text-white p-2 z-10"
            >
              <DownloadIcon />
            </a>
          </motion.div>
        </AnimatePresence>
        <button
          type="button"
          className=" p-2 bg-gray-200 rounded-full flex items-center justify-center active:bg-gray-400"
          onClick={() => paginate(1)}
        >
          <RightIcon />
        </button>
      </div>
    </div>
  );
};

export default Carousel;
