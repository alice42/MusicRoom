export function signinRequest(email, password) {
  return {
    type: 'SIGNIN_REQUEST',
    email,
    password
  }
}

export function loginRequest(email, password) {
  return {
    type: 'LOGIN_REQUEST',
    email,
    password
  }
}

export function loginFacebookRequest() {
  return {
    type: 'LOGIN_FACEBOOK_REQUEST'
  }
}

export function loginGoogleRequest() {
  return {
    type: 'LOGIN_GOOGLE_REQUEST'
  }
}

export function deezerGetTokenSuccess(token) {
  return {
    type: 'DEEZER_GET_TOKEN_SUCCESS',
    token
  }
}

export function setPlaylists(playlists) {
  return {
    type: 'SET_PLAYLISTS',
    playlists
  }
}

export function recoverPasswordRequest(email) {
  return {
    type: 'RECOVER_PASSWORD_REQUEST',
    email
  }
}

export function updateRequest(token, toChange, newValue) {
  return {
    type: 'UPDATE_USER_DATA_REQUEST',
    token,
    toChange,
    newValue
  }
}

export function logout() {
  return {
    type: 'LOGOUT'
  }
}
