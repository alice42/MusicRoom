import { fork } from "redux-saga/effects";
import loginApp from "./loginAppSaga";
import loginFacebook from "./loginFacebookSaga";
import loginGoogle from "./loginGoogleSaga";
import signinApp from "./signinAppSaga";
import resetPassword from "./resetPasswordSaga";

function* rootSaga() {
  yield [
    fork(loginApp),
    fork(signinApp),
    fork(loginFacebook),
    fork(loginGoogle),
    fork(resetPassword)
  ];
}
export default rootSaga;
