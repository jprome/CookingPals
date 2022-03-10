import { IUser } from '../../utils/Typescript'

export const GET_CURRENT_PROFILE = "GET_CURRENT_PROFILE"

export interface ICurrentProfileView {
  type: typeof GET_CURRENT_PROFILE,
  payload: IUser 
}


