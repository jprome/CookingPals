import { Dispatch } from 'redux'
import { AUTH, IAuthType } from '../types/authType'
import { ALERT, IAlertType } from '../types/alertType'

import { IUserLogin, IUserRegister } from '../../utils/Typescript'
import { postAPI, getAPI } from '../../utils/FetchData'
import { validRegister } from '../../utils/Valid'


export const login = (userLogin: IUserLogin) => 
async (dispatch: Dispatch<IAuthType | IAlertType>) => {
  try {
    dispatch({ type: ALERT, payload: { loading: true } }) // loading

    const res = await postAPI('auth/login', userLogin) // login - activate receive token
    
    dispatch({ type: AUTH,payload: res.data }) // save login data on auth state 

    dispatch({ type: ALERT, payload: { success: res.data.msg } }) // success message

    localStorage.setItem('logged', 'activated') // store activated
    
  } catch (err: any) {

    dispatch({ type: AUTH, payload: { access_token:"", msg:err.response.data.msg } })
  }
}


export const register = (userRegister: IUserRegister) => 
async (dispatch: Dispatch<IAuthType | IAlertType>) => {
  const check = validRegister(userRegister)
  
  if(check.errLength > 0)
    return dispatch({ type: ALERT, payload: { errors: check.errMsg } })

  try {
    dispatch({ type: ALERT, payload: { loading: true } }) // loading
   
    const res = await postAPI('auth/register', userRegister) // send new account info
    
    dispatch({ type: AUTH, payload: res.data })

    dispatch({ type: ALERT, payload: { success: res.data.msg } }) // save account info on auth state
  } catch (err: any) {
    dispatch({ type: ALERT, payload: { errors: err.response.data.msg } }) 
    console.log(err.response.data.msg)
  }
}


export const refreshToken = () => 
async (dispatch: Dispatch<IAuthType | IAlertType>) => {
  const logged = localStorage.getItem('logged') // cant refresh token if not logged in
  if(logged !== 'activated') return;

  try {
    dispatch({ type: ALERT, payload: { loading: true } }) 
    
    const res = await getAPI('refresh_token')
    
    dispatch({ type: AUTH,payload: res.data })

    dispatch({ type: ALERT, payload: { } })
  } catch (err: any) {
    dispatch({ type: ALERT, payload: { errors: err.response.data.msg } })
  }
}


export const logout = () => 
async (dispatch: Dispatch<IAuthType | IAlertType>) => {
  try {

    localStorage.removeItem('logged')
    
   // dispatch({ type: AUTH, payload: { } })

    await getAPI('logout')

  } catch (err: any) {
    dispatch({ type: ALERT, payload: { errors: err.response.data.msg } })
  }
}

