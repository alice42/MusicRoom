const initialState = {
  list: [],
  isFetching: false
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SERVICE_MTV_GET_EVENTS_REQUEST':
      return {
        ...state,
        isFetching: true
      }
    case 'SERVICE_MTV_GET_EVENTS_REQUEST_SUCCESS':
      return {
        ...state,
        list: [...action.response],
        isFetching: false
      }
    case 'SERVICE_MTV_GET_EVENTS_REQUEST_FAILURE':
      return {
        ...state,
        isFetching: false
      }
    case 'SERVICE_MTV_CREATE_EVENTS_REQUEST_SUCCESS':
      return {
        ...state,
        list: [...action.response],
        isFetching: false
      }
    case 'SERVICE_MTV_CREATE_EVENTS_REQUEST_FAILURE':
      return {
        ...state,
        error: false,
        isFetching: false
      }
    case 'SERVICE_MTV_EVENTS_UPDATE_DATA_REQUEST_SUCCESS':
      return {
        ...state,
        list: [...action.response],
        isFetching: false
      }
    case 'DELETE_EVENT_SUCCESS':
      return {
        ...state,
        list: [...action.response],
        isFetching: false
      }
    case 'SERVICE_MTV_EVENTS_UPDATE_DATA_REQUEST_FAILURE':
      return {
        ...state,
        list: [...state.list],
        isFetching: false
      }
    default:
      return state
  }
}

export default reducer
