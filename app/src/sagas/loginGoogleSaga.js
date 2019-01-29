import { call, put, takeEvery, all } from "redux-saga/effects";
import { loginGoogle } from "../services/apiService";

function* loginGoogleSaga(action) {
  try {
    const response = yield call(loginGoogle);
    console.log("responsLog", response);
  } catch (err) {
    console.log("ERROR", err);
  }
}

export default function* rootSaga() {
  yield all([yield takeEvery("LOGIN_GOOGLE_REQUEST", loginGoogleSaga)]);
}
