import { Dispatch } from 'redux'
import { IAuth, IAuthType, AUTH, EDIT_COOKBOOK, DELETE_COOKBOOK, CREATE_COOKBOOK } from '../types/authType' // 
import { IAlertType, ALERT } from '../types/alertType'

//import { checkImage, imageUpload } from '../../utils/ImageUpload'
import { patchAPI, getAPI, getAPISendInfo, postAPI, deleteAPI } from '../../utils/FetchData'
import { checkPassword } from '../../utils/Valid'

import { Cookbook, RequestCP } from '../../utils/Typescript'
import { GET_CURRENT_PROFILE, POST_REFERENCE, ICurrentProfileView } from '../types/profileType'
//import { checkImage, imageUpload } from '../../utils/imageUpload'
import { Photo } from '@material-ui/icons'
import { checkImage, uploadFile } from '../../utils/imageUpload'


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

      const photo = await uploadFile(avatar, `${auth.user._id}_profile_cover-pic`)
      
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

    const res = await patchAPI('user/update', {
      ...auth.user
    }, auth.access_token)

    dispatch({ type: ALERT, payload: {success: res.data.msg}})

  } catch (err: any) {
    dispatch({ type: ALERT, payload: {errors: err.response.data.msg}})
  }
}


export const updateUserPhoto = (
  avatar: File, auth: IAuth
) => async (dispatch: Dispatch<IAlertType |  IAuthType>) => {
  if(!auth.access_token || !auth.user) return;

  let url = '';
  try {
    dispatch({ type: ALERT, payload: {loading: true}})

    if(avatar){
      const check = checkImage(avatar)

      if(check) {
        console.log(check)
        return dispatch({ type: ALERT,payload: { errors: check } })
      }

      const photo = await uploadFile(avatar, `${auth.user._id}/profile_pic.png`)
      
      const res = await patchAPI('user/update', {
       avatar: `${auth.user._id}/profile_pic.png`
      }, auth.access_token)

      console.log("Profile pic submitted")


     
      dispatch({ 
        type: AUTH,
        payload: {
          access_token: auth.access_token,
          user: {
            ...auth.user, picture: `${auth.user._id}/profile_pic.png`
          }
        } 
      })
    }

   
    
    dispatch({ type: ALERT, payload: {loading: false}})

  } catch (err: any) {
    console.log(err)
    dispatch({ type: ALERT, payload: {errors: err}})
  }
}

export const updateRequest = (auth: IAuth, request: RequestCP
  ) => async (dispatch: Dispatch<IAlertType | IAuthType>) => {
    if(!auth.access_token || !auth.user) return;
  
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
  
  export const answerRequest = (auth: IAuth, id:string, answer:number) => 
  async (dispatch: Dispatch<IAlertType | IAuthType>) => {
      if(!auth.access_token || !auth.user) return;
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
  
    
      } catch (err: any) {
        dispatch({ type: ALERT, payload: {errors: err.response.data.msg}})
        console.log(err.response.data.msg)
  
      }
}

export const createCookbook = (auth: IAuth, cookbook: Cookbook) => 
async (dispatch: Dispatch<IAlertType | IAuthType>) => {
    if(!auth.access_token || !auth.user) return;
    try {
      
      const res = await postAPI('cookbook/create', {cookbook:cookbook} , auth.access_token)

      dispatch({ type: ALERT, payload: {loading: true}})
  
      dispatch({ 
        type: CREATE_COOKBOOK,
        payload: {
          access_token: auth.access_token,
          user:  res.data,
        } 
      })

    } catch (err: any) {
      dispatch({ type: ALERT, payload: {errors: err.response.data.msg}})
      console.log(err.response.data.msg)

    }
}

export const deleteCookbook = (auth: IAuth, id: string) => 
async (dispatch: Dispatch<IAlertType | IAuthType>) => {
    if(!auth.access_token || !auth.user) return;
    try {
      
      const res = await deleteAPI('cookbook/remove', {id:id} , auth.access_token)
      console.log(res)
      dispatch({ type: ALERT, payload: {loading: true}})
  
      dispatch({ 
        type: DELETE_COOKBOOK,
        payload: {
          access_token: auth.access_token,
          user:  res.data,
        } 
      })

    } catch (err: any) {
      dispatch({ type: ALERT, payload: {errors: err.response.data.msg}})
      console.log(err.response.data.msg)

    }
}

export const editCookbook = (auth: IAuth, cookbook: any, message: string) => 
async (dispatch: Dispatch<IAlertType | IAuthType>) => {
    if(!auth.access_token || !auth.user) return;
    try {
      
      const res = await patchAPI('cookbook/update', cookbook , auth.access_token)
      dispatch({ type: ALERT, payload: {loading: true}})
  
      console.log(message)

      dispatch({ 
        type: EDIT_COOKBOOK,
        payload: {
          access_token: auth.access_token,
          user:  res.data,
        } 
      })

    } catch (err: any) {
      dispatch({ type: ALERT, payload: {errors: err.response.data.msg}})
      console.log(err.response.data.msg)

    }
}



