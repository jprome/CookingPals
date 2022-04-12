import React, { useContext, useEffect, useRef, useState } from "react";
import "./messenger.css";
import Header from "../../components/headerNav";
import Chat from "../../components/chats/Chat";
import Message from "../../components/message/Message";
import ChatOnline from "../../components/chatOnline/ChatOnline";
import { shallowEqual, useSelector } from "react-redux";
import { RootStore } from "../../utils/Typescript";
import { getAPI, getAPISendInfo, postAPI } from "../../utils/FetchData";
import { io } from "socket.io-client";

var socket: any, selectedChatCompare: any;

const Messender = () => {
	const [loading, setLoading] = useState(false);
	const [socketConnected, setSocketConnected] = useState(false);
	const [typing, setTyping] = useState(false);
	const [istyping, setIsTyping] = useState(false);
	const [chats, setChats] = useState<any[]>([]);
	const [currentChat, setCurrentChat] = useState<any>(null);
	const [messages, setMessages] = useState<any[]>([]);
	const [newMessage, setNewMessage] = useState<any>("");
	const [arrivalMessage, setArrivalMessage] = useState<any>(null);

	const scrollRef = useRef<null | HTMLDivElement>(null);
	const { auth } = useSelector((state: RootStore) => state, shallowEqual);
	const user = auth.user;
	const token = auth.access_token;

	useEffect(() => {
		socket = io("http://localhost:5000");
		socket.emit("setup", user);
	}, []);

	useEffect(() => {
		socket.on("message received", (newMessageRecieved: any) => {
			if (currentChat && currentChat._id === newMessageRecieved.chat._id) {
				console.log(messages.length);
				setMessages([...messages, newMessageRecieved]);
			}
		});
	});

	useEffect(() => {
		const getChats = async () => {
			try {
				const res = await getAPI("chat/get", token);
				setChats(res.data);
			} catch (err) {
				console.log(err);
			}
		};
		getChats();
	}, [token]);

	useEffect(() => {
		const getMessages = async () => {
			try {
				const res = await getAPISendInfo(
					"message/get",
					{ chatId: currentChat!._id },
					token
				);
				setMessages(res.data);
				socket.emit("join chat", currentChat._id);
			} catch (err) {
				console.log(err);
			}
		};
		getMessages();
	}, [currentChat]);

	const handleSubmit = async (e: any) => {
		if (newMessage) {
			e.preventDefault();
			socket.emit("stop typing", currentChat._id);
			const message = {
				sender: user?._id,
				content: newMessage,
				chat: currentChat,
				readBy: [user?._id],
				createdAt: Date.now(),
			};

			try {
				const res = await postAPI("message/send", message, token);
				socket.emit("new message", res.data);
				setMessages([...messages, res.data]);
				setNewMessage("");
			} catch (err) {
				console.log(err);
			}
		}
	};

	useEffect(() => {
		scrollRef.current?.scrollIntoView({
			behavior: "smooth",
		});
	}, [messages]);
	return (
		<React.Fragment>
			<Header />
			<div className="messenger">
				<div className="chatMenu">
					<div className="chatMenuWrapper">
						<input
							placeholder=" Search for friends"
							className="chatMenuInput"
						/>
						{chats.map((c: any) => (
							<div key={c._id} onClick={() => setCurrentChat(c)}>
								<Chat chats={c} currentUser={user!} />
							</div>
						))}
					</div>
				</div>
				<div className="chatBox">
					<div className="chatBoxWrapper">
						{currentChat ? (
							<React.Fragment>
								<div className="chatBoxTop">
									{messages.map((m: any) => (
										<div key={m._id} ref={scrollRef}>
											<Message message={m} own={m.sender._id === user!._id} />
										</div>
									))}
								</div>

								<div className="chatBoxBottom">
									<textarea
										className="chatMessageInput"
										placeholder="write something..."
										onChange={(e) => setNewMessage(e.target.value)}
										value={newMessage}
									></textarea>
									<button className="chatSubmitButton" onClick={handleSubmit}>
										Submit
									</button>
								</div>
							</React.Fragment>
						) : (
							<span className="noChatText">Open a Chat to start messaging</span>
						)}
					</div>
				</div>
				<div className="chatOnline">
					<div className="chatOnlineWrapper">
						<ChatOnline />
						<ChatOnline />
						<ChatOnline />
					</div>
				</div>
			</div>
		</React.Fragment>
	);
};

export default Messender;
