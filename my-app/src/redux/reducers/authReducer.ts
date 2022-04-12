import { AUTH, CREATE_COOKBOOK, DELETE_COOKBOOK, EDIT_COOKBOOK, GET_OTHER_INFO, IAuth, IAuthType, RESET_PASSWORD, UPDATE_REQUEST } from '../types/authType'

const initialState: IAuth = {
  user: {
    _id:"61f0cb711b4817db2be3036e",
    name:"Jose Romero",
    password:"This is my password",
    location:"United States Florida Miami",
    updatedAt:"asfd",
    account:"jose@gmail.com",
    request: {
      description:"Looking for people to partner with that like to eat plant based meals. I am fine with eating meat every once in a while, but would prefer forthe diet to be mostly meat. Message for more details!",
      cooking: 1,
      experience: 1,
      ingredient: 1,
      diets:["Vegan","Vegetarian"],
      weekly_budget:75,
      active: true,
    },
    cookbook:[],
    picture: ""
  },
  access_token:"FakeToken"
}
const authReducer = (state: IAuth = {}, action: IAuthType): IAuth => {
  switch (action.type){
    case AUTH:
      return action.payload
    case UPDATE_REQUEST:
      return action.payload
    case UPDATE_REQUEST:
      return action.payload
    case RESET_PASSWORD:
      return action.payload
    case GET_OTHER_INFO:
     return action.payload
    case CREATE_COOKBOOK:
      return action.payload
    case DELETE_COOKBOOK:
      return action.payload
    case EDIT_COOKBOOK:
      return action.payload
      
    default:
      return state
  }
}

export default authReducer;






