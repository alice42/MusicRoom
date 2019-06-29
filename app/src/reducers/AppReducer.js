import { combineReducers } from 'redux'
import NavReducer from './navigation'
import searchReducer from './searchReducer'
import UserReducer from './userReducer'
import PlaylistReducer from './playlistReducer'

const AppReducer = combineReducers({
  nav: NavReducer,
  user: UserReducer,
  search: searchReducer,
  playlist: PlaylistReducer
})

export default AppReducer
