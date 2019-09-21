const initialState = {
  token: null,
  deezerToken: null,
  deezerId: null,
  data: {
    avatarUri: '',
    email: '',
    firstname: '',
    name: '',
    privacy: {},
    facebook: false,
    google: false,
    deezer: false,
    tags: [],
    playlists: [],
    tracks: [],
    followers: [],
    locationUser: ''
  },
  error: null,
  errorLogIn: null,
  errorSignIn: null,
  errorRegister: null,
  signinSuccess: false,
  isFetching: false,
  isFetchingFB: false,
  isFetchingGG: false,
  isFetchingDZ: false
}

function reducer(state = initialState, action) {
  switch (action.type) {
    case 'UPDATE_REQUEST':
      return {
        ...state,
        isEmailSend: false,
        isFetching: true,
        error: false
      }
    case 'RECOVER_PASSWORD_REQUEST':
      return {
        ...state,
        isEmailSend: false,
        isFetching: true,
        error: false
      }
    case 'RECOVER_PASSWORD_EMAIL_SEND':
      return {
        ...state,
        isEmailSend: true,
        isFetching: false,
        error: false
      }
    case 'RECOVER_PASSWORD_EMAIL_SEND_VALID':
      return {
        ...state,
        isEmailSend: false,
        isFetching: false,
        error: false
      }
    case 'RECOVER_PASSWORD_EMAIL_SEND_FAILURE':
      return {
        ...state,
        isEmailSend: false,
        isFetching: false,
        error: false
      }
    case 'SIGNIN_REQUEST':
      return {
        ...state,
        isEmailSend: false,
        error: false,
        errorSignIn: false,
        isFetching: true
      }
    case 'LOGIN_REQUEST':
      return {
        ...state,
        isEmailSend: false,
        error: false,
        errorLogIn: false,
        isFetching: true
      }
    case 'LOGIN_FACEBOOK_REQUEST':
      return {
        ...state,
        isEmailSend: false,
        error: false,
        errorLogIn: false,
        isFetching: true
      }
    case 'LINK_FACEBOOK_REQUEST':
      return {
        ...state,
        isEmailSend: false,
        error: false,
        isFetching: false,
        isFetchingFB: true
      }
    case 'UNLINK_FACEBOOK_REQUEST':
      return {
        ...state,
        isEmailSend: false,
        error: false,
        isFetching: false,
        isFetchingFB: true
      }
    case 'LINK_DEEZER_REQUEST':
      return {
        ...state,
        isEmailSend: false,
        error: false,
        isFetching: false,
        isFetchingDZ: true
      }
    case 'UNLINK_DEEZER_REQUEST':
      return {
        ...state,
        isEmailSend: false,
        error: false,
        isFetching: false,
        isFetchingDZ: true
      }
    case 'LOGIN_GOOGLE_REQUEST':
      return {
        ...state,
        isEmailSend: false,
        error: false,
        errorLogIn: false,
        isFetching: true
      }
    case 'LINK_GOOGLE_REQUEST':
      return {
        ...state,
        isEmailSend: false,
        error: false,
        isFetching: false,
        isFetchingGG: true
      }
    case 'UNLINK_GOOGLE_REQUEST':
      return {
        ...state,
        isEmailSend: false,
        error: false,
        isFetching: false,
        isFetchingGG: true
      }
    case 'SIGNIN_SUCCESS':
      return {
        ...state,
        isEmailSend: false,
        error: false,
        errorSignIn: false,
        signinSuccess: true,
        isFetching: false
      }
    case 'SIGNIN_SUCCESS_VALID':
      return {
        ...state,
        isEmailSend: false,
        error: false,
        errorSignIn: false,
        signinSuccess: false,
        isFetching: false
      }
    case 'SIGNIN_FAILURE':
      return {
        ...state,
        isEmailSend: false,
        errorSignIn: action.error,
        signinSuccess: false,
        isFetching: false
      }
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        isEmailSend: false,
        token: action.response.sessionId,
        data: { ...action.response.user },
        errorLogIn: null,
        isFetching: false
      }
    case 'LOGIN_FAILURE':
      return {
        ...state,
        isEmailSend: false,
        errorLogIn: action.error,
        isFetching: false
      }
    case 'LOGIN_GOOGLE_FAILURE':
      return {
        ...state,
        isEmailSend: false,
        errorRegister: action.error,
        isFetching: false
      }
    case 'LOGIN_FACEBOOK_FAILURE':
      return {
        ...state,
        isEmailSend: false,
        errorRegister: action.error,
        isFetching: false
      }
    case 'LOGIN_SUCCESS_GOOGLE':
      return {
        ...state,
        isEmailSend: false,
        token: action.response.sessionId,
        data: { ...action.response.user },
        errorRegister: null,
        isFetching: false
      }
    case 'LOGIN_SUCCESS_FACEBOOK':
      return {
        ...state,
        isEmailSend: false,
        token: action.response.sessionId,
        data: { ...action.response.user },
        errorRegister: null,
        isFetching: false
      }
    case 'LINK_FACEBOOK_SUCCESS':
      return {
        ...state,
        isEmailSend: false,
        data: { ...action.response },
        isFetchingFB: false
      }
    case 'UNLINK_FACEBOOK_SUCCESS':
      return {
        ...state,
        isEmailSend: false,
        data: { ...action.response },
        isFetching: false,
        isFetchingFB: false
      }
    case 'UNLINK_FACEBOOK_FAILURE':
      return {
        ...state,
        isFetching: false,
        isFetchingFB: false
      }
    case 'LINK_FACEBOOK_FAILURE':
      return {
        ...state,
        isFetching: false,
        isFetchingFB: false
      }
    case 'LINK_GOOGLE_SUCCESS':
      return {
        ...state,
        isEmailSend: false,
        data: { ...action.response },
        isFetching: false,
        isFetchingGG: false
      }
    case 'UNLINK_GOOGLE_SUCCESS':
      return {
        ...state,
        isEmailSend: false,
        data: { ...action.response },
        isFetching: false,
        isFetchingGG: false
      }
    case 'LINK_GOOGLE_FAILURE':
      return {
        ...state,
        isFetching: false,
        isFetchingGG: false
      }
    case 'UNLINK_GOOGLE_FAILURE':
      return {
        ...state,
        isFetching: false,
        isFetchingGG: false
      }
    case 'LINK_DEEZER_SUCCESS':
      return {
        ...state,
        isEmailSend: false,
        data: { ...action.response },
        isFetching: false,
        isFetchingDZ: false
      }
    case 'UNLINK_DEEZER_SUCCESS':
      return {
        ...state,
        isEmailSend: false,
        data: { ...action.response },
        isFetching: false,
        isFetchingDZ: false
      }
    case 'LINK_DEEZER_FAILURE':
      return {
        ...state,
        isFetching: false,
        isFetchingDZ: false
      }
    case 'UNLINK_DEEZER_FAILURE':
      return {
        ...state,
        isFetching: false,
        isFetchingDZ: false
      }
    case 'LOGIN_FAILURE':
      return {
        ...state,
        isEmailSend: false,
        error: action.error,
        isFetching: false
      }

    case 'UPDATE_SUCCESS':
      return {
        ...state,
        isEmailSend: false,
        data: { ...action.response },
        isFetching: false
      }
    case 'UPDATE_FAILURE':
      return {
        ...state,
        isEmailSend: false,
        error: action.error,
        isFetching: false
      }
    case 'DEEZER_GET_TOKEN_SUCCESS':
      return {
        ...state,
        isEmailSend: false,
        deezerToken: action.token,
        isFetching: false
      }
    case 'SET_USER_ID_SUCCESS':
      return {
        ...state,
        isEmailSend: false,
        deezerId: action.results,
        isFetching: false
      }
    case 'GET_FOLLOWERS_SUCCESS':
      return {
        ...state,
        isEmailSend: false,
        data: { ...state.data, followers: action.results },
        isFetching: false
      }
    case 'LOGOUT':
      return initialState
    default:
      return state
  }
}

export default reducer
