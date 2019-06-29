import { fork } from 'redux-saga/effects'
import search from './searchSaga'
import user from './userSaga'
import playlist from './playlistSaga'

function* rootSaga() {
  yield [fork(user), fork(search), fork(playlist)]
}
export default rootSaga
