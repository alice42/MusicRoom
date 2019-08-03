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

export function linkFacebookRequest() {
  return {
    type: 'LINK_FACEBOOK_REQUEST'
  }
}

export function unlinkFacebookRequest() {
  return {
    type: 'UNLINK_FACEBOOK_REQUEST'
  }
}

export function linkGoogleRequest() {
  return {
    type: 'LINK_GOOGLE_REQUEST'
  }
}

export function unlinkGoogleRequest() {
  return {
    type: 'UNLINK_GOOGLE_REQUEST'
  }
}

export function deezerGetTokenSuccess(token) {
  return {
    type: 'DEEZER_GET_TOKEN_SUCCESS',
    token
  }
}

export function linkDeezerRequest(deezerToken) {
  return {
    type: 'LINK_DEEZER_REQUEST',
    deezerToken
  }
}
export function unlinkDeezerRequest() {
  return {
    type: 'UNLINK_DEEZER_REQUEST'
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

export function updatePrivacyRequest(token, privacyValue, dataType) {
  return {
    type: 'UPDATE_PRIVACY_REQUEST',
    token,
    privacyValue,
    dataType
  }
}

export function logout() {
  return {
    type: 'LOGOUT'
  }
}
