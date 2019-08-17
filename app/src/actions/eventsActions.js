export function getEvents() {
  return {
    type: 'SERVICE_MTV_GET_EVENTS_REQUEST'
  }
}

export function createEventRequest(name) {
  return {
    type: 'SERVICE_MTV_CREATE_EVENTS_REQUEST',
    name
  }
}

export function updateEventRequest(id, toChange, newValue) {
  return {
    type: 'SERVICE_MTV_EVENTS_UPDATE_DATA_REQUEST',
    id,
    toChange,
    newValue
  }
}

export function vote(trackId, eventId, value) {
  console.log(trackId, eventId, value)
  return {
    type: 'VOTE_REQUEST',
    trackId,
    eventId,
    value
  }
}
