export function setPlaylistTracks(id) {
  return {
    type: 'SET_PLAYLIST_TRACKS',
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

export function createPlaylist(userId, title) {
  return {
    type: 'CREATE_PLAYLIST',
    userId,
    title
  }
}
