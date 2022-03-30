import { AUTH, IAuth, IAuthType } from '../types/authType'

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
      give_cooking: 1,
      give_experience: 1,
      give_ingredient: 1,
      receive_cooking: 1,
      receive_experience: 1,
      receive_ingredient: 1,
      diets:["Vegan","Vegetarian"],
      weekly_budget:75,
      active: true,
    },
    cookbook:[]
  },
  access_token:"FakeToken"
}
const authReducer = (state: IAuth = {}, action: IAuthType): IAuth => {
  switch (action.type){
    case AUTH:
      return action.payload
    default:
      return state
  }
}

export default authReducer;






