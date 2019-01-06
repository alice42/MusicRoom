import * as types from "../../actions/actionTypes";

const initialState = {
  isAuthenticated: false,
  isFetching: false,
  token: "",
  user: {},
  errorMessage: ""
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case types.LOGIN.REQUEST:
      return {
        ...state,
        isFetching: true,
        isAuthenticated: false
      };
    case types.LOGIN.SUCCESS:
      return {
        ...state,
        isFetching: false,
        isAuthenticated: true,
        token: action.token,
        failure: false,
        user: action.user
      };
    case types.LOGIN.FAILURE:
      return {
        ...state,
        isFetching: false,
        isAuthenticated: false,
        failure: true,
        errorMessage: action.err
      };
    case types.LOGOUT:
      return initialState;
    default:
      return state;
  }
}

export default reducer;
