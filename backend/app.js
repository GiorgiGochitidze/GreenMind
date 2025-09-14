import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import UserAuth from "./routes/User/UserAuthRoute.js";
import LoadUser from "./routes/User/LoadUserRoute.js";
import RefreshToken from "./routes/RefreshToken/RefreshTokenRoute.js";
import Logout from "./routes/User/LogoutRoute.js";
const app = express();
const PORT = 5000;
import cookieParser from "cookie-parser";
dotenv.config();

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(cookieParser());

const MongoLocal = "mongodb://localhost:27017/GreenMind";

mongoose
  .connect(MongoLocal)
  .then(() => {
    console.log("Successfully connected to MongoDB");
  })
  .catch((err) => {
    console.log("Error while connecting to MongoDB", err);
  });

app.use("/", UserAuth);
app.use("/", LoadUser);
app.use("/", RefreshToken);
app.use("/", Logout);

app.listen(PORT, () => {
  console.log("Server is running on localhost:5000");
});
