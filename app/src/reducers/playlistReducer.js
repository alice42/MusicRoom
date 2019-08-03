const initialState = {
  tracks: [],
  playlistInfo: [],
  publicPlaylist: [],
  privatePlaylist: []
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_PLAYLIST_TRACK_SUCCESS':
      return {
        ...state,
        tracks: action.results,
        playlistInfo: action.playlistInfo,
        publicPlaylist: [...state.publicPlaylist, action.playlistInfo.public ? playlistInfo : null],
        privatePlaylist: [...state.privatePlaylist, action.playlistInfo.private ? playlistInfo : null]
      }
    default:
      return state
  }
}

export default reducer
