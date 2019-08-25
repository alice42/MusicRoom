export function getPlaylists(location) {
  return {
    type: 'SERVICE_MPE_GET_PLAYLISTS_REQUEST',
    location
  }
}

export function createPlaylistRequest(name, location) {
  console.log('ACTIONS', name)
  return {
    type: 'SERVICE_MPE_CREATE_PLAYLISTS_REQUEST',
    name,
    location
  }
}

export function updatePlaylistRequest(id, toChange, newValue, location) {
  return {
    type: 'SERVICE_MPE_PLAYLISTS_UPDATE_DATA_REQUEST',
    id,
    toChange,
    newValue,
    location
  }
}

export function deletePlaylistRequest(playlistId, location) {
  return {
    type: 'DELETE_PLAYLIST_REQUEST',
    playlistId,
    location
  }
}

///

export function getPlaylistTracks(playlistId) {
  return {
    type: 'SET_PLAYLIST_ID',
    playlistId
  }
}

export function addtrackToPlaylist(trackId, playlistId) {
  return {
    type: 'ADD_TRACK_TO_PLAYLIST_REQUEST',
    trackId,
    playlistId
  }
}
