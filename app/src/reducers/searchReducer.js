const initialState = {
  results: [],
  errorMessage: null,
  isFetching: false
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SEARCH_REQUEST':
      return {
        ...state,
        results: [],
        errorMessage: null,
        isFetching: true
      }
    case 'SEARCH_SUCCESS':
      return {
        ...state,
        results: action.results,
        errorMessage: null,
        isFetching: false
      }
    case 'SEARCH_FAILURE':
      return {
        ...state,
        results: [],
        errorMessage: action.error,
        isFetching: false
      }
    default:
      return state
  }
}

export default reducer
