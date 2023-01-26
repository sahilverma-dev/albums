import { useState } from "react";

// components
import Grid from "./components/Grid";
import Header from "./components/Header";
import Loader from "./components/Loader";
import Modal from "./components/Modal";
import { images as data } from "./constants/images";
import { AnimatePresence } from "framer-motion";
import Carousel from "./components/Carousel";

// icons
import { BsShuffle as ShuffleIcon } from "react-icons/bs";
import { shuffleArray } from "./util";

const App = () => {
  const [selectedImage, setSelectedImage] = useState<any>(null);
  const [images, setImages] = useState<any[]>(data);
  return (
    <div className="sm:max-w-[500px] mx-auto sm:border">
      <Header />
      <Grid images={images} selectImage={setSelectedImage} />
      <AnimatePresence>
        {selectedImage !== null && (
          <Modal close={() => setSelectedImage(null)}>
            <Carousel index={selectedImage} />
          </Modal>
        )}
      </AnimatePresence>

      <div className="flex justify-center my-4">
        <button
          className="bg-green-500 flex items-center gap-3 py-2 px-5  rounded-md font-bold text-white"
          onClick={() => {
            // const new
            // setImages(shuffleArray(data));
          }}
        >
          <ShuffleIcon /> <div>Downland</div>
        </button>
      </div>
      {/* <Loader /> */}
    </div>
  );
};

export default App;
