import { fork } from "redux-saga/effects";
import userSaga from "./userSaga";
// import playlistSaga from "./playlistSaga";

function* rootSaga() {
  yield [fork(userSaga)];
}
export default rootSaga;
