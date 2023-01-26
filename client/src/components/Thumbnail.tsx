// framer motion
import { motion } from "framer-motion";

// components
import { item } from "../constants/variants";

// prop type
interface PropType {
  image: any;
  onClick: () => void;
}

const Thumbnail = ({ image, onClick }: PropType) => {
  return (
    <motion.div
      variants={item}
      className="relative aspect-square rounded-md overflow-hidden cursor-pointer border"
      whileHover={{
        scale: 1.08,
      }}
      transition={{
        type: "tween",
        duration: 0.2,
      }}
      whileTap={{
        scale: 0.98,
      }}
      onClick={onClick}
    >
      <div className="overlay" />
      <img
        src={image}
        alt={image}
        className="h-full w-full object-cover origin-center"
        loading="lazy"
      />
    </motion.div>
  );
};

export default Thumbnail;
