import { basicFetch } from './apiService'
import Config from 'react-native-config'

const apiUrl = Config.API_URL
const api = '/api'
const mtv = '/mtv'
const getEvents = '/events'
const createEvent = '/event'
const updateEvent = '/event'
const getTracks = '/tracks'
const addTrack = '/track'
const voteTrack = '/track/vote'
const deleteEvent = '/event'
const removeTrack = '/track'

export const getEventsMethod = async ({ location, token }) => {
  const url = `${apiUrl}${api}${mtv}${getEvents}?location=${location}`
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

export const createEventsMethod = async ({ token, name, location }) => {
  const url = `${apiUrl}${api}${mtv}${createEvent}`
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

export const updateEventMethod = async ({ token, eventId, toChange, newValue, location }) => {
  const url = `${apiUrl}${api}${mtv}${updateEvent}`
  try {
    const response = await basicFetch(
      'PATCH',
      url,
      {
        headers: {
          'X-SessionID': token
        }
      },
      { eventId, toChange, newValue: newValue.toString(), location }
    )
    return response
  } catch (err) {
    throw err
  }
}

export const getPlaylistTracksMethodMtv = async ({ token, playlistId }) => {
  const url = `${apiUrl}${api}${mtv}${getTracks}?playlistId=${playlistId}`
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

export const addtrackToPlaylistMethodMtv = async ({ trackId, playlistId, token, location }) => {
  const url = `${apiUrl}${api}${mtv}${addTrack}`
  try {
    const response = await basicFetch(
      'POST',
      url,
      {
        headers: {
          'X-SessionID': token
        }
      },
      { trackId, playlistId, location }
    )
    return response
  } catch (err) {
    throw err
  }
}

export const votetMethod = async ({ trackId, eventId, value, token }) => {
  const url = `${apiUrl}${api}${mtv}${voteTrack}`
  try {
    console.log(trackId, eventId, value, token)
    const response = await basicFetch(
      'POST',
      url,
      {
        headers: {
          'X-SessionID': token
        }
      },
      { trackId, eventId, value }
    )
    return response
  } catch (err) {
    throw err
  }
}

export const deleteEventMethod = async ({ eventId, token, location }) => {
  const url = `${apiUrl}${api}${mtv}${deleteEvent}`
  try {
    const response = await basicFetch(
      'DELETE',
      url,
      {
        headers: {
          'X-SessionID': token
        }
      },
      { eventId, location }
    )
    return response
  } catch (err) {
    throw err
  }
}

export const removeTrackMethodMtv = async ({ playlistId, trackId, token, location }) => {
  const url = `${apiUrl}${api}${mtv}${removeTrack}`
  try {
    console.log('SERVICE', playlistId, trackId, token, location)
    const response = await basicFetch(
      'DELETE',
      url,
      {
        headers: {
          'X-SessionID': token
        }
      },
      { playlistId, trackId, location }
    )
    return response
  } catch (err) {
    throw err
  }
}
