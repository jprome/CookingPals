import { IUser } from '../../utils/Typescript'
import { GET_CURRENT_PROFILE, ICurrentProfileView, POST_REFERENCE } from '../types/profileType'

const initialState: IUser = {
    _id:"asdfadsf",
    name:"Giovanni Ferioli",
    password:"",
    location:"",
    updatedAt:"",
    account:"",
    request: {
      description:"I want to use plants for cooking",
      cooking: 0,
      experience: 0,
      ingredient: 0,
      diets:[],
      weekly_budget:75,
      active: true,
    },
    cookbook: [],
    picture: ""

}
const profileReducer = (state: IUser = initialState, action: ICurrentProfileView): IUser => {
  switch (action.type){
    case GET_CURRENT_PROFILE || POST_REFERENCE:
      return action.payload
    default:
      return state
  }
}

export default profileReducer;






