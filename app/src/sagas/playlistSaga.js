import { call, put, takeEvery, all, select } from 'redux-saga/effects'
import { getPlaylistTrack } from '../services/apiService'
import {
  editPlaylistTrack,
  createNewPlaylist,
  deletePlaylist
} from '../services/apiService'

function* setPlaylistTracks(action) {
  const { id, deezerToken } = action
  try {
    const payload = {
      id,
      deezerToken
    }
    const response = yield call(getPlaylistTrack, payload)
    yield put({
      type: 'SET_PLAYLIST_TRACK_SUCCESS',
      results: response.results.tracks.data,
      playlistInfo: response.results
    })
  } catch (err) {
    console.log(err)
    yield put({ type: 'SET_PLAYLIST_TRACK_FAILURE', error: error.message })
  }
}

function* setUserId(action) {
  const { id, deezerToken } = action
  try {
    const payload = {
      id,
      deezerToken
    }
    const response = yield call(getPlaylistTrack, payload)
    yield put({
      type: 'SET_USER_ID_SUCCESS',
      results: response.results.creator.id
    })
  } catch (err) {
    console.log(err)
    yield put({ type: 'SET_USER_ID_FAILURE', error: error.message })
  }
}

function* editPlaylist(action) {
  const { trackId, playlistId, token } = action
  try {
    const payload = {
      trackId,
      playlistId,
      token
    }
    const responseEditPlaylist = yield call(editPlaylistTrack, payload)
    yield put({
      type: 'EDIT_PLAYLIST_SUCCESS',
      results: responseEditPlaylist
    })
    const id = playlistId
    const deezerToken = token
    const payloadT = {
      id,
      deezerToken
    }

    const reponseSetPlaylist = yield call(getPlaylistTrack, payloadT)
    yield put({
      type: 'SET_PLAYLIST_TRACK_SUCCESS',
      results: reponseSetPlaylist.results.tracks.data,
      playlistInfo: reponseSetPlaylist.results
    })
  } catch (err) {
    console.log(err)
    yield put({ type: 'EDIT_PLAYLIST_FAILURE', error: error.message })
  }
}

function* createPlaylist(action) {
  const { title, deezerToken, deezerId, collabOption, privacyOption } = action
  try {
    const payload = {
      title,
      deezerToken,
      deezerId,
      collabOption,
      privacyOption
    }
    const response = yield call(createNewPlaylist, payload)
    yield put({
      type: 'CREATE_PLAYLIST_SUCCESS',
      results: response
    })
  } catch (err) {
    console.log(err)
    yield put({ type: 'CREATE_PLAYLIST_FAILURE', error: error.message })
  }
}

function* deletePlaylistDeezer(action) {
  const { playlistId, deezerToken } = action
  try {
    const payload = {
      playlistId,
      deezerToken
    }
    const response = yield call(deletePlaylist, payload)
    yield put({
      type: 'DELETE_PLAYLIST_SUCCESS',
      results: payload.playlistId
    })
  } catch (err) {
    console.log(err)
    yield put({ type: 'DELETE_PLAYLIST_FAILURE', error: error.message })
  }
}

export default function* rootSaga() {
  yield all(
    [yield takeEvery('SET_PLAYLIST_TRACKS', setPlaylistTracks)],
    [yield takeEvery('SET_USER_ID', setUserId)],
    [yield takeEvery('EDIT_PLAYLIST', editPlaylist)],
    [yield takeEvery('CREATE_PLAYLIST', createPlaylist)],
    [yield takeEvery('DELETE_PLAYLIST', deletePlaylistDeezer)]
  )
}
