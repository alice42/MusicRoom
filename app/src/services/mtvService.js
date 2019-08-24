import { basicFetch } from './apiService'
const apiUrl = 'http://localhost:3001/api'
// const apiUrl = 'http://192.168.0.10:3001/api'
const mtv = '/mtv'
const getEvents = '/get-events'
const createEvent = '/create-event'
const updateEvent = '/update-data'
const getTracks = '/get-tracks'
const addTrack = '/add-track'
const voteTrack = '/vote-track'
const deleteEvent = '/delete-event'

export const getEventsMethod = async ({ location, token }) => {
  const url = `${apiUrl}${mtv}${getEvents}`
  try {
    const response = await basicFetch('POST', url, {}, { token, location })
    return response
  } catch (err) {
    throw err
  }
}

export const createEventsMethod = async ({ token, name, location }) => {
  const url = `${apiUrl}${mtv}${createEvent}`
  try {
    const response = await basicFetch('POST', url, {}, { token, name, location })
    return response
  } catch (err) {
    throw err
  }
}

export const updateEventMethod = async ({ token, eventId, toChange, newValue, location }) => {
  const url = `${apiUrl}${mtv}${updateEvent}`
  try {
    const response = await basicFetch(
      'POST',
      url,
      {},
      { token, eventId, toChange, newValue, location }
    )
    return response
  } catch (err) {
    throw err
  }
}

export const getPlaylistTracksMethod = async ({ token, playlistId }) => {
  const url = `${apiUrl}${mtv}${getTracks}`
  try {
    const response = await basicFetch('POST', url, {}, { token, playlistId })
    return response
  } catch (err) {
    throw err
  }
}

export const addtrackToPlaylistMethod = async ({ trackId, playlistId, token }) => {
  const url = `${apiUrl}${mtv}${addTrack}`
  try {
    const response = await basicFetch('POST', url, {}, { token, trackId, playlistId })
    return response
  } catch (err) {
    throw err
  }
}

export const votetMethod = async ({ trackId, eventId, value, token }) => {
  const url = `${apiUrl}${mtv}${voteTrack}`
  try {
    const response = await basicFetch('POST', url, {}, { trackId, eventId, value, token })
    return response
  } catch (err) {
    throw err
  }
}

export const deleteEventMethod = async ({ eventId, token, location }) => {
  const url = `${apiUrl}${mtv}${deleteEvent}`
  try {
    console.log('test')
    const response = await basicFetch('POST', url, {}, { eventId, token, location })
    return response
  } catch (err) {
    throw err
  }
}
