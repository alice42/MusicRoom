import { fork } from "redux-saga/effects";
import userSaga from "./userSaga";
import googleSignUpSaga from "./googleSignUpSaga";
import facebookSignUpSaga from "./facebookSignUpSaga";

function* rootSaga() {
  yield [fork(userSaga), fork(googleSignUpSaga), fork(facebookSignUpSaga)];
}
export default rootSaga;
