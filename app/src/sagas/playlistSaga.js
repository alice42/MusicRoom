import { call, put, takeEvery, all, select } from 'redux-saga/effects'
import {
  getPlaylistTracksMethodMpe,
  addtrackToPlaylistMethodMpe,
  getPlaylistsMethod,
  createPlaylistsMethod,
  deletePlaylistMethod,
  updatePlaylistMethod,
  removeTrackMethodMpe
} from '../services/mpeService'
import {
  getPlaylistTracksMethodMtv,
  addtrackToPlaylistMethodMtv,
  removeTrackMethodMtv
} from '../services/mtvService'

function* getPlaylistsSaga(action) {
  try {
    const token = yield select(state => state.user.token)
    const payload = {
      token
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
    const { name } = action

    const token = yield select(state => state.user.token)
    const payload = {
      name,
      token
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
    const { id, toChange, newValue } = action
    const playlistId = id
    const token = yield select(state => state.user.token)
    const payload = {
      token,
      playlistId,
      toChange,
      newValue
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
    const { playlistId } = action
    const token = yield select(state => state.user.token)
    const payload = {
      playlistId,
      token
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
    const socketPlaylistId = action && action.response && action.response.id
    const playlistId = yield select(state => state.playlist.currentPlaylist.id)
    if (playlistId && (!socketPlaylistId || socketPlaylistId === playlistId)) {
      const token = yield select(state => state.user.token)
      const service = action.service
      const payload = {
        token,
        playlistId
      }
      let response
      if (service === '/mpe') {
        response = yield call(getPlaylistTracksMethodMpe, payload)
      } else {
        response = yield call(getPlaylistTracksMethodMtv, payload)
      }
      if (response.error) {
        throw Error(response.error)
      } else {
        yield put({
          type: 'GET_PLAYLIST_TRACKS_SUCCESS',
          results: response
        })
      }
    }
  } catch (error) {
    yield put({ type: 'GET_PLAYLIST_TRACKS_FAILURE', error: error.message })
  }
}

function* addtrackToPlaylist(action) {
  const { trackId, playlistId, service, location } = action
  try {
    const token = yield select(state => state.user.token)
    const payload = {
      token,
      trackId,
      playlistId,
      location
    }
    let response
    if (service === '/mpe') {
      response = yield call(addtrackToPlaylistMethodMpe, payload)
    } else {
      response = yield call(addtrackToPlaylistMethodMtv, payload)
    }
    if (response.error) {
      throw Error(response.error)
    } else {
      yield put({
        type: 'ADD_TRACK_TO_PLAYLIST_SUCCESS',
        results: response
      })
    }
  } catch (error) {
    yield put({ type: 'ADD_TRACK_TO_PLAYLIST_FAILURE', error: error.message })
  }
}

function* removeTrackRequest(action) {
  try {
    const { playlistId, trackId, service, location } = action
    const token = yield select(state => state.user.token)
    const payload = {
      playlistId,
      trackId,
      token,
      location
    }
    let response
    if (service === '/mpe') {
      response = yield call(removeTrackMethodMpe, payload)
    } else {
      response = yield call(removeTrackMethodMtv, payload)
    }
    if (response.error) {
      throw Error(response.error)
    } else {
      yield put({ type: 'REMOVE_TRACK_FROM_PLAYLIST_SUCCESS', results: response })
    }
  } catch (error) {
    yield put({ type: 'REMOVE_TRACK_FROM_PLAYLIST_FAILURE', error: error.message })
  }
}

function* setPlaylistId(action) {
  try {
    const playlist = yield select(state => state.playlist.currentPlaylist)
    yield put({
      type: 'GET_PLAYLIST_TRACKS_REQUEST',
      service: action.service
    })
  } catch (error) {
    yield put({ type: 'SET_PLAYLIST_ID_FAILURE', error: error.message })
  }
}

export default function* rootSaga() {
  yield all(
    [yield takeEvery('SET_PLAYLIST_ID', setPlaylistId)],
    [yield takeEvery('GET_PLAYLIST_TRACKS_REQUEST', getPlaylistTracks)],
    [yield takeEvery('UPDATED_PLAYLIST', getPlaylistTracks)],
    [yield takeEvery('ADD_TRACK_TO_PLAYLIST_REQUEST', addtrackToPlaylist)],
    [yield takeEvery('REMOVE_TRACK_TO_PLAYLIST_REQUEST', removeTrackRequest)],
    [yield takeEvery('SERVICE_MPE_GET_PLAYLISTS_REQUEST', getPlaylistsSaga)],
    [yield takeEvery('GET_PLAYLIST', getPlaylistsSaga)],
    [yield takeEvery('SERVICE_MPE_CREATE_PLAYLISTS_REQUEST', createPlaylistsSaga)],
    [yield takeEvery('SERVICE_MPE_PLAYLISTS_UPDATE_DATA_REQUEST', updatePlaylistsSaga)],
    [yield takeEvery('DELETE_PLAYLIST_REQUEST', deletePlaylistRequest)]
  )
}
