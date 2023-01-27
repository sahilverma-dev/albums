"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoute = void 0;
const express_1 = require("express");
const userControllers_1 = require("../controllers/userControllers");
const userRoute = (0, express_1.Router)();
exports.userRoute = userRoute;
userRoute
    .post("/login", userControllers_1.loginUser)
    .post("/register", userControllers_1.registerUser)
    .post("/random", userControllers_1.randomUser)
    .post("/google", userControllers_1.loginWithGoogle);
