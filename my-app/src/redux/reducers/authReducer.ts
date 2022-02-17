import { AUTH, IAuth, IAuthType } from '../types/authType'

const initialState: IAuth = {
  user: {
    _id:"61f0cb711b4817db2be3036e",
    name:"Jose Romero",
    password:"This is my password",
    location:"United States Florida Miami",
    updatedAt:"asfd",
    account:"jose@gmail.com",
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






