const initialState = {
  isAppAuthenticated: false,
  isFetching: false,
  token: null,
  user: {},
  failure: false,
  errorMessage: null
};

function reducer(state = initialState, action) {
  console.log("****************************************************", action);
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
          sessionId: action.response.sessionId
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
