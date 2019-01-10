import { call, put, takeEvery, all } from "redux-saga/effects";
import { signInWithGoogleAsync } from "../services/google";

function* googleLoginSaga(action) {
  try {
    const response = yield call(signInWithGoogleAsync);
    yield put({ type: "GOOGLE_LOGIN_SUCCESS", response: response });
  } catch (err) {
    yield put({ type: "GOOGLE_LOGIN_FAILURE", err: err });
  }
}

export default function* rootSaga() {
  yield all([yield takeEvery("GOOGLE_LOGIN_REQUEST", googleLoginSaga)]);
}
