import { Picture } from "../constants/interfaces";
import { motion } from "framer-motion";
import { item } from "../constants/variants";

interface Props {
  picture: Picture;
  onClick: (picture: Picture) => void;
}

const Thumbnail = ({ picture, onClick }: Props) => {
  return (
    <motion.div
      variants={item}
      layout
      layoutId={picture.url}
      className="relative aspect-square rounded overflow-hidden cursor-pointer"
      whileHover={{
        scale: 1.05,
      }}
      whileTap={{
        scale: 0.999999,
      }}
      transition={{
        type: "tween",
        ease: "easeInOut",
      }}
      onClick={() => onClick(picture)}
    >
      <div className="overlay" />
      <img src={picture.url} className=" object-cover h-full w-full" />
    </motion.div>
  );
};

export default Thumbnail;
