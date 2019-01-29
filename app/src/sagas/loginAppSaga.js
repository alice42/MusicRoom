import { call, put, takeEvery, all } from "redux-saga/effects";
import { loginClassic } from "../services/apiService";

function* loginAppSaga(action) {
  const { email, password } = action;
  console.log("action", action);
  try {
    const payload = {
      email,
      password
    };
    console.log("payload", payload);

    const response = yield call(loginClassic, payload);
    console.log("responsLog", response);
    if (response.error) {
      yield put({ type: "LOGIN_FAILURE", err: response.error });
    } else {
      yield put({
        type: "LOGIN_SUCCESS",
        response: { email, sessionId: response.sessionId }
      });
    }
  } catch (err) {
    console.error("ERROR", err);
    yield put({ type: "LOGIN_FAILURE", err: err });
  }
}

export default function* rootSaga() {
  yield all([yield takeEvery("LOGIN_REQUEST", loginAppSaga)]);
}
