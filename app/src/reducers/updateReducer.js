const initialState = {
  user: {
    username: "John Doe",
    email: "JohnDoe@mail.com",
    avatarUri: "",
    tags: []
  },
  errorMessage: null
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case "UPDATE_REQUEST":
      return {
        ...state
      };
    case "UPDATE_SUCCESS":
      return {
        ...state,
        user: action.response
      };
    case "UPDATE_FAILURE":
      return {
        ...state,
        errorMessage: action.err.status
      };
    default:
      return state;
  }
}

export default reducer;
