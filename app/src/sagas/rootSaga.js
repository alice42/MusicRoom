import { fork } from "redux-saga/effects";
import search from "./searchSaga";
import user from "./userSaga";

function* rootSaga() {
  yield [fork(user), fork(search)];
}
export default rootSaga;
