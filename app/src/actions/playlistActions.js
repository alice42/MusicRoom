export function setPlaylistTracks(id, deezerToken) {
  return {
    type: 'SET_PLAYLIST_TRACKS',
    id,
    deezerToken
  }
}
export function setUserId(id, deezerToken) {
  return {
    type: 'SET_USER_ID',
    id,
    deezerToken
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

export function createPlaylist(title, deezerToken, deezerId, collabOption, privacyOption) {
  return {
    type: 'CREATE_PLAYLIST',
    title,
    deezerToken,
    deezerId,
    collabOption,
    privacyOption
  }
}

export function deletePlaylist(playlistId, deezerToken) {
  return {
    type: 'DELETE_PLAYLIST',
    playlistId,
    deezerToken
  }
}

export function deleteTrack(playlistId, trackId, deezerId, deezerToken) {
  return {
    type: 'DELETE_TRACK',
    playlistId,
    trackId,
    deezerId,
    deezerToken
  }
}

export function getDeezerFollowers(id) {
  return {
    type: 'GET_DEEZER_FOLLOWERS',
    id
  }
}
