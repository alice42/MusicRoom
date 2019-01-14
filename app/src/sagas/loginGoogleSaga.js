import { call, put, takeEvery, all } from "redux-saga/effects";
import { loginGoogleCall } from "../services/loginGoogle";

function* loginGoogleSaga(action) {
  try {
    const response = yield call(loginGoogleCall);
    if (!response.cancelled) {
      yield put({ type: "GOOGLE_LOGIN_SUCCESS", response: response });
    }
  } catch (err) {
    yield put({ type: "GOOGLE_LOGIN_FAILURE", err: err });
  }
}

export default function* rootSaga() {
  yield all([yield takeEvery("GOOGLE_LOGIN_REQUEST", loginGoogleSaga)]);
}
