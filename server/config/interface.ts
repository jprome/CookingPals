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
}
export interface food_request extends Document {
	give_ingredients: number;
	give_cooking: number;
	give_experience: number;
	receive_ingredients: number;
	receive_cooking: number;
	receive_experience: number;
	description: string;
	diets: [string];
	active: boolean;
	weekly_budget: number;
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
