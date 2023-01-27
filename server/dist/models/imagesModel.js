"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Image = void 0;
const mongoose_1 = require("mongoose");
const imagesSchema = new mongoose_1.Schema({
    caption: {
        type: String,
        required: true,
    },
    src: {
        type: String,
        required: true,
    },
});
exports.Image = (0, mongoose_1.model)("image", imagesSchema);
