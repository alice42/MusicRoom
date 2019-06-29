import { call, put, takeEvery, all, select } from 'redux-saga/effects'
import { getTrack, getPlaylistTrack } from '../services/apiService'

function* searchSaga(action) {
  const { track } = action
  try {
    const response = yield call(getTrack, track)
    yield put({ type: 'SEARCH_SUCCESS', results: response })
  } catch (error) {
    yield put({ type: 'SEARCH_FAILURE', error: error.message })
  }
}

export default function* rootSaga() {
  yield all([yield takeEvery('SEARCH_REQUEST', searchSaga)])
}
