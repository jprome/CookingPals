import { AUTH, IAuth, IAuthType } from '../types/authType'

const initialState: IAuth = {
  user: {
    _id:"61f0cb711b4817db2be3036e",
    name:"Jose Romero",
    password:"This is my password",
    location:"asdf",
    updatedAt:"asfd",
    validate: false,
    account:"jose@gmail.com"
  }
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