import { call, put, takeEvery, all, select } from 'redux-saga/effects'
import {
  getPlaylistTracksMethod,
  addtrackToPlaylistMethod,
  getPlaylistsMethod,
  createPlaylistsMethod,
  deletePlaylistMethod,
  updatePlaylistMethod
} from '../services/mpeService'

function* getPlaylistsSaga(action) {
  try {
    const { location } = action
    const token = yield select(state => state.user.token)
    const payload = {
      token,
      location
    }
    const response = yield call(getPlaylistsMethod, payload)
    if (response.error) {
      throw Error(response.error)
    } else {
      yield put({ type: 'SERVICE_MPE_GET_PLAYLISTS_REQUEST_SUCCESS', response })
    }
  } catch (error) {
    yield put({ type: 'SERVICE_MPE_GET_PLAYLISTS_REQUEST_FAILURE', error: error.message })
  }
}

function* createPlaylistsSaga(action) {
  try {
    const { name, location } = action
    const token = yield select(state => state.user.token)
    const payload = {
      name,
      token,
      location
    }
    const response = yield call(createPlaylistsMethod, payload)
    if (response.error) {
      throw Error(response.error)
    } else {
      yield put({ type: 'SERVICE_MPE_CREATE_PLAYLISTS_REQUEST_SUCCESS', response })
    }
  } catch (error) {
    yield put({ type: 'SERVICE_MPE_CREATE_PLAYLISTS_REQUEST_FAILURE', error: error.message })
  }
}

function* updatePlaylistsSaga(action) {
  try {
    const { id, toChange, newValue, location } = action
    const playlistId = id
    const token = yield select(state => state.user.token)
    const payload = {
      token,
      playlistId,
      toChange,
      newValue,
      location
    }
    const response = yield call(updatePlaylistMethod, payload)
    if (response.error) {
      throw Error(response.error)
    } else {
      yield put({ type: 'SERVICE_MPE_PLAYLISTS_UPDATE_DATA_REQUEST_SUCCESS', response })
    }
  } catch (error) {
    yield put({ type: 'SERVICE_MPE_PLAYLISTS_UPDATE_DATA_REQUEST_FAILURE', error: error.message })
  }
}

function* deletePlaylistRequest(action) {
  try {
    const { playlistId, location } = action
    const token = yield select(state => state.user.token)
    const payload = {
      playlistId,
      token,
      location
    }
    const response = yield call(deletePlaylistMethod, payload)
    if (response.error) {
      throw Error(response.error)
    } else {
      yield put({ type: 'DELETE_PLAYLIST_SUCCESS', response })
    }
  } catch (error) {
    yield put({ type: 'DELETE_PLAYLIST_FAILURE', error: error.message })
  }
}

///
function* getPlaylistTracks(action) {
  try {
    const { playlistId } = action
    const token = yield select(state => state.user.token)
    const payload = {
      token,
      playlistId
    }
    const response = yield call(getPlaylistTracksMethod, payload)
    yield put({
      type: 'GET_PLAYLIST_TRACKS_SUCCESS',
      results: response
    })
  } catch (err) {
    yield put({ type: 'GET_PLAYLIST_TRACKS_FAILURE', error: error.message })
  }
}

function* addtrackToPlaylist(action) {
  const { trackId, playlistId } = action
  try {
    const token = yield select(state => state.user.token)
    const payload = {
      token,
      trackId,
      playlistId
    }
    const response = yield call(addtrackToPlaylistMethod, payload)
    yield put({
      type: 'ADD_TRACK_TO_PLAYLIST_SUCCESS',
      results: response
    })
  } catch (err) {
    yield put({ type: 'ADD_TRACK_TO_PLAYLIST_FAILURE', error: error.message })
  }
}

export default function* rootSaga() {
  yield all(
    [yield takeEvery('GET_PLAYLIST_TRACKS_REQUEST', getPlaylistTracks)],
    [yield takeEvery('ADD_TRACK_TO_PLAYLIST_REQUEST', addtrackToPlaylist)],
    [yield takeEvery('SERVICE_MPE_GET_PLAYLISTS_REQUEST', getPlaylistsSaga)],
    [yield takeEvery('SERVICE_MPE_CREATE_PLAYLISTS_REQUEST', createPlaylistsSaga)],
    [yield takeEvery('SERVICE_MPE_PLAYLISTS_UPDATE_DATA_REQUEST', updatePlaylistsSaga)],
    [yield takeEvery('DELETE_PLAYLIST_REQUEST', deletePlaylistRequest)]
  )
}
