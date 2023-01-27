import express, { json } from "express";
import dotenv from "dotenv";
import "colors";
import { connectDB } from "./config/db";
import cors from "cors";

// importing routes
import { imagesRoute } from "./routes/imagesRoute";

// configuration
dotenv.config();

const app = express();

const PORT = process.env.PORT || 4000;

app.use(json());

// configure CORS
app.use(
  cors({
    origin: process.env.ORIGIN || "*",
  })
);

// connecting database
connectDB();

// using routes
app.get("/", (req, res) => {
  res.send("listening");
});
app.use("/api/v1/images", imagesRoute);

console.clear();

app.listen(PORT, () => {
  console.log(`Listening on the port ${PORT}`);
});
