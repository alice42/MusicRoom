export function getEvents(location) {
  return {
    type: 'SERVICE_MTV_GET_EVENTS_REQUEST',
    location
  }
}

export function createEventRequest(name, location) {
  return {
    type: 'SERVICE_MTV_CREATE_EVENTS_REQUEST',
    name,
    location
  }
}

export function updateEventRequest(id, toChange, newValue, location) {
  return {
    type: 'SERVICE_MTV_EVENTS_UPDATE_DATA_REQUEST',
    id,
    toChange,
    newValue,
    location
  }
}

export function vote(trackId, eventId, value) {
  return {
    type: 'VOTE_REQUEST',
    trackId,
    eventId,
    value
  }
}

export function deleteEventRequest(eventId, location) {
  return {
    type: 'DELETE_EVENT_REQUEST',
    eventId,
    location
  }
}
