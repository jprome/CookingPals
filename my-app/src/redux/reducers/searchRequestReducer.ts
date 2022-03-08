import { AUTH, IAuth, IAuthType } from '../types/authType'
import { IGet_Search_ResultsType , IGet_Search_Results, GET_REQUEST_SEARCH_RESULTS } from '../types/searchType'

const initialState: IGet_Search_Results = {
  user: [],
  access_token:"FakeToken",
  msg:"No Message"
}

const searchRequestReducer = (state: IGet_Search_Results = initialState, action: IGet_Search_ResultsType): IGet_Search_Results => {
  switch (action.type){
    case GET_REQUEST_SEARCH_RESULTS :
      return action.payload
    default:
      return state
  }
}

export default searchRequestReducer;






