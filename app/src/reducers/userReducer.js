const initialState = {
  token: null,
  data: {
    email: "",
    firstname: "",
    name: "",
    facebook: false,
    google: false,
    deezer: false,
    tags: []
  },
  error: null
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case "SIGNIN_SUCCESS":
      return {
        ...state
      };
    case "SIGNIN_FAILURE":
      return {
        ...state,
        error: action.error
      };
    case "LOGIN_SUCCESS":
      return {
        ...state,
        token: action.response.sessionId,
        data: { ...state.data, email: action.response.email },
        error: null
      };
    case "LOGIN_FAILURE":
      return {
        ...state,
        error: action.error
      };
    case "RECOVER_PASSWORD_EMAIL_SEND":
      return {
        ...state
      };
    case "UPDATE_SUCCESS":
      return {
        ...state
      };
    case "UPDATE_FAILURE":
      return {
        ...state,
        error: action.error
      };
    case "LOGOUT":
      return initialState;
    default:
      return state;
  }
}

export default reducer;
