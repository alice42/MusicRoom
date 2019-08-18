import { call, put, takeEvery, all, select } from 'redux-saga/effects'
import { getPlaylistTracksMethod, addtrackToPlaylistMethod } from '../services/mtvService'

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

// function* setUserId(action) {
//   const { id, deezerToken } = action
//   try {
//     const payload = {
//       id,
//       deezerToken
//     }
//     const response = yield call(getPlaylistTrack, payload)
//     yield put({
//       type: 'SET_USER_ID_SUCCESS',
//       results: response.results.creator.id
//     })
//   } catch (err) {
//     console.log(err)
//     yield put({ type: 'SET_USER_ID_FAILURE', error: error.message })
//   }
// }

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

// function* createPlaylist(action) {
//   const { title, deezerToken, deezerId, collabOption, privacyOption } = action
//   try {
//     const payload = {
//       title,
//       deezerToken,
//       deezerId,
//       collabOption,
//       privacyOption
//     }
//     const response = yield call(createNewPlaylist, payload)
//     yield put({
//       type: 'CREATE_PLAYLIST_SUCCESS',
//       results: response
//     })
//   } catch (err) {
//     console.log(err)
//     yield put({ type: 'CREATE_PLAYLIST_FAILURE', error: error.message })
//   }
// }

// function* deletePlaylistDeezer(action) {
//   const { playlistId, deezerToken } = action
//   try {
//     const payload = {
//       playlistId,
//       deezerToken
//     }
//     const response = yield call(deletePlaylist, payload)
//     yield put({
//       type: 'DELETE_PLAYLIST_SUCCESS',
//       results: payload.playlistId,
//       response: response
//     })
//   } catch (err) {
//     console.log(err)
//     yield put({ type: 'DELETE_PLAYLIST_FAILURE', error: error.message })
//   }
// }

// function* deleteTrackDeezer(action) {
//   const { playlistId, trackId, deezerId, deezerToken } = action
//   try {
//     const payload = {
//       playlistId,
//       deezerToken,
//       trackId,
//       deezerId
//     }
//     const response = yield call(deleteTrack, payload)
//     const id = playlistId
//     const payloadT = {
//       id,
//       deezerToken
//     }
//     const reponseSetPlaylist = yield call(getPlaylistTrack, payloadT)
//     yield put({
//       type: 'SET_PLAYLIST_TRACK_SUCCESS',
//       results: reponseSetPlaylist.results.tracks.data,
//       playlistInfo: reponseSetPlaylist.results
//     })
//   } catch (err) {
//     console.log(err)
//     yield put({ type: 'DELETE_TRACK_FAILURE', error: error.message })
//   }
// }

// function* getFollowers(action) {
//   try {
//     const response = yield call(getDeezerFollwers, action.id)
//     yield put({
//       type: 'GET_FOLLOWERS_SUCCESS',
//       results: response.results.data
//     })
//   } catch (err) {
//     yield put({ type: 'GET_FOLLOWERS_FAILURE', error: error.message })
//   }
// }

export default function* rootSaga() {
  yield all(
    [yield takeEvery('GET_PLAYLIST_TRACKS_REQUEST', getPlaylistTracks)],
    [yield takeEvery('ADD_TRACK_TO_PLAYLIST_REQUEST', addtrackToPlaylist)]
  )
}
