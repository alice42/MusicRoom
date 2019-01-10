const initialState = {
  isAuthenticated: false,
  isFetching: false,
  token: "",
  user: {},
  errorMessage: ""
};

function reducer(state = initialState, action) {
  console.log("3", action);
  switch (action.type) {
    case "FACEBOOK_LOGIN_REQUEST":
      return {
        ...state,
        isFetching: true,
        isAuthenticated: false
      };
    case "FACEBOOK_LOGIN_SUCCESS":
      return {
        ...state,
        isFetching: false,
        isAuthenticated: true,
        token: action.response.id,
        failure: false,
        user: action.response.name
      };
    case "FACEBOOK_LOGIN_FAILURE":
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
