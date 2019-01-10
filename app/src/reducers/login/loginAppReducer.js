const initialState = {
  isAppAuthenticated: false,
  isFetching: false,
  token: "",
  user: {},
  errorMessage: ""
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
        token: action.response.token,
        failure: false,
        user: action.response.user
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
