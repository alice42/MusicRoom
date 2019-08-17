const initialState = {
  list: [],
  error: null
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SERVICE_MTV_GET_EVENTS_REQUEST_SUCCESS':
      return {
        ...state,
        list: [...action.response],
        error: null
      }
    case 'SERVICE_MTV_GET_EVENTS_REQUEST_FAILURE':
      return {
        ...state,
        error: action.error
      }
    case 'SERVICE_MTV_CREATE_EVENTS_REQUEST_SUCCESS':
      return {
        ...state,
        list: [...action.response],
        error: null
      }
    case 'SERVICE_MTV_CREATE_EVENTS_REQUEST_FAILURE':
      return {
        ...state,
        error: action.error
      }
    case 'SERVICE_MTV_EVENTS_UPDATE_DATA_REQUEST_SUCCESS':
      return {
        ...state,
        list: [...action.response],
        error: null
      }
    case 'SERVICE_MTV_EVENTS_UPDATE_DATA_REQUEST_FAILURE':
      return {
        ...state,
        error: action.error
      }
    default:
      return state
  }
}

export default reducer
