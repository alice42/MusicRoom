const initialState = {
  currentPlaylist: {
    list: [],
    loading: false
  }
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_PLAYLIST_TRACKS_REQUEST':
      return {
        ...state,
        currentPlaylist: { list: [], loading: true }
      }
    case 'GET_PLAYLIST_TRACKS_SUCCESS':
      return {
        ...state,
        currentPlaylist: { list: [...action.results], loading: false }
      }
    case 'ADD_TRACK_TO_PLAYLIST_SUCCESS':
      return {
        ...state,
        currentPlaylist: { list: [...action.results], loading: false }
      }
    case 'VOTE_SUCCESS':
      return {
        ...state,
        currentPlaylist: { list: [...action.results], loading: true }
      }
    default:
      return state
  }
}

export default reducer
