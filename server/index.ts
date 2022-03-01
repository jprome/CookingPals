import "dotenv/config";
require("dotenv");

import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import routes from "./routes/index";
import { createServer } from "http";

// Middleware
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(morgan("dev"));
app.use(cookieParser());

// Socket.io
const http = createServer(app);

// Routes
app.use("/api/auth", routes.authRouter);
app.use("/api/user", routes.userRouter);
app.use("/api/cookbook", routes.cookbookRouter);
app.use("/api/reference", routes.referenceRouter);
app.use("/api/request", routes.requestRouter);

// Database
import "./config/database";
import { Mongoose } from "mongoose";

// server listenning
const PORT = process.env.PORT || 5000;
http.listen(PORT, () => {
	console.log("Server is running on port", PORT);
});
