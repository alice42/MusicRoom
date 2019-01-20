const initialState = {
  email: "",
  token: "",
  failure: null,
  errorMessage: ""
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case "RESET_PASSWORD_REQUEST":
      return {
        ...state
      };
    case "RESET_PASSWORD_SUCCESS":
      return {
        ...state,
        email: action.response.email,
        token: action.response.token,
        errorMessage: null,
        failure: false
      };
    case "RESET_PASSWORD_FAILURE":
      return {
        ...state,
        failure: true,
        errorMessage: action.err.status
      };
    default:
      return state;
  }
}

export default reducer;
