import Thumbnail from "./Thumbnail";
import { Picture } from "../constants/interfaces";

import { motion } from "framer-motion";
import { container } from "../constants/variants";

interface Props {
  pictures: readonly Picture[];
  onPictureClick: (picture: Picture) => void;
}

const Grid = ({ pictures, onPictureClick }: Props) => {
  return (
    <motion.div
      layout
      variants={container}
      initial="hidden"
      animate="visible"
      className="grid gap-2 p-2 grid-cols-3 sm:grid-cols-4 lg:grid-cols-6"
    >
      {pictures.map((picture) => (
        <Thumbnail
          key={picture.url}
          picture={picture}
          onClick={onPictureClick}
        />
      ))}
    </motion.div>
  );
};

export default Grid;
