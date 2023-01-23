import express, { json } from "express";
import dotenv from "dotenv";
import "colors";
// importing routes
import { connectDB } from "./config/db";

// configuration
dotenv.config();

const app = express();

const PORT = process.env.PORT || 4000;

app.use(json());

// connecting database
connectDB();

// using routes
app.get("/", (req, res) => {
  res.send("listening");
});

console.clear();

app.listen(PORT, () => {
  console.log(`Listening on the port ${PORT}`);
});
