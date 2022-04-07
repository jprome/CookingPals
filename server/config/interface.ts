import { Document } from "mongoose";
import { Request } from "express";
import Reference from "../models/referenceModel";
import Recipe from "../models/recipeModel";
import Cookbook from "../models/cookbookModel";
import mongoose from "mongoose";

export interface IUser extends Document {
	name: string;
	account: string;
	password: string;
	location: String;
	intro: String;
	dob: string;
	picture: string;
	friends: [mongoose.Schema.Types.ObjectId];
	groups: [String];
	references: [Reference];
	cookbook: [Cookbook];
	request: food_request;
	friendRequestReceived: [friendRequest];
	friendRequestGiven: [friendRequest];

	_doc: Object;
	// TODO: Add other user properties
}
export interface chat extends Document {
	chatName: string;
	isGroupChat: boolean;
	users: [mongoose.Schema.Types.ObjectId];
	latestMessage: mongoose.Schema.Types.ObjectId;
	groupAdmin: mongoose.Schema.Types.ObjectId;
}

export interface friendRequest extends Document {
	userRequest: mongoose.Schema.Types.ObjectId;
	userRecipient: mongoose.Schema.Types.ObjectId;
	status: number;
}

export interface message extends Document {
	sender: mongoose.Schema.Types.ObjectId;
	content: string;
	chat: mongoose.Schema.Types.ObjectId;
	readBy: [mongoose.Schema.Types.ObjectId];
}

export interface Reference extends Document {
	reference_author: mongoose.Schema.Types.ObjectId;
	rating: number;
	comment: string;
	date: string;
	picture: string;
}
export interface food_request extends Document {
	ingredients: number;
	cooking: number;
	experience: number;
	description: string;
	diets: [string];
	active: boolean;
	weekly_budget: number;
	location: string;
}

export interface Recipe extends Document {
	name: string;
	description: string;
	ingredients: [string];
	picture: string;
}

export interface Cookbook extends Document {
	diet_filters: [string];
	title: string;
	description: string;
	recipes: [Recipe];
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
