"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.imagesRoute = void 0;
const express_1 = require("express");
// controllers
const imagesControllers_1 = require("../controllers/imagesControllers");
const imagesRoute = (0, express_1.Router)();
exports.imagesRoute = imagesRoute;
imagesRoute
    .get("/all", imagesControllers_1.getAllImages)
    .get("/:id", imagesControllers_1.singleImage)
    .post("/add", imagesControllers_1.addImage);
