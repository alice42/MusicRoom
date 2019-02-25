const initialState = {
  results: [],
  errorMessage: null
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "SEARCH_REQUEST":
      return {
        ...state,
        results: [],
        errorMessage: null
      };
    case "SEARCH_SUCCESS":
      return {
        ...state,

        results: action.results,
        errorMessage: null
      };
    case "SEARCH_FAILURE":
      return {
        ...state,
        results: [],
        errorMessage: action.error
      };
    default:
      return state;
  }
};

export default reducer;
