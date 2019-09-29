import { call, put, takeEvery, all, select } from 'redux-saga/effects'
import {
  getEventsMethod,
  createEventsMethod,
  updateEventMethod,
  votetMethod,
  deleteEventMethod
} from '../services/mtvService'

function* getEventsSaga(action) {
  try {
    const { location } = action
    const token = yield select(state => state.user.token)
    const payload = {
      token,
      location
    }
    const response = yield call(getEventsMethod, payload)
    if (response.error) {
      throw Error(response.error)
    } else {
      yield put({ type: 'SERVICE_MTV_GET_EVENTS_REQUEST_SUCCESS', response })
    }
  } catch (error) {
    yield put({ type: 'SERVICE_MTV_GET_EVENTS_REQUEST_FAILURE', error: error.message })
  }
}

function* createEventsSaga(action) {
  try {
    const { name, location } = action
    const token = yield select(state => state.user.token)
    const payload = {
      name,
      token,
      location
    }
    const response = yield call(createEventsMethod, payload)
    if (response.error) {
      throw Error(response.error)
    } else {
      yield put({ type: 'SERVICE_MTV_CREATE_EVENTS_REQUEST_SUCCESS', response })
    }
  } catch (error) {
    yield put({ type: 'SERVICE_MTV_CREATE_EVENTS_REQUEST_FAILURE', error: error.message })
  }
}

function* updateEventsSaga(action) {
  try {
    const { id, toChange, newValue, location } = action
    const eventId = id
    const token = yield select(state => state.user.token)
    const payload = {
      token,
      eventId,
      toChange,
      newValue,
      location
    }
    const response = yield call(updateEventMethod, payload)
    if (response.error) {
      throw Error(response.error)
    } else {
      yield put({ type: 'SERVICE_MTV_EVENTS_UPDATE_DATA_REQUEST_SUCCESS', response })
    }
  } catch (error) {
    yield put({ type: 'SERVICE_MTV_EVENTS_UPDATE_DATA_REQUEST_FAILURE', error: error.message })
  }
}

function* vote(action) {
  try {
    const { trackId, eventId, value, location } = action
    const token = yield select(state => state.user.token)
    const payload = {
      trackId,
      eventId,
      value,
      token,
      location
    }
    const response = yield call(votetMethod, payload)
    if (response.error) {
      throw Error(response.error)
    } else {
      yield put({ type: 'VOTE_SUCCESS', results: response })
    }
  } catch (error) {
    yield put({ type: 'VOTE_FAILURE', error: error.message })
  }
}

function* deleteEventRequest(action) {
  try {
    const { eventId, location } = action
    const token = yield select(state => state.user.token)
    const payload = {
      eventId,
      token,
      location
    }
    const response = yield call(deleteEventMethod, payload)
    if (response.error) {
      throw Error(response.error)
    } else {
      yield put({ type: 'DELETE_EVENT_SUCCESS', response })
    }
  } catch (error) {
    yield put({ type: 'DELETE_EVENT_FAILURE', error: error.message })
  }
}

export default function* rootSaga() {
  yield all(
    [yield takeEvery('SERVICE_MTV_GET_EVENTS_REQUEST', getEventsSaga)],
    [yield takeEvery('SERVICE_MTV_CREATE_EVENTS_REQUEST', createEventsSaga)],
    [yield takeEvery('SERVICE_MTV_EVENTS_UPDATE_DATA_REQUEST', updateEventsSaga)],
    [yield takeEvery('VOTE_REQUEST', vote)],
    [yield takeEvery('DELETE_EVENT_REQUEST', deleteEventRequest)]
  )
}
