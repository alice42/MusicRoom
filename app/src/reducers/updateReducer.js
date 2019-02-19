import { user } from "../constants/user";
const initialState = {
  user: {},
  errorMessage: null
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case "INIT_USER":
      return {
        ...state,
        user: action.user
      };
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
