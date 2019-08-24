const initialState = {
  list: [],
  error: null,
  isFetching: false
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SERVICE_MTV_GET_EVENTS_REQUEST':
      return {
        ...state,
        error: null,
        isFetching: true
      }
    case 'SERVICE_MTV_GET_EVENTS_REQUEST_SUCCESS':
      return {
        ...state,
        list: [...action.response],
        error: null,
        isFetching: false
      }
    case 'SERVICE_MTV_GET_EVENTS_REQUEST_FAILURE':
      return {
        ...state,
        error: action.error,
        isFetching: false
      }
    case 'SERVICE_MTV_CREATE_EVENTS_REQUEST_SUCCESS':
      return {
        ...state,
        list: [...action.response],
        error: null,
        isFetching: false
      }
    case 'SERVICE_MTV_CREATE_EVENTS_REQUEST_FAILURE':
      return {
        ...state,
        error: action.error,
        isFetching: false
      }
    case 'SERVICE_MTV_EVENTS_UPDATE_DATA_REQUEST_SUCCESS':
      return {
        ...state,
        list: [...action.response],
        error: null,
        isFetching: false
      }
    case 'DELETE_EVENT_SUCCESS':
      return {
        ...state,
        list: [...action.response],
        error: null,
        isFetching: false
      }
    case 'SERVICE_MTV_EVENTS_UPDATE_DATA_REQUEST_FAILURE':
      return {
        ...state,
        list: [...state.list],
        error: action.error,
        isFetching: false
      }
    default:
      return state
  }
}

export default reducer
