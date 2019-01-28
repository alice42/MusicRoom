import { fork } from "redux-saga/effects";
import loginApp from "./loginAppSaga";
import signinApp from "./signinAppSaga";

function* rootSaga() {
  yield [fork(loginApp), fork(signinApp)];
}
export default rootSaga;
