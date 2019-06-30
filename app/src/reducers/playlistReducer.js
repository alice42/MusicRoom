const initialState = {
  tracks: [],
  playlistInfo: []
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_PLAYLIST_TRACK_SUCCESS':
      return {
        ...state,
        tracks: action.results,
        playlistInfo: action.playlistInfo
      }
    case 'CREATE_PLAYLIST_SUCCESS':
      return {
        ...state
      }
    default:
      return state
  }
}

export default reducer
