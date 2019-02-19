const initialState = {
  isAppAuthenticated: false,
  isFetching: false,
  token: null,
  user: {},
  failure: false,
  errorMessage: null,
  emailSendMessage: null
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case "LOGIN_REQUEST":
      return {
        ...state,
        isFetching: true,
        isAppAuthenticated: false
      };
    case "LOGIN_SUCCESS":
      console.log("****ACTION", action);
      return {
        ...state,
        isFetching: false,
        isAppAuthenticated: true,
        token: action.response.sessionId,
        failure: false,
        user: {
          email: action.response.user.email,
          name: action.response.user.name,
          firstname: action.response.user.firstname,
          deezer: action.response.user.deezer,
          google: action.response.user.google,
          facebook: action.response.user.facebook,
          tags: action.response.user.tags,
          avatarUri: action.response.user.avatarUri
        }
      };
    case "LOGIN_FAILURE":
      return {
        ...state,
        isFetching: false,
        isAppAuthenticated: false,
        failure: true,
        errorMessage: action.err
      };
    case "LOGOUT":
      return initialState;
    case "RECOVER_PASSWORD_EMAIL_SEND":
      return {
        ...state,
        emailSendMessage: action.emailSendMessage
      };
    default:
      return state;
  }
}

export default reducer;
