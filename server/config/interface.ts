import { Document } from 'mongoose'
import { Request } from 'express'

export interface IArticle extends Document{
  title: string
  description: string
}
export interface IUser extends Document{
    name: string
    account: string
    password: string
    avatar: string
    role: string
    type: string
    _doc: object
}


export interface IReqAuth extends Request {
    user?: IUser
}
  
export interface IDecodedToken {
    id?: string
    newUser?: INewUser
    iat: number
    exp: number
}
export interface INewUser {
    name: string
    account: string
    password: string
}

export interface IUserParams {
    name: string 
    account: string 
    password: string
    type: string
  }
  