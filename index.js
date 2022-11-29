import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import UserRoutes from "./Routes/users.js";
import VideoRoutes from "./Routes/videos.js";
import CommentRoutes from "./Routes/comments.js";
import AuthRoutes from "./Routes/auth.js";

const app = express();
dotenv.config();

const connectDB = () => {
  mongoose
    .connect(process.env.MONGODB)
    .then(() => {
      console.log("Connected to DB");
    })
    .catch((err) => {
      throw err;
    });
};

app.use(cookieParser());
app.use(express.json());
app.use("/api/auth", AuthRoutes);
app.use("/api/users", UserRoutes);
app.use("/api/videos", VideoRoutes);
app.use("/api/comments", CommentRoutes);

app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || "Something went wrong";
  return res.status(status).json({
    success: false,
    status,
    message,
  });
});

app.listen(8800, () => {
  connectDB();
  console.log("Server's live!");
});
