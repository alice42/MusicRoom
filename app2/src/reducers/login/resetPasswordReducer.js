const initialState = {
  failure: false,
  errorMessage: "",
  cancelled: false,
  emailFound: false
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case "RESET_PASSWORD_REQUEST":
      return {
        ...state
      };
    case "CANCEL_RESET_PASSWORD_REQUEST":
      return {
        ...state,
        cancelled: true,
        failure: false,
        errorMessage: "",
        emailFound: false
      };
    case "RESET_PASSWORD_SUCCESS":
      return {
        ...state,
        cancelled: false,
        failure: false,
        emailFound: true,
        errorMessage: ""
      };
    case "RESET_PASSWORD_FAILURE":
      return {
        ...state,
        failure: true,
        cancelled: false,
        emailFound: false,
        errorMessage: action.err.status
      };
    default:
      return state;
  }
}

export default reducer;
