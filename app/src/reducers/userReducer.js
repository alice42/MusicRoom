const initialState = {
  token: null,
  deezerToken: null,
  deezerId: null,
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
      console.log('SET>PLAYLISTS', action)
      return {
        ...state,
        data: { ...state.data, playlists: action.playlists }
      }
    case 'CREATE_PLAYLIST_SUCCESS':
      console.log('CREATE_PLAYLISTS ', action)
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
