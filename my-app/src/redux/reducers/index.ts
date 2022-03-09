import { combineReducers } from 'redux'
import auth from './authReducer'
import searchRequestReducer from './searchRequestReducer'
import profile from './currentProfileReducer'

export default combineReducers({
  auth, searchRequestReducer, profile
})