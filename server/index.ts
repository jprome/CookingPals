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

// let users: any[] = [];

// const addUser = (userId: any, socketId: string) => {
// 	!users.some((user) => user.userId === userId) &&
// 		users.push({ userId, socketId });
// };

// const removeUser = (socketId: string) => {
// 	users = users.filter((user) => user.socketId !== socketId);
// };

// const getUser = (userId: any) => {
// 	return users.find((user) => user.userId === userId);
// };

// io.on("connection", (socket) => {
// 	//when ceonnect
// 	console.log("a user connected.");

// 	//take userId and socketId from user
// 	socket.on("addUser", (userId) => {
// 		addUser(userId, socket.id);
// 		io.emit("getUsers", users);
// 	});

// 	//send and get message
// 	socket.on("sendMessage", ({ senderId, receiverId, text }) => {
// 		const user = getUser(receiverId);
// 		console.log(user);
// 		io.to(user.socketId).emit("getMessage", {
// 			senderId,
// 			text,
// 		});
// 	});

// 	//when disconnect
// 	socket.on("disconnect", () => {
// 		console.log("a user disconnected!");
// 		removeUser(socket.id);
// 		io.emit("getUsers", users);
// 	});
// });

io.on("connection", (socket) => {
	console.log("Connected to socket.io");
	socket.on("setup", (userData) => {
		socket.join(userData._id);
		socket.emit("connected");
	});

	socket.on("join chat", (room) => {
		socket.join(room);
		console.log("User Joined Room: " + room);
	});

	socket.on("new message", (newMessageRecieved) => {
		var chat = newMessageRecieved.chat;
		if (!chat.users) return console.log("chat.users not defined");

		chat.users.forEach((user: any) => {
			if (user._id == newMessageRecieved.sender._id) return;
			console.log(newMessageRecieved.content);

			socket.in(user._id).emit("message received", newMessageRecieved);
		});
	});

	socket.on("disconnect", (userData: any) => {
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
