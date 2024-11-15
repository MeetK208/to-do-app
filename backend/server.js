import express from "express";
import dotenv from "dotenv";
import colors from "colors";
import cors from "cors";
import morgan from "morgan";
import mongoose from "mongoose";
import eae from "express-async-errors";

import authRoutes from "./routes/authRoutes.js";
import todoRoutes from "./routes/todoRoutes.js";
import errorMiddelware from "./middlewares/errorMiddleware.js";
import connectDB from "./config/db_connect.js";

dotenv.config(); // Config to add .env file // dotenv.config({path : './config'})
connectDB(); // MongoDB connection

const app = express(); // To create express Server

// Middelware
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

// Get API
app.get("/", (req, res) => {
  res.send("<h1> Welcome to To-Do List Application </h1>");
});

app.use("/api/v1/auth", authRoutes);
console.log("Server");
app.use("/api/v1/todo", todoRoutes);

app.use(errorMiddelware);

const PORT = process.env.PORT || 8080; //Port No from Config File
const DEV_MODE = process.env.DEV_MODE || "Development"; // DEV_MODE from Config File

app.listen(PORT, "127.0.0.1", () => {
  console.log(`Node Server Running in ${DEV_MODE} Mode on Port No ${PORT}`);
});
