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
      description:"Lets work together",
      give_cooking: 1,
      give_experience: 1,
      give_ingredient: 1,
      receive_cooking: 1,
      receive_experience: 1,
      receive_ingredient: 1,
      diets:[0,1,2,3,4,5],
      weekly_budget:75,
      active: true,
    }
  },
  access_token:"FakeToken"
}
const authReducer = (state: IAuth = initialState, action: IAuthType): IAuth => {
  switch (action.type){
    case AUTH:
      return action.payload
    default:
      return state
  }
}

export default authReducer;






