import "./chatOnline.css";

const ChatOnline = () => {
	return (
		<div className="chatOnline">
			<div className="chatOnlineFriend">
				<div className="chatOnlineImgContainer">
					<img
						className="chatOnlineImg"
						src="https://t4.ftcdn.net/jpg/00/64/67/63/240_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg"
						alt=""
					/>
					<div className="chatOnlineBadge"></div>
				</div>
				<span className="chatOnlineName">John Doe</span>
			</div>
		</div>
	);
};

export default ChatOnline;
