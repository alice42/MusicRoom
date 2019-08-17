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
  signinSuccess: false,
  isFetching: false
}

function reducer(state = initialState, action) {
  switch (action.type) {
    case 'UPDATE_REQUEST':
      return {
        ...state,
        isFetching: true,
        error: false
      }
    case 'SIGNIN_REQUEST':
      return {
        ...state,
        error: false,
        errorSignIn: false,
        isFetching: true
      }
    case 'LOGIN_REQUEST':
      return {
        ...state,
        error: false,
        errorLogIn: false,
        isFetching: true
      }
    case 'LOGIN_FACEBOOK_REQUEST':
      return {
        ...state,
        error: false,
        errorLogIn: false,
        isFetching: true
      }
    case 'LINK_FACEBOOK_REQUEST':
      return {
        ...state,
        error: false,
        isFetching: true
      }
    case 'UNLINK_FACEBOOK_REQUEST':
      return {
        ...state,
        error: false,
        isFetching: true
      }
    case 'LOGIN_GOOGLE_REQUEST':
      return {
        ...state,
        error: false,
        errorLogIn: false,
        isFetching: true
      }
    case 'LINK_GOOGLE_REQUEST':
      return {
        ...state,
        error: false,
        isFetching: true
      }
    case 'UNLINK_GOOGLE_REQUEST':
      return {
        ...state,
        error: false,
        isFetching: true
      }
    case 'SIGNIN_SUCCESS':
      return {
        ...state,
        error: false,
        errorSignIn: false,
        signinSuccess: true,
        isFetching: false
      }
    case 'SIGNIN_FAILURE':
      return {
        ...state,
        errorSignIn: action.error,
        signinSuccess: false,
        isFetching: false
      }
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        token: action.response.sessionId,
        data: { ...action.response.user },
        errorLogIn: null,
        isFetching: false
      }
    case 'LOGIN_FAILURE':
      return {
        ...state,
        errorLogIn: action.error,
        isFetching: false
      }
    case 'LOGIN_GOOGLE_FAILURE':
      return {
        ...state,
        errorRegister: action.error,
        isFetching: false
      }
    case 'LOGIN_FACEBOOK_FAILURE':
      return {
        ...state,
        errorRegister: action.error,
        isFetching: false
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
        errorRegister: null,
        isFetching: false
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
        errorRegister: null,
        isFetching: false
      }
    case 'LINK_FACEBOOK_SUCCESS':
      return {
        ...state,
        data: { ...action.response },
        isFetching: false
      }
    case 'UNLINK_FACEBOOK_SUCCESS':
      return {
        ...state,
        data: { ...action.response },
        isFetching: false
      }
    case 'LINK_GOOGLE_SUCCESS':
      return {
        ...state,
        data: { ...action.response },
        isFetching: false
      }
    case 'UNLINK_GOOGLE_SUCCESS':
      return {
        ...state,
        data: { ...action.response },
        isFetching: false
      }
    case 'LINK_DEEZER_SUCCESS':
      return {
        ...state,
        data: { ...action.response },
        isFetching: false
      }
    case 'UNLINK_DEEZER_SUCCESS':
      return {
        ...state,
        data: { ...action.response },
        isFetching: false
      }
    case 'LOGIN_FAILURE':
      return {
        ...state,
        error: action.error,
        isFetching: false
      }
    case 'RECOVER_PASSWORD_EMAIL_SEND':
      return {
        ...state,
        isFetching: false
      }
    case 'UPDATE_SUCCESS':
      return {
        ...state,
        data: { ...action.response },
        isFetching: false
      }
    case 'UPDATE_FAILURE':
      return {
        ...state,
        error: action.error,
        isFetching: false
      }
    case 'SET_PLAYLISTS':
      return {
        ...state,
        data: { ...state.data, playlists: action.playlists },
        isFetching: false
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
        },
        isFetching: false
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
        },
        isFetching: false
      }
    case 'DEEZER_GET_TOKEN_SUCCESS':
      return {
        ...state,
        deezerToken: action.token,
        isFetching: false
      }
    case 'SET_USER_ID_SUCCESS':
      return {
        ...state,
        deezerId: action.results,
        isFetching: false
      }
    case 'GET_FOLLOWERS_SUCCESS':
      return {
        ...state,
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
