import { combineReducers } from 'redux'
import auth from './authReducer'
import searchRequestReducer from './searchRequestReducer'

export default combineReducers({
  auth, searchRequestReducer
})