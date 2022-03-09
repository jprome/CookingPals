import { IUser } from '../../utils/Typescript'
import { GET_CURRENT_PROFILE, ICurrentProfileView } from '../types/profileType'

const initialState: IUser = {
    _id:"asdfadsf",
    name:"Giovanni Ferioli",
    password:"",
    location:"",
    updatedAt:"",
    account:"",
    request: {
      description:"I want to use plants for cooking",
      give_cooking: 0,
      give_experience: 1,
      give_ingredient: 0,
      receive_cooking: 0,
      receive_experience: 1,
      receive_ingredient: 0,
      diet:[],
      weekly_budget:75,
      active: true,
    }

}
const profileReducer = (state: IUser = initialState, action: ICurrentProfileView): IUser => {
  switch (action.type){
    case GET_CURRENT_PROFILE:
      return action.payload
    default:
      return state
  }
}

export default profileReducer;






