const initialState = {
  list: [],
  currentPlaylist: {
    list: [],
    isFetching: false
  },
  isFetching: false,
  error: false
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_PLAYLIST_TRACKS_REQUEST':
      return {
        ...state,
        currentPlaylist: { list: [], isFetching: true },
        isFetching: false,
        error: false
      }
    case 'GET_PLAYLIST_TRACKS_SUCCESS':
      return {
        ...state,
        currentPlaylist: { list: [...action.results], isFetching: false },
        isFetching: false,
        error: false
      }
    case 'ADD_TRACK_TO_PLAYLIST_SUCCESS':
      return {
        ...state,
        currentPlaylist: { list: [...action.results], isFetching: false },
        isFetching: false,
        error: false
      }
    case 'SERVICE_MPE_GET_PLAYLISTS_REQUEST':
      return {
        ...state,
        error: null,
        isFetching: true
      }
    case 'SERVICE_MPE_GET_PLAYLISTS_REQUEST_SUCCESS':
      return {
        ...state,
        list: [...action.response],
        error: null,
        isFetching: false
      }
    case 'SERVICE_MPE_GET_PLAYLISTS_REQUEST_FAILURE':
      return {
        ...state,
        error: action.error,
        isFetching: false
      }
    case 'SERVICE_MPE_CREATE_PLAYLISTS_REQUEST_SUCCESS':
      return {
        ...state,
        list: [...action.response],
        error: null,
        isFetching: false
      }
    case 'SERVICE_MPE_CREATE_PLAYLISTS_REQUEST_FAILURE':
      return {
        ...state,
        error: action.error,
        isFetching: false
      }
    case 'SERVICE_MPE_PLAYLISTS_UPDATE_DATA_REQUEST_SUCCESS':
      return {
        ...state,
        list: [...action.response],
        error: null,
        isFetching: false
      }
    case 'DELETE_PLAYLIST_SUCCESS':
      return {
        ...state,
        list: [...action.response],
        error: null,
        isFetching: false
      }
    case 'SERVICE_MPE_PLAYLISTS_UPDATE_DATA_REQUEST_FAILURE':
      return {
        ...state,
        list: [...state.list],
        error: action.error,
        isFetching: false
      }
    case 'VOTE_SUCCESS':
      return {
        ...state,
        currentPlaylist: { list: [...action.results], isFetching: true }
      }
    default:
      return state
  }
}

export default reducer
