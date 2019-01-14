import { fork } from "redux-saga/effects";
import signUpAppSaga from "./signUpAppSaga";
import loginAppSaga from "./loginAppSaga";
import loginGoogleSaga from "./loginGoogleSaga";
import loginFacebookSaga from "./loginFacebookSaga";

function* rootSaga() {
  yield [
    fork(loginAppSaga),
    fork(loginGoogleSaga),
    fork(loginFacebookSaga),
    fork(signUpAppSaga)
  ];
}
export default rootSaga;
