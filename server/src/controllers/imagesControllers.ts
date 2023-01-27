import { Request, Response } from "express";
import { Image } from "../models/imagesModel";
import { ImageType } from "../types";

const getAllImages = async (req: Request, res: Response) => {
  try {
    const images = await Image.find();
    res.status(200).json({
      images,
      total: images.length,
      message: "Images fetched successfully",
    });
  } catch (error: any) {
    console.log(error);

    res.status(500).json({
      images: null,
      message: error.message,
    });
  }
};

const addImage = async (req: Request, res: Response) => {
  try {
    const { caption, src } = req.body;
    const newImage = new Image({
      caption,
      src,
    });

    newImage.save();
    res.status(200).json({
      image: newImage,
      message: "New Image added successfully",
    });
  } catch (error: any) {
    res.status(500).json({
      images: null,
      message: error.message,
    });
  }
};

const singleImage = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const image: ImageType | null = await Image.findById(id);

    if (image)
      res.status(200).json({
        image,
        message: "Image Found",
      });
    else {
      res.status(404).json({
        image,
        message: "Image Not Found",
      });
    }
  } catch (error: any) {
    res.status(500).json({
      images: null,
      message: error.message,
    });
  }
};

export { getAllImages, addImage, singleImage };
