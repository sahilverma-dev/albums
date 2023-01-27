import { Router } from "express";

// controllers
import {
  addImage,
  getAllImages,
  singleImage,
} from "../controllers/imagesControllers";

const imagesRoute = Router();

imagesRoute
  .get("/all", getAllImages)
  .get("/:id", singleImage)
  .post("/add", addImage);

export { imagesRoute };
