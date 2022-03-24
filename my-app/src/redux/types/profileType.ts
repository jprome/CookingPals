import { IUser } from '../../utils/Typescript'

export const GET_CURRENT_PROFILE = "GET_CURRENT_PROFILE"
export const POST_REFERENCE = "POST_REFERENCE"

export interface ICurrentProfileView {
  type: typeof GET_CURRENT_PROFILE |typeof POST_REFERENCE,
  payload: IUser 
}



