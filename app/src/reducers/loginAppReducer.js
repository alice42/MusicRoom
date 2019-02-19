const initialState = {
  isAppAuthenticated: false,
  isFetching: false,
  token: null,
  user: {},
  failure: false,
  errorMessage: null
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
      return {
        ...state,
        isFetching: false,
        isAppAuthenticated: true,
        token: action.response.sessionId,
        failure: false,
        user: {
          email: action.response.email,
          sessionId: action.response.sessionId,
          name: action.response.name || "NAME",
          firstname: action.response.firstname || "FIRSTNAME",
          deezer: action.response.deezer || false,
          google: action.response.google || false,
          facebook: action.response.facebook || false,
          tags: action.response.tags || [],
          avatarUri: action.response.avatarUri || ""
        }
      };
    case "LOGIN_FAILURE":
      return {
        ...state,
        isFetching: false,
        isAppAuthenticated: false,
        failure: true,
        errorMessage: action.err.status
      };
    case "LOGOUT":
      return initialState;
    default:
      return state;
  }
}

export default reducer;
