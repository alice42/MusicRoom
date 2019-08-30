import { combineReducers } from 'redux'
import NavReducer from './navigation'
import searchReducer from './searchReducer'
import UserReducer from './userReducer'
import PlaylistReducer from './playlistReducer'
import EventsReducer from './eventsReducer'
import ErrorReducer from './errorReducer'

const AppReducer = combineReducers({
  nav: NavReducer,
  user: UserReducer,
  search: searchReducer,
  playlist: PlaylistReducer,
  events: EventsReducer,
  error: ErrorReducer
})

export default AppReducer
