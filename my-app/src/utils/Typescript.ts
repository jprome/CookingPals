import mongoose, { Mongoose } from "mongoose";
import { ChangeEvent, FormEvent } from "react";
import { StringDecoder } from "string_decoder";
import { StringMappingType } from "typescript";
import reducer from "../redux/reducers";

export type RootStore = ReturnType<typeof reducer>;

export type InputChange = ChangeEvent<
	HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
>;

export type FormSubmit = FormEvent<HTMLFormElement>;

export interface IParams {
	page: string;
	slug: string;
}

export interface IAlert {
	loading?: boolean;
	success?: string | string[];
	errors?: string | string[];
}

// User
export interface IUserLogin {
	account: string;
	password: string;
}

export interface IUserRegister extends IUserLogin {
	name: string;
	account: string;
	location: string;
	dob: string;
}
export interface IChat extends Document {
	chatName: string;
	isGroupChat: boolean;
	users: [mongoose.Schema.Types.ObjectId];
	latestMessage: mongoose.Schema.Types.ObjectId;
	groupAdmin: mongoose.Schema.Types.ObjectId;
}

export interface IUser extends IUserLogin {
  _id: string
  name?: string | null
  intro?: string | null
  location?: string | null
  updatedAt: string | null
  cookbook?: Cookbook []  | any
  request?: RequestCP | null  // number describes state -> active,in-process,expired, secondNu
  friends?: string[] | null
  groups?: string[] | null
  references?: Reference[] | null
  friendRequest?: [[string, number]] | null // number describes whether its individual or group
  occupation?: string | null
  gender?: string | null
  friendRequestGiven?: any
  friendRequestReceived?:any
  picture: string

}

// CookingPal Classes

export interface Recipe {
  _id?: string
  name: string
  description:string,
  steps: string[],
  ingredients: string [],
  cover_pic:string,
  content_pics: string [],
}
export interface Cookbook {
  id?: string
  title: string,
  diet_filters: string [],
  description: string,
  recipes: Recipe [],
  cover_pic: string
}

export interface RequestCP {
	description: string;

	cooking: number;
	ingredient: number;
	experience: number;

	diets: string[];
	weekly_budget: number;
	calendarRange?: Date[]; // pair of dates
	active: boolean;
	location: string
}

export interface RequestSearch {
	give_cooking: number;
	give_ingredient: number;
	give_experience: number;
	receive_cooking: number;
	receive_ingredient: number;
	receive_experience: number;

	diets: string[];
	budgetLow: number;
	budgetHigh: number;
}

export const diets = ["vegan", "vegetarian"]; // etc

export interface Reference {
	_id: string;
	rating: number;
	comment: string;
	date: Date;
	picture: string;
	pictures: string[];
	reference_author?: any;
	reference_author_name?: string;
	reference_author_pic?: string;
}

export interface Groups {
	id: string;
}
