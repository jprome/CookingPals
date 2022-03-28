import { Dispatch } from 'redux'
import { IAuth, IAuthType, AUTH } from '../types/authType' // 
import { IAlertType, ALERT } from '../types/alertType'

//import { checkImage, imageUpload } from '../../utils/ImageUpload'
import { patchAPI, getAPI, getAPISendInfo, postAPI } from '../../utils/FetchData'
import { checkPassword } from '../../utils/Valid'

import { RequestCP } from '../../utils/Typescript'
import { GET_CURRENT_PROFILE, POST_REFERENCE, ICurrentProfileView } from '../types/profileType'


export const updateUser = (avatar: File, name: string, auth: IAuth
) => async (dispatch: Dispatch<IAlertType | IAuthType>) => {
  if(!auth.access_token || !auth.user) return;

  // let url = '';
  try {

    dispatch({ type: ALERT, payload: {loading: true}})
    /*if(avatar){
      const check = checkImage(avatar)
      if(check) 
        return dispatch({ type: ALERT,payload: { errors: check } })

      const photo = await imageUpload(avatar)
      url = photo.url
    }*/

    dispatch({ 
      type: AUTH,
      payload: {
        access_token: auth.access_token,
        user: {
          ...auth.user,
        }
      } 
    })

    const res = await patchAPI('user', {
      ...auth.user
    }, auth.access_token)

    dispatch({ type: ALERT, payload: {success: res.data.msg}})

  } catch (err: any) {
    dispatch({ type: ALERT, payload: {errors: err.response.data.msg}})
  }
}

export const updateRequest = (auth: IAuth, request: RequestCP
  ) => async (dispatch: Dispatch<IAlertType | IAuthType>) => {
    if(!auth.access_token || !auth.user) return;
  
    //const res = await patchAPI('request/update', {request}, auth.access_token)
    
    try {
      
      const res = await patchAPI('request/update', request, auth.access_token)
      dispatch({ type: ALERT, payload: {loading: true}})
  
      dispatch({ 
        type: AUTH,
        payload: {
          access_token: auth.access_token,
          user: {
            ...auth.user, request: request
          },
        } 
      })
  
     //const res = await patchAPI('request/update', {
     // request
     // }, auth.access_token)
  
    //dispatch({ type: ALERT, payload: {success: res.data.msg}})
  
    } catch (err: any) {
      dispatch({ type: ALERT, payload: {errors: err.response.data.msg}})
    }
  }
  

export const resetPassword = (
  password: string, cf_password: string, token: string
) => async (dispatch: Dispatch<IAlertType | IAuthType>) => {

  const msg = checkPassword(password, cf_password)
  if(msg) return dispatch({ type: ALERT, payload: {errors: msg}})

  try {
    dispatch({ type: ALERT, payload: {loading: true}})

    const res = await patchAPI('reset_password', { password }, token)

    dispatch({ type: ALERT, payload: {success: res.data.msg}})

  } catch (err: any) {
    dispatch({ type: ALERT, payload: {errors: err.response.data.msg}})
  }
}


export const getOtherInfo = (id: string, token: string) => 
async (dispatch: Dispatch<IAlertType | ICurrentProfileView>) => {
  try {
    dispatch({ type: ALERT, payload: {loading: true}})

    const res = await getAPISendInfo('user/get', {id: id}, token)
    dispatch({
      type: GET_CURRENT_PROFILE,
      payload: res.data
    })

    dispatch({ type: ALERT, payload: {loading: false}})

  } catch (err: any) {
    dispatch({ type: ALERT, payload: {errors: err.response.data.msg}})
  }
}



export const postReference = (request: any, token: string) => 
async (dispatch: Dispatch<IAlertType | ICurrentProfileView>) => {
  try {
    dispatch({ type: ALERT, payload: {loading: true}})

    const res = await postAPI('reference/create', request, token)

    const user = await getAPISendInfo('user/get', {id: request.to_id}, token)

    dispatch({
      type: POST_REFERENCE,
      payload: user.data
    })

    dispatch({ type: ALERT, payload: {loading: false}})

  } catch (err: any) {
    dispatch({ type: ALERT, payload: {errors: err.response.data.msg}})
  }
}




export const sendFriendRequest = (auth: IAuth, request: {friend_id: string}
  ) => async (dispatch: Dispatch<IAlertType | IAuthType>) => {
    if(!auth.access_token || !auth.user) return;
  
    //const res = await patchAPI('request/update', {request}, auth.access_token)
    
    try {
      
      const res = await postAPI('user/request_friend', request, auth.access_token)
      dispatch({ type: ALERT, payload: {loading: true}})
  
      dispatch({ 
        type: AUTH,
        payload: {
          access_token: auth.access_token,
          user: {
            ...auth.user, friendRequestGiven: [...auth.user.friendRequestGiven, request.friend_id ]
          },
        } 
      })
  
     //const res = await patchAPI('request/update', {
     // request
     // }, auth.access_token)
  
    //dispatch({ type: ALERT, payload: {success: res.data.msg}})
  
    } catch (err: any) {
      dispatch({ type: ALERT, payload: {errors: err.response.data.msg}})
      console.log(err.response.data.msg)

    }
  }
  
  export const answerRequest = (auth: IAuth, id:string, answer:number
    ) => async (dispatch: Dispatch<IAlertType | IAuthType>) => {
      if(!auth.access_token || !auth.user) return;
    
      //const res = await patchAPI('request/update', {request}, auth.access_token)
      
      try {
        
        const res = await patchAPI('user/respond_friend', {status:answer,friendRequest_id:id}, auth.access_token)

        

        dispatch({ type: ALERT, payload: {loading: true}})
    
        dispatch({ 
          type: AUTH,
          payload: {
            access_token: auth.access_token,
            user:  res.data,
          } 
        })
    
       //const res = await patchAPI('request/update', {
       // request
       // }, auth.access_token)
    
      //dispatch({ type: ALERT, payload: {success: res.data.msg}})
    
      } catch (err: any) {
        dispatch({ type: ALERT, payload: {errors: err.response.data.msg}})
        console.log(err.response.data.msg)
  
      }
    }