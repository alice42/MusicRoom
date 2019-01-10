import { call, put, takeEvery, all } from "redux-saga/effects";
import { loginCall } from "../services/login";

function* loginSaga(action) {
  const { email, password } = action;
  try {
    const payload = {
      email,
      password
    };
    const response = yield call(loginCall, payload);
    yield put({ type: "LOGIN_SUCCESS", response: response });
  } catch (err) {
    yield put({ type: "LOGIN_FAILURE", err: err });
  }
}

export default function* rootSaga() {
  yield all([yield takeEvery("LOGIN_REQUEST", loginSaga)]);
}
