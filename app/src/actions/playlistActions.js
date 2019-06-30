export function setPlaylistTracks(id) {
  return {
    type: 'SET_PLAYLIST_TRACKS',
    id
  }
}
export function setUserId(id) {
  return {
    type: 'SET_USER_ID',
    id
  }
}
export function editPlaylist(trackId, playlistId, token) {
  return {
    type: 'EDIT_PLAYLIST',
    trackId,
    playlistId,
    token
  }
}

export function createPlaylist(title, deezerId, deezerToken) {
  return {
    type: 'CREATE_PLAYLIST',
    title,
    deezerId,
    deezerToken
  }
}
