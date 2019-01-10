const initialState = {
  isAuthenticated: false,
  isFetching: false,
  token: "",
  user: {},
  errorMessage: ""
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case "GOOGLE_LOGIN_REQUEST":
      return {
        ...state,
        isFetching: true,
        isAuthenticated: false
      };
    case "GOOGLE_LOGIN_SUCCESS":
      return {
        ...state,
        isFetching: false,
        isAuthenticated: true,
        token: action.response.accessToken,
        failure: false,
        user: action.response.user
      };
    case "GOOGLE_LOGIN_FAILURE":
      return {
        ...state,
        isFetching: false,
        isAuthenticated: false,
        failure: true,
        errorMessage: action.err.status
      };
    default:
      return state;
  }
}

export default reducer;
