import { call, put, takeEvery, all } from 'redux-saga/effects'
import { searchTracksMethod } from '../services/apiService'

function* searchTracks(action) {
  const { track } = action
  try {
    const response = yield call(searchTracksMethod, track)
    yield put({ type: 'SEARCH_SUCCESS', results: response })
  } catch (error) {
    yield put({ type: 'SEARCH_FAILURE', error: error.message })
  }
}

export default function* rootSaga() {
  yield all([yield takeEvery('SEARCH_REQUEST', searchTracks)])
}
