import "./chat.css";
import { FC, useEffect, useState } from "react";
import { IChat, IUser } from "../../utils/Typescript";
import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

interface IProps {
	chats: any;
	currentUser: IUser;
}
const Chat: FC<IProps> = ({ chats, currentUser }: IProps) => {
	const [user, setUser] = React.useState<any>("hello");

	useEffect(() => {
		const friend = chats.users.find(
			(m: { _id: any }) => String(m._id) !== currentUser._id
		);
		setUser(friend);
	}, [currentUser, chats]);

	return (
		<div className="chat">
			<img
				className="chatImg"
				src={
					user!.picture
						? user!.picture
						: "https://t4.ftcdn.net/jpg/00/64/67/63/240_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg"
				}
				alt=""
			/>

			<Typography variant="body2" gutterBottom>
				<b>{user!.name} </b>
			</Typography>
		</div>
	);
};

export default Chat;
