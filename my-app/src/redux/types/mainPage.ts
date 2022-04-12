import { IUser } from '../../utils/Typescript'

export const POPULATE_HOME_VIEW = "POPULATE_HOME_VIEW"

export interface IHomeView {
  type: typeof POPULATE_HOME_VIEW
  payload: {
      requests : any,
      friend_requests:any,
      //famous recipes around your zone

  }
}



