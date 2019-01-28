const initialState = {
  validationMessage: null,
  errorMessage: null
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case "SIGNIN_REQUEST":
      return {
        ...state
      };
    case "SIGNIN_SUCCESS":
      return {
        ...state,
        validationMessage: action.response
      };
    case "SIGNIN_FAILURE":
      return {
        ...state,
        errorMessage: action.err
      };
    default:
      return state;
  }
}

export default reducer;
