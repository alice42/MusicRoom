import { basicFetch } from './apiService'
import Config from 'react-native-config'

const apiUrl = Config.API_URL
const api = '/api'
const mpe = '/mpe'
const getPlaylists = '/playlists'
const createPlaylist = '/playlist'
const updatePlaylist = '/playlist'
const getTracks = '/tracks'
const addTrack = '/track'
const deletePlaylist = '/playlist'
const removeTrack = '/track'

export const getPlaylistsMethod = async ({ token }) => {
  const url = `${apiUrl}${api}${mpe}${getPlaylists}`
  try {
    const response = await basicFetch('GET', url, {
      headers: {
        'X-SessionID': token
      }
    })
    return response
  } catch (err) {
    throw err
  }
}

export const createPlaylistsMethod = async ({ token, name, location }) => {
  const url = `${apiUrl}${api}${mpe}${createPlaylist}`
  try {
    const response = await basicFetch(
      'POST',
      url,
      {
        headers: {
          'X-SessionID': token
        }
      },
      { name, location }
    )
    return response
  } catch (err) {
    throw err
  }
}

export const updatePlaylistMethod = async ({ token, playlistId, toChange, newValue }) => {
  const url = `${apiUrl}${api}${mpe}${updatePlaylist}`
  try {
    const response = await basicFetch(
      'PATCH',
      url,
      {
        headers: {
          'X-SessionID': token
        }
      },
      { playlistId, toChange, newValue: newValue.toString() }
    )
    return response
  } catch (err) {
    throw err
  }
}

export const getPlaylistTracksMethodMpe = async ({ token, playlistId }) => {
  const url = `${apiUrl}${api}${mpe}${getTracks}?playlistId=${playlistId}`
  try {
    const response = await basicFetch('GET', url, {
      headers: {
        'X-SessionID': token
      }
    })
    return response
  } catch (err) {
    throw err
  }
}

export const addtrackToPlaylistMethodMpe = async ({ trackId, playlistId, token }) => {
  const url = `${apiUrl}${api}${mpe}${addTrack}`
  try {
    const response = await basicFetch(
      'POST',
      url,
      {
        headers: {
          'X-SessionID': token
        }
      },
      { trackId, playlistId }
    )
    return response
  } catch (err) {
    throw err
  }
}

export const deletePlaylistMethod = async ({ playlistId, token }) => {
  const url = `${apiUrl}${api}${mpe}${deletePlaylist}`
  try {
    console.log(playlistId, token)
    const response = await basicFetch(
      'DELETE',
      url,
      {
        headers: {
          'X-SessionID': token
        }
      },
      { playlistId }
    )
    return response
  } catch (err) {
    throw err
  }
}

export const removeTrackMethodMpe = async ({ playlistId, trackId, token }) => {
  const url = `${apiUrl}${api}${mpe}${removeTrack}`
  try {
    console.log(playlistId, trackId, token)
    const response = await basicFetch(
      'DELETE',
      url,
      {
        headers: {
          'X-SessionID': token
        }
      },
      { playlistId, trackId }
    )
    console.log(response)
    return response
  } catch (err) {
    throw err
  }
}
