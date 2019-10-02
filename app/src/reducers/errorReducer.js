const initialState = {
  error: false,
  errorPlaylists: false,
  errorEvents: false,
  errorTrack: false,
  errorUser: false,
  errorSearch: false
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    //track
    case 'GET_PLAYLIST_TRACKS_FAILURE':
      return {
        ...state,
        errorSearch: false,
        errorUser: false,
        errorTrack: action.error,
        errorEvents: false,
        errorPlaylists: false
      }
    case 'SET_PLAYLIST_ID_FAILURE':
      return {
        ...state,
        errorSearch: false,
        errorUser: false,
        errorTrack: action.error,
        errorEvents: false,
        errorPlaylists: false
      }
    case 'ADD_TRACK_TO_PLAYLIST_FAILURE':
      return {
        ...state,
        errorSearch: false,
        errorUser: false,
        errorTrack: action.error,
        errorEvents: false,
        errorPlaylists: false
      }
    case 'REMOVE_TRACK_FROM_PLAYLIST_FAILURE':
      return {
        ...state,
        errorSearch: false,
        errorUser: false,
        errorTrack: action.error,
        errorEvents: false,
        errorPlaylists: false
      }
    //Playlist
    case 'SERVICE_MPE_GET_PLAYLISTS_REQUEST_FAILURE':
      return {
        ...state,
        errorSearch: false,
        errorUser: false,
        errorPlaylists: action.error,
        errorEvents: false,
        errorTrack: false
      }
    case 'SERVICE_MPE_CREATE_PLAYLISTS_REQUEST_FAILURE':
      return {
        ...state,
        errorSearch: false,
        errorUser: false,
        errorPlaylists: action.error,
        errorEvents: false,
        errorTrack: false
      }
    case 'SERVICE_MPE_PLAYLISTS_UPDATE_DATA_REQUEST_FAILURE':
      return {
        ...state,
        errorSearch: false,
        errorUser: false,
        errorPlaylists: action.error,
        errorEvents: false,
        errorTrack: false
      }
    case 'DELETE_PLAYLIST_FAILURE':
      return {
        ...state,
        errorSearch: false,
        errorUser: false,
        errorPlaylists: action.error,
        errorEvents: false,
        errorTrack: false
      }
    case 'SERVICE_MPE_GET_PLAYLISTS_REQUEST_FAILURE':
      return {
        ...state,
        errorSearch: false,
        errorUser: false,
        errorPlaylists: action.error,
        errorEvents: false,
        errorTrack: false
      }
    //Event
    case 'SERVICE_MTV_GET_EVENTS_REQUEST_FAILURE':
      return {
        ...state,
        errorSearch: false,
        errorUser: false,
        errorEvents: action.error,
        errorTrack: false,
        errorPlaylists: false
      }
    case 'SERVICE_MTV_CREATE_EVENTS_REQUEST_FAILURE':
      return {
        ...state,
        errorSearch: false,
        errorUser: false,
        errorEvents: action.error,
        errorTrack: false,
        errorPlaylists: false
      }
    case 'SERVICE_MTV_EVENTS_UPDATE_DATA_REQUEST_FAILURE':
      return {
        ...state,
        errorSearch: false,
        errorUser: false,
        errorEvents: action.error,
        errorTrack: false,
        errorPlaylists: false
      }
    case 'VOTE_FAILURE':
      return {
        ...state,
        errorSearch: false,
        errorUser: false,
        errorEvents: action.error,
        errorTrack: false,
        errorPlaylists: false
      }
    case 'DELETE_EVENT_FAILURE':
      return {
        ...state,
        errorSearch: false,
        errorUser: false,
        errorEvents: action.error,
        errorTrack: false,
        errorPlaylists: false
      }
    //user
    case 'SIGNIN_FAILURE':
      return {
        ...state,
        errorSearch: false,
        errorEvents: false,
        errorUser: action.error,
        errorTrack: false,
        errorPlaylists: false
      }
    case 'LOGIN_FAILURE':
      return {
        ...state,
        errorSearch: false,
        errorEvents: false,
        errorUser: action.error,
        errorTrack: false,
        errorPlaylists: false
      }
    case 'LOGIN_FACEBOOK_FAILURE':
      return {
        ...state,
        errorSearch: false,
        errorEvents: false,
        errorUser: action.error,
        errorTrack: false,
        errorPlaylists: false
      }
    case 'LOGIN_GOOGLE_FAILURE':
      return {
        ...state,
        errorSearch: false,
        errorEvents: false,
        errorUser: action.error,
        errorTrack: false,
        errorPlaylists: false
      }
    case 'LINK_FACEBOOK_FAILURE':
      return {
        ...state,
        errorSearch: false,
        errorEvents: false,
        errorUser: action.error,
        errorTrack: false,
        errorPlaylists: false
      }
    case 'UNLINK_FACEBOOK_FAILURE':
      return {
        ...state,
        errorSearch: false,
        errorEvents: false,
        errorUser: action.error,
        errorTrack: false,
        errorPlaylists: false
      }
    case 'LINK_GOOGLE_FAILURE':
      return {
        ...state,
        errorSearch: false,
        errorEvents: false,
        errorUser: action.error,
        errorTrack: false,
        errorPlaylists: false
      }
    case 'UNLINK_GOOGLE_FAILURE':
      return {
        ...state,
        errorSearch: false,
        errorEvents: false,
        errorUser: action.error,
        errorTrack: false,
        errorPlaylists: false
      }
    case 'LINK_DEEZER_FAILURE':
      return {
        ...state,
        errorSearch: false,
        errorEvents: false,
        errorUser: action.error,
        errorTrack: false,
        errorPlaylists: false
      }
    case 'UNLINK_DEEZER_FAILURE':
      return {
        ...state,
        errorSearch: false,
        errorEvents: false,
        errorUser: action.error,
        errorTrack: false,
        errorPlaylists: false
      }
    case 'RECOVER_PASSWORD_EMAIL_SEND_FAILURE':
      return {
        ...state,
        errorSearch: false,
        errorEvents: false,
        errorUser: action.error,
        errorTrack: false,
        errorPlaylists: false
      }
    case 'UPDATE_FAILURE':
      return {
        ...state,
        errorSearch: false,
        errorEvents: false,
        errorUser: action.error,
        errorTrack: false,
        errorPlaylists: false
      }
    case 'UPDATE_PRIVACY_FAILURE':
      return {
        ...state,
        errorSearch: false,
        errorEvents: false,
        errorUser: action.error,
        errorTrack: false,
        errorPlaylists: false
      }
    case 'lOGOUT_FAILURE':
      return {
        ...state,
        errorSearch: false,
        errorEvents: false,
        errorUser: action.error,
        errorTrack: false,
        errorPlaylists: false
      }
    //Search
    case 'SEARCH_FAILURE':
      return {
        ...state,
        errorEvents: false,
        errorUser: false,
        errorSearch: action.error,
        errorTrack: false,
        errorPlaylists: false
      }
    //del
    case 'DELETE_ERROR':
      return {
        ...state,
        errorSearch: false,
        errorUser: false,
        errorEvents: false,
        errorTrack: false,
        errorPlaylists: false
      }
    case 'LOGOUT':
      return initialState
    default:
      return state
  }
}

export default reducer
