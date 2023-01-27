import { api } from "./axios";
import { images } from "./constants/images";
import { ImagesType } from "./types";

export const shuffleArray = (array: []) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

export const populateData = async () => {
  images.map(async (image: ImagesType) => {
    const { data } = await api({
      url: "/images/add",
      method: "post",
      data: {
        caption: image.caption,
        src: image.src,
      },
    });
    console.log(data);
  });
  window.location.reload();
};
