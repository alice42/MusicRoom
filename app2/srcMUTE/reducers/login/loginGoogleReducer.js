const initialState = {
  isGoogleAuthenticated: false,
  isFetching: false,
  token: "",
  user: {},
  failure: false,
  errorMessage: ""
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case "GOOGLE_LOGIN_REQUEST":
      return {
        ...state,
        isFetching: true,
        isGoogleAuthenticated: false
      };
    case "GOOGLE_LOGIN_SUCCESS":
      return {
        ...state,
        isFetching: false,
        isGoogleAuthenticated: true,
        token: action.response.accessToken,
        failure: false,
        user: action.response.user
      };
    case "GOOGLE_LOGIN_FAILURE":
      return {
        ...state,
        isFetching: false,
        isGoogleAuthenticated: false,
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
