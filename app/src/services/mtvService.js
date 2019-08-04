import { basicFetch } from './apiService'
const apiUrl = 'http://192.168.0.10:3001/api'
const mtv = '/mtv'
const getEvents = '/get-events'
const createEvent = '/create-event'
const updateEvent = '/update-data'

export const getEventsMethod = async token => {
  const url = `${apiUrl}${mtv}${getEvents}`
  try {
    const response = await basicFetch('POST', url, {}, { token })
    return response
  } catch (err) {
    throw err
  }
}

export const createEventsMethod = async ({ token, name }) => {
  const url = `${apiUrl}${mtv}${createEvent}`
  try {
    const response = await basicFetch('POST', url, {}, { token, name })
    return response
  } catch (err) {
    throw err
  }
}

export const updateEventMethod = async ({ token, eventId, toChange, newValue }) => {
  const url = `${apiUrl}${mtv}${updateEvent}`
  try {
    const response = await basicFetch('POST', url, {}, { token, eventId, toChange, newValue })
    return response
  } catch (err) {
    throw err
  }
}
