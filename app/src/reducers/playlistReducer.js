const initialState = {
  list: [],
  currentPlaylist: {
    id: null,
    list: [],
    isFetching: false
  },
  isFetching: false
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_PLAYLIST_TRACKS_REQUEST':
      return {
        ...state,
        currentPlaylist: { ...state.currentPlaylist, isFetching: true },
        isFetching: true
      }
    case 'GET_PLAYLIST_TRACKS_SUCCESS':
      return {
        ...state,
        currentPlaylist: { ...state.currentPlaylist, list: [...action.results], isFetching: false },
        isFetching: false
      }
    case 'GET_PLAYLIST_TRACKS_FAILURE':
      return {
        ...state,
        isFetching: false
      }
    //RAJOUTER SUCCESS ERROR
    case 'SET_PLAYLIST_ID':
      return {
        ...state,
        currentPlaylist: { ...state.currentPlaylist, id: action.playlistId }
      }
    case 'REMOVE_TRACK_FROM_PLAYLIST_SUCCESS':
      return {
        ...state,
        currentPlaylist: { ...state.currentPlaylist,list: [...action.results], isFetching: false },
        isFetching: false
      }
    case 'ADD_TRACK_TO_PLAYLIST_SUCCESS':
      return {
        ...state,
        currentPlaylist: { ...state.currentPlaylist,list: [...action.results], isFetching: false },
        isFetching: false
      }
    case 'SERVICE_MPE_GET_PLAYLISTS_REQUEST':
      return {
        ...state,
        isFetching: true
      }
    case 'SERVICE_MPE_GET_PLAYLISTS_REQUEST_SUCCESS':
      return {
        ...state,
        list: [...action.response],
        isFetching: false
      }
    case 'SERVICE_MPE_GET_PLAYLISTS_REQUEST_FAILURE':
      return {
        ...state,
        isFetching: false
      }
    case 'SERVICE_MPE_CREATE_PLAYLISTS_REQUEST_SUCCESS':
      return {
        ...state,
        list: [...action.response],
        isFetching: false
      }
    case 'SERVICE_MPE_CREATE_PLAYLISTS_REQUEST_FAILURE':
      return {
        ...state,
        isFetching: false
      }
    case 'SERVICE_MPE_PLAYLISTS_UPDATE_DATA_REQUEST_SUCCESS':
      return {
        ...state,
        list: [...action.response],
        isFetching: false
      }
    case 'DELETE_PLAYLIST_SUCCESS':
      return {
        ...state,
        list: [...action.response],
        isFetching: false
      }
    case 'SERVICE_MPE_PLAYLISTS_UPDATE_DATA_REQUEST_FAILURE':
      return {
        ...state,
        list: [...state.list],
        isFetching: false
      }
    case 'VOTE_SUCCESS':
      return {
        ...state,
        currentPlaylist: { ...state.currentPlaylist, list: [...action.results], isFetching: false }
      }
    default:
      return state
  }
}

export default reducer
