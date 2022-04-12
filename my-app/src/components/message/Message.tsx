import "./message.css";
// import Header from "../../components/headerNav";
import { FC } from "react";
import { format } from "timeago.js";

interface IProps {
	message: any;
	own: boolean;
}

const Message: FC<IProps> = ({ message, own }: IProps) => {
	return (
		<div className={own ? "message own" : "message"}>
			<div className="messageTop">
				<p className="messageText">{message.content}</p>
			</div>

			<div className="messageBottom"> {format(message.createdAt)}</div>
		</div>
	);
};

export default Message;
