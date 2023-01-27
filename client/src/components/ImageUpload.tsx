import { useState, FormEvent, Dispatch, SetStateAction } from "react";

import { Variants, motion } from "framer-motion";

import Dropzone from "react-dropzone";
import axios from "axios";
import { ImagesType } from "../types";
import { api } from "../axios";

// variants
const drawSVG: Variants = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: (i) => {
    const delay = 1 + i * 0.5;
    return {
      pathLength: 1,
      opacity: 1,
      transition: {
        delay: 0.9,
        pathLength: { delay, type: "spring", duration: 1.5, bounce: 0 },
        opacity: { delay, duration: 0.01 },
        when: "afterParent",
      },
    };
  },
};

// props type
interface PropType {
  close: () => void;
  images: ImagesType[] | null;
  setImages: Dispatch<SetStateAction<ImagesType[] | null>>;
}

const ImageUpload = ({ close, setImages, images }: PropType) => {
  const [caption, setCaption] = useState<string>("");
  const [image, setImage] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const handelSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (image) {
      setIsLoading(true);
      const formData = new FormData();
      formData.append("image", image);
      try {
        const { data } = await axios({
          url: `https://api.imgbb.com/1/upload?key=${
            import.meta.env.VITE_IMGBB_API_KEY
          }`,
          method: "POST",
          data: formData,
        });
        if (data) {
          try {
            const { data: info } = await api({
              url: "images/add",
              method: "post",
              data: {
                src: data?.data?.url,
                caption,
              },
            });
            setIsLoading(false);
            close();
            // setImages((image: any) => [...image, info.image]);
            if (images) setImages([info.image, ...images]);
            console.log(info);
          } catch (error) {
            setIsLoading(false);
          }
        }
      } catch (error) {
        console.log(error);
        setIsLoading(false);
      }
    }
  };

  return (
    <>
      <div className="w-full aspect-square p-2">
        <h2 className="text-2xl font-bold w-full text-center my-3">
          Upload Image
        </h2>
        <form
          className="flex h-full flex-col items-center gap-3"
          onSubmit={handelSubmit}
        >
          <div className="w-[300px] relative aspect-square">
            <div className="flex items-center justify-center w-full">
              {!image ? (
                <Dropzone
                  onDrop={(acceptedFiles) => setImage(acceptedFiles[0])}
                  multiple={false}
                  // maxSize={5000}
                >
                  {({ getRootProps, getInputProps }) => (
                    <>
                      <div {...getRootProps()} className="w-full">
                        <div className="flex items-center justify-center w-full">
                          <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                              <motion.svg
                                aria-hidden="true"
                                initial="hidden"
                                animate="visible"
                                className="w-10 h-10 mb-3 text-gray-400"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <motion.path
                                  strokeWidth={2}
                                  strokeLinecap={"round"}
                                  variants={drawSVG}
                                  strokeLinejoin={"round"}
                                  d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                                />
                              </motion.svg>
                              <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                                <span className="font-semibold">
                                  Click to upload
                                </span>{" "}
                                or drag and drop
                              </p>
                              <p className="text-xs text-gray-500 dark:text-gray-400">
                                SVG, PNG, JPG or GIF
                              </p>
                            </div>
                          </label>
                        </div>
                      </div>
                      <input {...getInputProps()} />
                    </>
                  )}
                </Dropzone>
              ) : (
                <div className="aspect-square border rounded-md relative overflow-hidden">
                  <div className="overlay" />
                  <img
                    src={URL.createObjectURL(image)}
                    className={`h-full w-full object-cover ${
                      isLoading ? "opacity-50" : "opacity-100"
                    }`}
                  />
                </div>
              )}
            </div>
          </div>
          <input
            type="text"
            className="w-full border max-w-[300px] text-sm py-2 px-3 rounded-md outline-black/25  disabled:cursor-not-allowed disabled:opacity-50"
            placeholder="Enter your caption"
            required
            value={caption}
            disabled={isLoading}
            onChange={(e) => setCaption(e.target.value)}
          />

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setImage(null)}
              disabled={!image || isLoading}
              className="bg-red-500 active:bg-blue-800 text-white shadow-md px-6 py-2 border border-black/10 font-bold rounded-md disabled:cursor-not-allowed disabled:opacity-50"
            >
              Clear
            </button>
            <button
              type="submit"
              disabled={!image || caption.length < 5 || isLoading}
              className="bg-blue-500 active:bg-blue-800 text-white shadow-md px-6 py-2 border border-black/10 font-bold rounded-md disabled:cursor-not-allowed disabled:opacity-50"
            >
              Upload
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default ImageUpload;
