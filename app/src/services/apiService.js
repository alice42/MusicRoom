import { statusCodes, GoogleSignin } from 'react-native-google-signin'

const apiUrl = 'http://localhost:3001/api'
const user = '/user'
const signin = '/sign-in'
const login = '/log-in'
const fbLogin = '/facebook-log-in'
const ggLogin = '/google-log-in'
const recover = '/recover'
const update = '/update-data'

const basicFetch = async (method, url, config, data) => {
  if (method === 'GET') {
    try {
      const response = await fetch(url)
      const result = await response.json()
      return result
    } catch (err) {
      throw err
    }
  } else if (method === 'POST') {
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })
      const result = await response.json()
      return result
    } catch (err) {
      throw err
    }
  }
}

export const signinMethod = async ({ email, password }) => {
  const url = `${apiUrl}${user}${signin}`
  try {
    const response = await basicFetch('POST', url, {}, { email, password })
    return response
  } catch (err) {
    throw err
  }
}

export const loginClassic = async ({ email, password }) => {
  const url = `${apiUrl}${user}${login}`
  try {
    const response = await basicFetch('POST', url, {}, { email, password })
    return response
  } catch (err) {
    throw err
  }
}

export const loginFacebook = async ({ email, userToken }) => {
  const url = `${apiUrl}${user}${fbLogin}`
  try {
    const log = await basicFetch('POST', url, {}, { email, userToken })
    return log
  } catch (error) {
    throw error
  }
}

export const loginGoogle = async response => {
  const { email } = response.user
  const userToken = response.idToken
  const url = `${apiUrl}${user}${ggLogin}`
  try {
    const log = await basicFetch('POST', url, {}, { email, userToken })
    return log
  } catch (error) {
    throw error
  }
}

export const recoverPassword = async email => {
  const url = `${apiUrl}${user}${recover}`
  try {
    const response = await basicFetch('POST', url, {}, { email })
    return response
  } catch (err) {
    throw err
  }
}

export const updateMethod = async ({ token, toChange, newValue }) => {
  const url = `${apiUrl}${user}${update}`
  try {
    const response = await basicFetch(
      'POST',
      url,
      {},
      { token, toChange, newValue }
    )
    return response
  } catch (err) {
    throw err
  }
}

export const logoutMethod = async () => {
  try {
    await GoogleSignin.revokeAccess()
    await GoogleSignin.signOut()
  } catch (err) {
    throw err
  }
}

export const getTrack = async query => {
  const url = `${apiUrl}/alice/search`
  try {
    const response = await basicFetch('POST', url, {}, { query })
    return response.results.data
  } catch (err) {
    throw err
  }
}

export const getPlaylistTrack = async query => {
  const url = `${apiUrl}/alice/playlist`
  try {
    const response = await basicFetch('POST', url, {}, { query })
    return response
  } catch (err) {
    throw err
  }
}

export const editPlaylistTrack = async query => {
  const url = `${apiUrl}/alice/edit-playlist`
  try {
    const response = await basicFetch('POST', url, {}, { query })
    return response
  } catch (err) {
    throw err
  }
}

export const createNewPlaylist = async query => {
  const url = `${apiUrl}/alice/create-playlist`
  try {
    const response = await basicFetch('POST', url, {}, { query })
    // console.log('RESPONSE API SERVICE', response)
    return response
  } catch (err) {
    throw err
  }
}
