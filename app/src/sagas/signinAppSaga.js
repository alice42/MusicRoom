import { call, put, takeEvery, all } from "redux-saga/effects";
import { signinMethod } from "../services/apiService";

function* signinAppSaga(action) {
  const { email, password } = action;
  try {
    const payload = {
      email,
      password
    };
    const response = yield call(signinMethod, payload);
    if (response.error) {
      yield put({ type: "SIGNIN_FAILURE", err: response.error });
    } else {
      yield put({ type: "SIGNIN_SUCCESS", response: response.message });
    }
  } catch (err) {
    yield put({ type: "SIGNIN_FAILURE", err: err });
  }
}

export default function* rootSaga() {
  yield all([yield takeEvery("SIGNIN_REQUEST", signinAppSaga)]);
}
