import { Mongoose } from 'mongoose'
import { ChangeEvent, FormEvent } from 'react'
import { StringDecoder } from 'string_decoder'
import reducer from '../redux/reducers'



export type RootStore = ReturnType<typeof reducer>

export type InputChange = ChangeEvent<
  | HTMLInputElement 
  | HTMLTextAreaElement 
  | HTMLSelectElement
>

export type FormSubmit = FormEvent<HTMLFormElement>

export interface IParams {
  page: string
  slug: string
}

export interface IAlert {
  loading?: boolean
  success?: string | string[]
  errors?: string | string[]
}


// User
export interface IUserLogin {
  account: string
  password: string
}

export interface IUserRegister extends IUserLogin {
  name: string
  account: string
  location: string
  dob: string
}

export interface IUser extends IUserLogin {
  _id: string
  name: string
  intro?: string
  location: string
  profile_pic?: File
  updatedAt: string
  cookbooks?: Cookbook []
  validate: boolean

}


// CookingPal Classes

export interface Recipe {
  id: string
  name: string
  description:string
  pic: File
}
export interface Cookbook {
  id: string
  diet: string []
  recipe: Recipe []
}





// Examples
export interface IArticle {
  title: string,
  description: string
}

