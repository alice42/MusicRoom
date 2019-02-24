import { fork } from "redux-saga/effects";
import playlist from "./playlistSaga";
import user from "./userSaga";

function* rootSaga() {
  yield [fork(user), fork(playlist)];
}
export default rootSaga;
