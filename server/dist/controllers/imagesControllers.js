"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.singleImage = exports.addImage = exports.getAllImages = void 0;
const imagesModel_1 = require("../models/imagesModel");
const getAllImages = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const images = yield imagesModel_1.Image.find();
        res.status(200).json({
            images: images.map((image) => ({
                id: image._id,
                caption: image.caption,
                src: image.src,
            })),
            total: images.length,
            message: "Images fetched successfully",
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            images: null,
            message: error.message,
        });
    }
});
exports.getAllImages = getAllImages;
const addImage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { caption, src } = req.body;
        const newImage = new imagesModel_1.Image({
            caption,
            src,
        });
        newImage.save();
        res.status(200).json({
            image: {
                id: newImage._id,
                caption: newImage.caption,
                src: newImage.src,
            },
            message: "New Image added successfully",
        });
    }
    catch (error) {
        res.status(500).json({
            images: null,
            message: error.message,
        });
    }
});
exports.addImage = addImage;
const singleImage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const image = yield imagesModel_1.Image.findById(id);
        if (image)
            res.status(200).json({
                image: {
                    id,
                    caption: image.caption,
                    src: image.src,
                },
                message: "Image Found",
            });
        else {
            res.status(404).json({
                image,
                message: "Image Not Found",
            });
        }
    }
    catch (error) {
        res.status(500).json({
            images: null,
            message: error.message,
        });
    }
});
exports.singleImage = singleImage;
