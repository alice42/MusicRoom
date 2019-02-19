import { fork } from "redux-saga/effects";
import loginApp from "./loginAppSaga";
import loginFacebook from "./loginFacebookSaga";
import loginGoogle from "./loginGoogleSaga";
import signinApp from "./signinAppSaga";
import recoverPassword from "./recoverPasswordSaga";
import update from "./updateSaga";
import deezer from "./deezerSaga";

function* rootSaga() {
  yield [
    fork(loginApp),
    fork(signinApp),
    fork(loginFacebook),
    fork(loginGoogle),
    fork(recoverPassword),
    fork(update),
    fork(deezer)
  ];
}
export default rootSaga;
