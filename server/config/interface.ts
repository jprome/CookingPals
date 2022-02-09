import { Document } from "mongoose";
import { Request } from "express";

export interface IArticle extends Document {
	title: string;
	description: string;
}
export interface IUser extends Document {
	name: string;
	account: string;
	password: string;
	location: String;
	intro: String;
	dob: string;
	friends: [String];
	groups: [String];
	_doc: Object;
	// TODO: Add other user properties
}

export interface IReqAuth extends Request {
	user?: IUser;
}

export interface IDecodedToken {
	id?: string;
	newUser?: INewUser;
	iat: number;
	exp: number;
}
export interface INewUser {
	name: string;
	account: string;
	password: string;
	location: String;
}

export interface IUserParams {
	name: string;
	account: string;
	password: string;
	type: string;
}
