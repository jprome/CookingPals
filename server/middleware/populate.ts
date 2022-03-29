export const populate_user = (user: any) => {
	if (user) {
		return user
			.select("-password")
			.populate({
				path: "references",
				populate: {
					path: "reference_author",
					select: "name picture account",
				},
			})
			.populate({
				path: "friendRequestReceived",
				populate: {
					path: "userRequest",
					select: "name picture account",
				},
			})
			.populate({
				path: "friendRequestGiven",
				populate: {
					path: "userRecipient",
					select: "name picture account",
				},
			})
			.populate("friends", "name");
	}
	return user;
};
