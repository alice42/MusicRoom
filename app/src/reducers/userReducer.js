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
    followers: []
  },
  error: null,
  errorLogIn: null,
  errorSignIn: null,
  errorRegister: null,
  signinSuccess: false
}

function reducer(state = initialState, action) {
  switch (action.type) {
    case 'SIGNIN_SUCCESS':
      return {
        ...state,
        signinSuccess: true
      }
    case 'SIGNIN_FAILURE':
      return {
        ...state,
        errorSignIn: action.error,
        signinSuccess: false
      }
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        token: action.response.sessionId,
        data: { ...action.response.user },
        errorLogIn: null
      }
    case 'LOGIN_FAILURE':
      return {
        ...state,
        errorLogIn: action.error
      }
    case 'LOGIN_GOOGLE_FAILURE':
      return {
        ...state,
        errorRegister: action.error
      }
    case 'LOGIN_FACEBOOK_FAILURE':
      return {
        ...state,
        errorRegister: action.error
      }
    case 'LOGIN_SUCCESS_GOOGLE':
      return {
        ...state,
        token: action.response.sessionId,
        data: {
          ...state.data,
          email: action.response.user.email,
          firstname: action.response.user.givenName,
          name: action.response.user.familyName,
          avatarUri: action.response.user.photo,
          google: true
        },
        errorRegister: null
      }
    case 'LOGIN_SUCCESS_FACEBOOK':
      return {
        ...state,
        token: action.response.sessionId,
        data: {
          ...state.data,
          email: action.response.user.email,
          firstname: action.response.user.firstname,
          name: action.response.user.lastname,
          avatarUri: action.response.user.avatarUri,
          facebook: true
        },
        errorRegister: null
      }
    case 'LINK_FACEBOOK_SUCCESS':
      return {
        ...state,
        data: { ...action.response }
      }
    case 'UNLINK_FACEBOOK_SUCCESS':
      return {
        ...state,
        data: { ...action.response }
      }
    case 'LINK_GOOGLE_SUCCESS':
      return {
        ...state,
        data: { ...action.response }
      }
    case 'UNLINK_GOOGLE_SUCCESS':
      return {
        ...state,
        data: { ...action.response }
      }
    case 'LINK_DEEZER_SUCCESS':
      return {
        ...state,
        data: { ...action.response }
      }
    case 'UNLINK_DEEZER_SUCCESS':
      return {
        ...state,
        data: { ...action.response }
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
        ...state,
        data: { ...action.response }
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
    case 'CREATE_PLAYLIST_SUCCESS':
      return {
        ...state,
        data: {
          ...state.data,
          playlists: [
            ...state.data.playlists,
            {
              id: `${action.results.results.id}`,
              title: `${action.results.query.title}`,
              description: ''
            }
          ]
        }
      }
    case 'DELETE_PLAYLIST_SUCCESS':
      const newPlaylists = state.data.playlists.filter(function(obj) {
        return action.results.indexOf(obj.id) === -1
      })
      return {
        ...state,
        data: {
          ...state.data,
          playlists: newPlaylists
        }
      }
    case 'DEEZER_GET_TOKEN_SUCCESS':
      return {
        ...state,
        deezerToken: action.token
      }
    case 'SET_USER_ID_SUCCESS':
      return {
        ...state,
        deezerId: action.results
      }
    case 'GET_FOLLOWERS_SUCCESS':
      return {
        ...state,
        data: { ...state.data, followers: action.results }
      }
    case 'LOGOUT':
      return initialState
    default:
      return state
  }
}

export default reducer
