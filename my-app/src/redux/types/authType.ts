import { IUser } from '../../utils/Typescript'

export const AUTH = 'AUTH'
export const UPDATE_USER = 'UPDATE_USER'
export const UPDATE_REQUEST = 'UPDATE_REQUEST'
export const RESET_PASSWORD = 'RESET_PASSWORD'
export const GET_OTHER_INFO = 'GET_OTHER_INFO'

export const CREATE_COOKBOOK = 'CREATE_COOKBOOK'
export const DELETE_COOKBOOK = 'DELETE_COOKBOOK'
export const EDIT_COOKBOOK = 'EDIT_COOKBOOK'

export interface IAuth {
  msg?: string
  access_token?: string
  user?: IUser
}

export interface IAuthType{
  type: typeof AUTH | 
        typeof UPDATE_USER |
        typeof UPDATE_REQUEST |
        typeof RESET_PASSWORD |
        typeof GET_OTHER_INFO |
        typeof CREATE_COOKBOOK |
        typeof DELETE_COOKBOOK |
        typeof EDIT_COOKBOOK
  payload: IAuth
}