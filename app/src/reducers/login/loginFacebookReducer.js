const initialState = {
  isFacebookAuthenticated: false,
  isFetching: false,
  token: "",
  user: {},
  errorMessage: ""
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case "FACEBOOK_LOGIN_REQUEST":
      return {
        ...state,
        isFetching: true,
        isFacebookAuthenticated: false
      };
    case "FACEBOOK_LOGIN_SUCCESS":
      return {
        ...state,
        isFetching: false,
        isFacebookAuthenticated: true,
        token: action.response.id,
        failure: false,
        user: action.response.name
      };
    case "FACEBOOK_LOGIN_FAILURE":
      return {
        ...state,
        isFetching: false,
        isFacebookAuthenticated: false,
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
