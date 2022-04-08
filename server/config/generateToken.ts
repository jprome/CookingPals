import jwt from "jsonwebtoken";

// Generate Active Token to activate user account
export const generateActiveToken = (payload: object) => {
	return jwt.sign(payload, `${process.env.ACTIVE_TOKEN_SECRET}`, {
		expiresIn: "5m",
	});
};
// Generate Acesss Token to access user details
export const generateAccessToken = (payload: object) => {
	return jwt.sign(payload, `${process.env.ACCESS_TOKEN_SECRET}`, {
		expiresIn: "60m",
	});
};

// Generate Refresh Token to refrsh access tokens
export const generateRefreshToken = (payload: object) => {
	return jwt.sign(payload, `${process.env.REFRESH_TOKEN_SECRET}`, {
		expiresIn: "30d",
	});
};
