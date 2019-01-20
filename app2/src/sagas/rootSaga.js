import { fork } from "redux-saga/effects";
import signUpAppSaga from "./signUpAppSaga";
import loginAppSaga from "./loginAppSaga";
import loginGoogleSaga from "./loginGoogleSaga";
import loginFacebookSaga from "./loginFacebookSaga";
import resetPasswordSaga from "./resetPasswordSaga";

function* rootSaga() {
  yield [
    fork(loginAppSaga),
    fork(loginGoogleSaga),
    fork(loginFacebookSaga),
    fork(signUpAppSaga),
    fork(resetPasswordSaga)
  ];
}
export default rootSaga;
