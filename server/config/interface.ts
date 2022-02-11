import { Document } from "mongoose";
import { Request } from "express";
import Reference from "../models/referenceModel";
import Recipe from "../models/recipeModel";
import Cookbook from "../models/cookbookModel";

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
	picture: string;
	friends: [String];
	groups: [String];
	references: [Reference];
	cookbook: [Cookbook];
	_doc: Object;
	// TODO: Add other user properties
}

export interface Reference extends Document {
	reference_author: string;
	rating: number;
	comment: string;
	date: string;
	picture: string;
	_doc: Object;
}

export interface Recipe extends Document {
	name: string;
	description: string;
	ingredients: [string];
	picture: string;
}

export interface Cookbook extends Document {
	diet_filters: [string];
	name: string;
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

export interface IUserParams {
	name: string;
	account: string;
	password: string;
	type: string;
}
