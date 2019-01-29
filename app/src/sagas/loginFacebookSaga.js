import { call, put, takeEvery, all } from "redux-saga/effects";
import { loginFacebook } from "../services/apiService";

function* loginAppSaga(action) {
  try {
    const response = yield call(loginFacebook);
    console.log("responsLog", response);
  } catch (err) {
    console.log("ERROR", err);
  }
}

export default function* rootSaga() {
  yield all([yield takeEvery("LOGIN_FACEBOOK_REQUEST", loginAppSaga)]);
}
