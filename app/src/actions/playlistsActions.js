export function getPlaylists(location) {
  return {
    type: 'SERVICE_MPE_GET_PLAYLISTS_REQUEST',
    location
  }
}

export function createPlaylistRequest(name, location) {
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

export function updateEventRequest(id, toChange, newValue, location) {
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

export function removeTrackMpe(playlistId, trackId, service, location) {
  return {
    type: 'REMOVE_TRACK_TO_PLAYLIST_REQUEST_MPE',
    playlistId,
    trackId,
    service,
    location
  }
}


export function removeTrackMtv(playlistId, trackId, service, location) {
  return {
    type: 'REMOVE_TRACK_TO_PLAYLIST_REQUEST_MTV',
    playlistId,
    trackId,
    service,
    location
  }
}
///

export function getPlaylistTracksMpe(playlistId, service) {
  return {
    type: 'SET_PLAYLIST_ID',
    playlistId,
    service
  }
}

export function getPlaylistTracksMtv(playlistId, service) {
  return {
    type: 'SET_PLAYLIST_ID',
    playlistId,
    service
  }
}

export function addtrackToPlaylistMpe(trackId, playlistId, service) {
  return {
    type: 'ADD_TRACK_TO_PLAYLIST_REQUEST_MPE',
    trackId,
    playlistId,
    service
  }
}

export function addtrackToPlaylistMtv(trackId, playlistId, service) {
  return {
    type: 'ADD_TRACK_TO_PLAYLIST_REQUEST_MTV',
    trackId,
    playlistId,
    service
  }
}