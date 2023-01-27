// framer motion
import { motion } from "framer-motion";

// components
import Thumbnail from "./Thumbnail";
import { container } from "../constants/variants";
import { ImagesType } from "../types";

// prop type
interface PropType {
  images: ImagesType[] | null;
  selectImage: (index: number) => void;
}

const Grid = ({ images, selectImage }: PropType) => {
  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-3 gap-2 p-2"
    >
      {images?.map((image, index) => (
        <Thumbnail
          key={image.id}
          image={image.src}
          onClick={() => selectImage(index)}
        />
      ))}
    </motion.div>
  );
};

export default Grid;
