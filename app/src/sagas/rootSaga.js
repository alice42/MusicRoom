import { fork } from "redux-saga/effects";
import loginAppSaga from "./loginAppSaga";
import loginGoogleSaga from "./loginGoogleSaga";
import loginFacebookSaga from "./loginFacebookSaga";

function* rootSaga() {
  yield [fork(loginAppSaga), fork(loginGoogleSaga), fork(loginFacebookSaga)];
}
export default rootSaga;
