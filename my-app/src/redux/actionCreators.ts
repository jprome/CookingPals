import * as actionTypes from "./actionTypes";
import { configureStore } from '@reduxjs/toolkit'
import axios, {AxiosResponse
    , AxiosError} from 'axios';
import { Dispatch } from 'redux'
import { ALERT, IAlertType} from '../types/alertType'
import { postAPI, getAPI, putAPI } from '../utils/FetchData'

export const addArticle = (article: IArticle, user: IUser) => 
  async (dispatch: Dispatch< ArticleAction | IAlertType>) => {
    try{
      const action: ArticleAction = {
          type: actionTypes.ADD_ARTICLE,
          article: article,
      }
      postAPI('article', {user:user,article:article},"1234")

      console.log(article)

      dispatch(action)
    }
    catch(err: any){
      console.log("addArticle: " + err)
      dispatch({ type: ALERT, payload: {errors: err.response.data.msg} })
    }
  }

export const getArticles = (user: IUser) => (
  
  async(dispatch: Dispatch< ArticleAction | IAlertType>) =>{

    try {
  
      const url = "article/user/" + user.id
      const res = await getAPI(url, "1234")
     
      const action:ArticleAction ={
        type: actionTypes.GET_ARTICLES,
        articles: res.data
      }

      console.log(res.data)

      dispatch(action)

    }
    catch(err:any){
        console.log(err)
    }
  })



export const removeArticle = (article: IArticle) => (
  async(dispatch: Dispatch< ArticleAction | IAlertType>) =>{
    try{
      const action: ArticleAction = {
        type: actionTypes.REMOVE_ARTICLE,
        article,
      }
      dispatch(action)
    }
    catch(err:any){

    }
  })


