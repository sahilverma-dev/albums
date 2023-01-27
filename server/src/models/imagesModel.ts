import { model, Schema } from "mongoose";
import { ImageType } from "../types";

const imagesSchema = new Schema<ImageType>({
  caption: {
    type: String,
    required: true,
  },
  src: {
    type: String,
    required: true,
  },
});

export const Image = model<ImageType>("image", imagesSchema);
