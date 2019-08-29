import { basicFetch } from './apiService'
// const apiUrl = 'http://localhost:3001/api'
const apiUrl = 'http://192.168.0.10:3001/api'
const mpe = '/mpe'
const getPlaylists = '/get-playlists'
const createPlaylist = '/create-playlist'
const updatePlaylist = '/update-data'
const getTracks = '/get-tracks'
const addTrack = '/add-track'
const deletePlaylist = '/delete-playlist'
const removeTrack = '/remove-track'

export const getPlaylistsMethod = async ({ location, token }) => {
  const url = `${apiUrl}${mpe}${getPlaylists}`
  try {
    const response = await basicFetch('POST', url, {}, { token, location })
    return response
  } catch (err) {
    throw err
  }
}

export const createPlaylistsMethod = async ({ token, name, location }) => {
  const url = `${apiUrl}${mpe}${createPlaylist}`
  try {
    const response = await basicFetch('POST', url, {}, { token, name, location })
    return response
  } catch (err) {
    throw err
  }
}

export const updatePlaylistMethod = async ({ token, playlistId, toChange, newValue }) => {
  const url = `${apiUrl}${mpe}${updatePlaylist}`
  try {
    const response = await basicFetch('POST', url, {}, { token, playlistId, toChange, newValue })
    return response
  } catch (err) {
    throw err
  }
}

export const getPlaylistTracksMethodMpe = async ({ token, playlistId }) => {
  const url = `${apiUrl}${mpe}${getTracks}`
  try {
    const response = await basicFetch('POST', url, {}, { token, playlistId })
    return response
  } catch (err) {
    throw err
  }
}

export const addtrackToPlaylistMethodMpe = async ({ trackId, playlistId, token }) => {
  const url = `${apiUrl}${mpe}${addTrack}`
  try {
    const response = await basicFetch('POST', url, {}, { token, trackId, playlistId })
    return response
  } catch (err) {
    throw err
  }
}

export const deletePlaylistMethod = async ({ playlistId, token }) => {
  const url = `${apiUrl}${mpe}${deletePlaylist}`
  try {
    const response = await basicFetch('POST', url, {}, { playlistId, token })
    return response
  } catch (err) {
    throw err
  }
}

export const removeTrackMethodMpe = async ({ playlistId, trackId, token }) => {
  const url = `${apiUrl}${mpe}${removeTrack}`
  try {
    const response = await basicFetch('POST', url, {}, { playlistId, trackId, token })
    return response
  } catch (err) {
    throw err
  }
}
