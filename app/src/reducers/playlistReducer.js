const initialState = {
  currentPlaylist: {
    list: [],
    isFetching: false
  }
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_PLAYLIST_TRACKS_REQUEST':
      return {
        ...state,
        currentPlaylist: { list: [], isFetching: true }
      }
    case 'GET_PLAYLIST_TRACKS_SUCCESS':
      return {
        ...state,
        currentPlaylist: { list: [...action.results], isFetching: false }
      }
    case 'ADD_TRACK_TO_PLAYLIST_SUCCESS':
      return {
        ...state,
        currentPlaylist: { list: [...action.results], isFetching: false }
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
