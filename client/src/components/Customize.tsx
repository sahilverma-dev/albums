import { Picture } from "../constants/interfaces";
import Carousel from "./Carousel";
// import { motion, useAnimation } from "framer-motion";

// icons
// import { AiOutlineDoubleRight as SlideIcon } from "react-icons/ai";

type Props = {
  onComplete: () => void;
  picture: Picture;
};

const Customize = ({ onComplete, picture }: Props) => {
  return (
    <div>
      <Carousel picture={picture} />
      <div className="p-4">
        <button
          className="bg-blue-600 font-bold text-white py-4 rounded-full w-full"
          onClick={() => onComplete()}
        >
          Continue
        </button>
      </div>
    </div>
  );
};

export default Customize;
