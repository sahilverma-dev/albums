import { useState } from "react";
import { Picture } from "../constants/interfaces";

import { Variants, motion } from "framer-motion";

import Formats from "./Formats";
("./Formats");

// icons
import {
  FaChevronLeft as LeftIcon,
  FaChevronRight as RightIcon,
} from "react-icons/fa";

type Props = {
  picture: Picture;
};

const wrap = (index: number, total: number) => {
  if (index < 0) {
    return total - 1;
  }
  if (index === total) {
    return 0;
  }
  return index;
};

const options = [
  {
    label: "Square (1:1)",
    aspect: 1,
  },
  {
    label: "Portrait (3:4)",
    aspect: 3 / 4,
  },
  {
    label: "Landscape (16:9)",
    aspect: 16 / 9,
  },
];

const carouselVariant: Variants = {
  enter: {
    opacity: 0,
    x: 500,
  },
  visible: {
    opacity: 1,
    x: 0,
  },
  exit: {
    opacity: 0,
    x: -500,
  },
};

const Carousel = ({ picture }: Props) => {
  const [index, setIndex] = useState(0);

  const paginate = (newDirection: number) => {
    const newIndex = wrap(index + newDirection, options.length);
    setIndex(newIndex);
  };

  const Option = options[index];

  return (
    <div className="w-full flex flex-col items-center">
      <h3 className="text-md py-6 font-bold uppercase">Choose your format</h3>
      <div className="bg-zinc-400 py-3 flex items-center justify-between w-full">
        <button
          className="carousel-arrow text-2xl text-zinc-900 p-4"
          onClick={() => paginate(-1)}
        >
          <LeftIcon />
        </button>
        <div className="">
          {/* <Option.Component src={picture.url} /> */}
          <motion.img
            // layout
            src={picture.url}
            className="max-h-[350px] shadow-md rounded-md object-cover origin-center"
            style={{
              aspectRatio: Option.aspect,
            }}
          />
        </div>
        <button
          className="carousel-arrow text-2xl text-zinc-900 p-4 carousel-arrow--right"
          onClick={() => paginate(1)}
        >
          <RightIcon />
        </button>
      </div>
      <div className="py-2 px-7 -translate-y-1/2 bg-white font-bold rounded-md shadow-md text-sm border border-black overflow-hidden">
        <motion.div
          initial={{
            y: 100,
          }}
          animate={{
            y: 0,
          }}
          transition={{
            type: "tween",
          }}
          key={index}
        >
          {options[index].label}
        </motion.div>
      </div>
    </div>
  );
};

export default Carousel;
