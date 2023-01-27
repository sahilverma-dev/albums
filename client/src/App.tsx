import { useState, useEffect } from "react";

// components
import Grid from "./components/Grid";
import Header from "./components/Header";
import Loader from "./components/Loader";
import Modal from "./components/Modal";
import { images } from "./constants/images";
import Carousel from "./components/Carousel";
import { ImagesType } from "./types";

// framer motion
import { AnimatePresence, Variants, motion } from "framer-motion";
import ImageUpload from "./components/ImageUpload";
import { populateData } from "./util";
import { api } from "./axios";

const App = () => {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [showUploadModal, setShowUploadModal] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [images, setImages] = useState<ImagesType[] | null>(null);

  useEffect(() => {
    const getData = async () => {
      setIsLoading(true);
      try {
        const { data } = await api("/images/all");
        setIsLoading(false);
        setImages(data?.images?.reverse());
      } catch (error) {
        setIsLoading(false);
        console.log(error);
      }
    };
    getData();
  }, []);

  return (
    <div className="sm:max-w-[500px] relative overflow-y-scroll mih-h-screen mx-auto sm:border">
      <Header />
      {isLoading && <Loader />}
      {!isLoading && images?.length === 0 && (
        <div
          className="flex items-center justify-center flex-col gap-3"
          style={{
            height: "calc(100vh - 70px)",
          }}
        >
          <p className="font-bold">No Images</p>
        </div>
      )}
      {images && <Grid images={images} selectImage={setSelectedImage} />}
      <AnimatePresence>
        {selectedImage !== null && (
          <Modal close={() => setSelectedImage(null)}>
            <Carousel index={selectedImage} />
          </Modal>
        )}
      </AnimatePresence>
      <div className="fixed bottom-2 right-3 flex gap-2">
        {!isLoading && images?.length === 0 && (
          <button
            type="button"
            onClick={populateData}
            className=" bg-green-500 active:bg-blue-800 text-white shadow-md px-6 py-2 border border-black/10 font-bold rounded-md"
          >
            Populate Data
          </button>
        )}
        <button
          type="button"
          onClick={() => setShowUploadModal(true)}
          className=" bg-blue-500 active:bg-blue-800 text-white shadow-md px-6 py-2 border border-black/10 font-bold rounded-md"
        >
          Upload
        </button>
      </div>
      <AnimatePresence>
        {showUploadModal && (
          <Modal close={() => setShowUploadModal(false)}>
            <ImageUpload
              images={images}
              close={() => setShowUploadModal(false)}
              setImages={setImages}
            />
          </Modal>
        )}
      </AnimatePresence>
    </div>
  );
};

export default App;
