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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginWithGoogle = exports.randomUser = exports.registerUser = exports.loginUser = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const axios_1 = __importDefault(require("axios"));
const userModel_1 = require("../models/userModel");
const mongoose_1 = require("mongoose");
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Find user with matching email
    const { email, password } = req.body;
    const user = yield userModel_1.User.findOne({ email });
    if (!user) {
        return res.status(404).send({
            error: "User not found",
        });
    }
    if (user.authProvider === "Email/Password") {
        // Compare provided password with user's hashed password
        const passwordMatch = yield bcrypt_1.default.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(401).send({
                error: "Incorrect password",
            });
        }
        if (!process.env.JWT_SECRET) {
            process.env.JWT_SECRET = "my-secret";
        }
        const payload = {
            id: user._id,
            name: user.name,
            email: user.email,
            authProvider: user.authProvider,
            avatar: user.avatar,
            verified: user.verified,
        };
        // Generate JWT and send it as a response
        const token = jsonwebtoken_1.default.sign(payload, process.env.JWT_SECRET);
        res.send({
            message: "Login successful",
            user: payload,
            token,
        });
    }
    else {
        res.status(400).send({
            message: "Email Used by other Auth Provider",
        });
    }
});
exports.loginUser = loginUser;
const registerUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Destructure email, password, and name from request body
    const { email, password, name } = req.body;
    // Find user with matching email
    const existingUser = yield userModel_1.User.findOne({ email });
    // If user is found
    if (existingUser) {
        // Check if user was created with Email/Password auth provider
        if ((existingUser === null || existingUser === void 0 ? void 0 : existingUser.authProvider) === "Email/Password") {
            // Send error response with message indicating email is already in use
            res.status(400).json({
                error: "Email Already Used",
            });
        }
        else {
            // Send error response with message indicating email is already in use by other auth provider
            res.status(400).json({
                message: "Email Already Used by other Auth Provider",
            });
        }
    }
    else {
        // Hash the password
        const salt = yield bcrypt_1.default.genSalt(15);
        const hashedPassword = yield bcrypt_1.default.hash(password, salt);
        // Creating new User
        const newUser = yield userModel_1.User.create({
            name,
            email,
            password: hashedPassword,
            authProvider: "Email/Password",
        });
        if (newUser) {
            const payload = {
                id: newUser._id,
                name: newUser.name,
                email: newUser.email,
                authProvider: newUser.authProvider,
                avatar: newUser.avatar,
                verified: newUser.verified,
            };
            // Generate a JWT for the new user
            const token = jsonwebtoken_1.default.sign(payload, process.env.JWT_SECRET || "", {
                expiresIn: "1d",
            });
            // Send the response with the user data and JWT
            res.status(200).json({
                user: payload,
                token,
                message: "New user Created",
            });
        }
    }
});
exports.registerUser = registerUser;
// const randomUser = async (req: Request, res: Response) => {
//   try {
//     // Get user data from the randomuser.me API
//     const { data } = await axios("https://randomuser.me/api?results=1");
//     // Create new user
//     const newUser = await User.create({
//       name: `${data?.results[0]?.name?.first} ${data?.results[0]?.name?.last}`,
//       email: data?.results[0]?.email,
//       authProvider: "Random",
//       avatar: data?.results[0]?.picture?.large,
//       verified: false,
//       password: data?.results[0]?.login?.password,
//     });
//     if (newUser) {
//       // Generate JWT for the new user
//       const payload = {
//         id: newUser._id,
//         name: newUser.name,
//         email: newUser.email,
//         authProvider: newUser.authProvider,
//         avatar: newUser.avatar,
//         verified: newUser.verified,
//       };
//       const token = jwt.sign(payload, process.env.JWT_SECRET || "", {
//         expiresIn: "1d",
//       });
//       // Send response with user data and JWT
//       res.status(200).json({
//         user: payload,
//         token,
//         message: "New user generated",
//       });
//     } else {
//       // Send response error
//       res.status(200).json({
//         user: null,
//         token: null,
//         message: "Failed to generate new user",
//       });
//     }
//   } catch (error: any) {
//     console.log(error.message.red);
//     res.status(500).send({
//       error: error.message,
//     });
//   }
// };
const randomUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j;
    try {
        // Get user data from the randomuser.me API
        const { data } = yield (0, axios_1.default)("https://randomuser.me/api?results=1");
        // Generate a random id for the new user
        const id = new mongoose_1.Types.ObjectId();
        // Create new user
        const newUser = yield userModel_1.User.create({
            _id: id,
            name: `${(_b = (_a = data === null || data === void 0 ? void 0 : data.results[0]) === null || _a === void 0 ? void 0 : _a.name) === null || _b === void 0 ? void 0 : _b.first} ${(_d = (_c = data === null || data === void 0 ? void 0 : data.results[0]) === null || _c === void 0 ? void 0 : _c.name) === null || _d === void 0 ? void 0 : _d.last}`,
            email: (_e = data === null || data === void 0 ? void 0 : data.results[0]) === null || _e === void 0 ? void 0 : _e.email,
            authProvider: "Random",
            avatar: (_g = (_f = data === null || data === void 0 ? void 0 : data.results[0]) === null || _f === void 0 ? void 0 : _f.picture) === null || _g === void 0 ? void 0 : _g.large,
            verified: false,
            password: (_j = (_h = data === null || data === void 0 ? void 0 : data.results[0]) === null || _h === void 0 ? void 0 : _h.login) === null || _j === void 0 ? void 0 : _j.password,
        });
        if (newUser) {
            // Generate JWT for the new user
            const payload = {
                id: newUser._id,
                name: newUser.name,
                email: newUser.email,
                authProvider: newUser.authProvider,
                avatar: newUser.avatar,
                verified: newUser.verified,
            };
            const token = jsonwebtoken_1.default.sign(payload, process.env.JWT_SECRET || "", {
                expiresIn: "1d",
            });
            // Send response with user data and JWT
            res.status(200).json({
                user: payload,
                token,
                message: "New user generated",
            });
        }
        else {
            // Send response error
            res.status(200).json({
                user: null,
                token: null,
                message: "Failed to generate new user",
            });
        }
    }
    catch (error) {
        console.log(error.message.red);
        res.status(500).send({
            error: error.message,
        });
    }
});
exports.randomUser = randomUser;
const loginWithGoogle = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id, name, email, avatar } = req.body;
        // Check if user with provided email already exists
        const user = yield userModel_1.User.findOne({ email });
        if (user) {
            // Create a payload with the user's name, email, id, avatar, and authProvider
            const payload = {
                name: user.name,
                email: user.email,
                id: user._id,
                avatar: user.avatar,
                authProvider: user.authProvider,
            };
            // Sign a JWT with the payload and secret key
            const token = jsonwebtoken_1.default.sign(payload, process.env.JWT_SECRET || "");
            // Send a response with the user's data and JWT
            res.send({
                user: payload,
                token,
            });
        }
        else {
            // If user with provided id does not exist, create a new user with the provided id
            const newUser = yield userModel_1.User.create({
                name,
                authProvider: "Google",
                password: id,
                email,
                avatar,
            });
            if (newUser) {
                // Create a payload with the user's name, email, id, avatar, and authProvider
                const payload = {
                    name: newUser.name,
                    email: newUser.email,
                    id: newUser._id,
                    avatar: newUser.avatar,
                    authProvider: newUser.authProvider,
                };
                // Sign a JWT with the payload and secret key
                const token = jsonwebtoken_1.default.sign(payload, process.env.JWT_SECRET || "");
                // Send a response with the user's data and JWT
                res.send({
                    user: newUser,
                    token,
                });
            }
        }
    }
    catch (error) {
        console.log(error.message.red);
        res.send({
            error: error.message,
        });
    }
});
exports.loginWithGoogle = loginWithGoogle;
