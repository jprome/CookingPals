import { AUTH, IAuth, IAuthType } from '../types/authType'
import { IGet_Search_ResultsType , IGet_Search_Results, GET_REQUEST_SEARCH_RESULTS } from '../types/searchType'

const initialState: IGet_Search_Results = {
  users: [{
    _id:"11b4817db2be3036e",
    name:"Jose Romero",
    password:"This is my password",
    location:"United States Florida Miami",
    updatedAt:"asfd",
    account:"jose@gmail.com",
    request: {
      description:"Looking for people to partner with that like to eat plant based meals. I am fine with eating meat every once in a while, but would prefer forthe diet to be mostly meat. Message for more details!",
      give_cooking: 1,
      give_experience: 1,
      give_ingredient: 1,
      receive_cooking: 1,
      receive_experience: 1,
      receive_ingredient: 1,
      diet:["Vegan","Vegetarian"],
      weekly_budget:75,
      active: true
    }}],
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






