import { call, put, takeEvery, all } from "redux-saga/effects";
import { loginAppCall } from "../services/loginApp";

function* loginAppSaga(action) {
  const { email, password } = action;
  try {
    const payload = {
      email,
      password
    };
    const response = yield call(loginAppCall, payload);
    yield put({ type: "LOGIN_SUCCESS", response: response });
  } catch (err) {
    yield put({ type: "LOGIN_FAILURE", err: err });
  }
}

export default function* rootSaga() {
  yield all([yield takeEvery("LOGIN_REQUEST", loginAppSaga)]);
}
