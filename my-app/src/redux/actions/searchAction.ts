import { Dispatch } from 'redux'
import { IAlertType, ALERT } from '../types/alertType'
import { patchAPI, getAPISendInfo } from '../../utils/FetchData'

import { RequestCP } from '../../utils/Typescript'
import { IGet_Search_Results, IGet_Search_ResultsType,GET_REQUEST_SEARCH_RESULTS  } from '../types/searchType'


export const findRequests = (token: string, request: any
  ) => async (dispatch: Dispatch<IAlertType | IGet_Search_ResultsType>) => {
    if(!token) return;
  
    try {
        dispatch({ type: ALERT, payload: {loading: true}})

        const res = await getAPISendInfo('request/search', request)
        
        console.log(res.data)
      
        dispatch({ 
        type: GET_REQUEST_SEARCH_RESULTS,
        payload: {
          access_token: token,
          users: {
            
          },
        } 
      })
        
     // const res = await patchAPI('auth/login', {
     //  ...auth.user
     // }, auth.access_token)
  
    //dispatch({ type: ALERT, payload: {success: res.data.msg}})
  
    } catch (err: any) {
      dispatch({ type: ALERT, payload: {errors: err.response.data.msg}})
    }
  }
  



