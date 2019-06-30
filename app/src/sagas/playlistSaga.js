import { call, put, takeEvery, all, select } from 'redux-saga/effects'
import { getPlaylistTrack } from '../services/apiService'
import { editPlaylistTrack, createNewPlaylist } from '../services/apiService'

function* setPlaylistTracks(action) {
  const { id } = action
  try {
    const response = yield call(getPlaylistTrack, id)
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

function* setUserid(action) {
  const { id } = action
  try {
    const response = yield call(getPlaylistTrack, id)
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
    const reponseSetPlaylist = yield call(getPlaylistTrack, payload.playlistId)
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
  const { title, deezerToken, deezerId } = action
  try {
    const payload = {
      title,
      deezerToken,
      deezerId
    }
    const response = yield call(createNewPlaylist, payload)
    console.log('RESPONSE', response)
    yield put({
      type: 'CREATE_PLAYLIST_SUCCESS',
      results: response
    })
  } catch (err) {
    console.log(err)
    yield put({ type: 'CREATE_PLAYLIST_FAILURE', error: error.message })
  }
}

export default function* rootSaga() {
  yield all(
    [yield takeEvery('SET_PLAYLIST_TRACKS', setPlaylistTracks)],
    [yield takeEvery('SET_USER_ID', setUserid)],
    [yield takeEvery('EDIT_PLAYLIST', editPlaylist)],
    [yield takeEvery('CREATE_PLAYLIST', createPlaylist)]
  )
}
