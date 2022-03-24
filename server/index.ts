import "dotenv/config";
require("dotenv");

import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import routes from "./routes/index";
import { createServer } from "http";
import { Server, Socket } from "socket.io";
// import { SocketServer } from "./config/socket";

// Middleware
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(morgan("dev"));
app.use(cookieParser());

// Socket.io
const http = createServer(app);
const io = new Server(http, {
	pingTimeout: 60000,
	cors: {
		origin: "http://localhost:3000",
		// credentials: true,
	},
});

io.on("connection", (socket: Socket) => {
	console.log("Connected to socket.io");
	socket.on("setup", (userData) => {
		socket.join(userData._id);
		socket.emit("connected");
	});

	socket.on("join chat", (room) => {
		socket.join(room);
		console.log("User Joined Room: " + room);
	});
	socket.on("typing", (room) => socket.in(room).emit("typing"));
	socket.on("stop typing", (room) => socket.in(room).emit("stop typing"));

	socket.on("new message", (newMessageReceived) => {
		var chat = newMessageReceived.chat;

		if (!chat.users) return console.log("chat.users not defined");

		chat.users.forEach((user: { _id: string | string[] }) => {
			if (user._id == newMessageReceived.sender._id) return;

			socket.in(user._id).emit("message received", newMessageReceived);
		});
	});

	socket.off("setup", (userData) => {
		console.log("USER DISCONNECTED");
		socket.leave(userData._id);
	});
});

// Routes
app.use("/api/auth", routes.authRouter);
app.use("/api/user", routes.userRouter);
app.use("/api/cookbook", routes.cookbookRouter);
app.use("/api/reference", routes.referenceRouter);
app.use("/api/request", routes.requestRouter);
app.use("/api/chat", routes.chatRouter);
app.use("/api/message", routes.messageRouter);

// Database
import "./config/database";

// server listenning
const PORT = process.env.PORT || 5000;
http.listen(PORT, () => {
	console.log("Server is running on port", PORT);
});
