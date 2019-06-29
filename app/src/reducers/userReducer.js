const initialState = {
  token: null,
  deezerToken: null,
  data: {
    email: '',
    firstname: '',
    name: '',
    facebook: false,
    google: false,
    deezer: false,
    tags: [],
    playlists: [],
    tracks: []
  },
  error: null
}

function reducer(state = initialState, action) {
  switch (action.type) {
    case 'SIGNIN_SUCCESS':
      return {
        ...state
      }
    case 'SIGNIN_FAILURE':
      return {
        ...state,
        error: action.error
      }
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        token: action.response.sessionId,
        data: { ...state.data, email: action.response.email },
        error: null
      }
    case 'LOGIN_SUCCESS_GOOGLE':
      return {
        ...state,
        token: action.response.sessionId,
        data: { ...state.data, email: action.response.email },
        data: { ...state.data, google: true },
        error: null
      }
    case 'LOGIN_SUCCESS_FACEBOOK':
      return {
        ...state,
        token: action.response.sessionId,
        data: { ...state.data, email: action.response.email },
        data: { ...state.data, facebook: true },
        error: null
      }
    case 'LOGIN_FAILURE':
      return {
        ...state,
        error: action.error
      }
    case 'RECOVER_PASSWORD_EMAIL_SEND':
      return {
        ...state
      }
    case 'UPDATE_SUCCESS':
      return {
        ...state
      }
    case 'UPDATE_FAILURE':
      return {
        ...state,
        error: action.error
      }
    case 'SET_PLAYLISTS':
      return {
        ...state,
        data: { ...state.data, playlists: action.playlists }
      }
    case 'DEEZER_GET_TOKEN_SUCCESS':
      return {
        ...state,
        deezerToken: action.token,
        data: { ...state.data, deezer: true }
      }
    case 'LOGOUT':
      return initialState
    default:
      return state
  }
}

export default reducer
