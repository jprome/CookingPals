import { combineReducers } from 'redux'
import auth from './authReducer'
import searchRequest from './searchRequestReducer'
import profile from './currentProfileReducer'

export default combineReducers({
  auth, searchRequest, profile
})