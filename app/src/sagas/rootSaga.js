import { fork, all } from 'redux-saga/effects'
import search from './searchSaga'
import user from './userSaga'
import playlist from './playlistSaga'
import events from './eventsSaga'

function* rootSaga() {
  yield all([fork(user), fork(events), fork(search), fork(playlist)])
}
export default rootSaga
