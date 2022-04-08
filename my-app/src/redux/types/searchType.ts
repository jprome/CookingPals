import { IUser } from '../../utils/Typescript'

export const GET_REQUEST_SEARCH_RESULTS = "GET_REQUEST_SEARCH_RESULTS "

export interface IGet_Search_Results {
  msg?: string
  access_token?: string
  users?: IUser [] 
}

export interface IGet_Search_ResultsType{
    type: typeof GET_REQUEST_SEARCH_RESULTS ,
    payload:  IGet_Search_Results ,
  
  }
  
