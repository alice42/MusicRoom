const initialState = {
  token: null,
  deezerToken: null,
  deezerId: null,
  data: {
    avatarUri: '',
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
        data: { ...state.data, email: action.response.user.email, firstname: action.response.user.givenName, name: action.response.user.familyName, avatarUri: action.response.user.photo, google: true },
        error: null
      }
    case 'LOGIN_SUCCESS_FACEBOOK':
      return {
        ...state,
        token: action.response.sessionId,
        data: { ...state.data, email: action.response.user.email, firstname: action.response.user.firstname, name: action.response.user.lastname, avatarUri: action.response.user.avatarUri, facebook: true },
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
        deezerToken: action.token,
        data: { ...state.data, deezer: true }
      }
    case 'SET_USER_ID_SUCCESS':
      return {
        ...state,
        deezerId: action.results
      }
    case 'LOGOUT':
      return initialState
    default:
      return state
  }
}

export default reducer
