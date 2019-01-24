import { call, put, takeEvery, all } from "redux-saga/effects";
import { signUpAppCall } from "../services/signUpApp";

function* signUpAppSaga(action) {
  const { email } = action;
  try {
    const payload = {
      email
    };
    const response = yield call(signUpAppCall, payload);
    yield put({ type: "SIGN_UP_SUCCESS", response: response });
  } catch (err) {
    yield put({ type: "SIGN_UP_FAILURE", err: err });
  }
}

export default function* rootSaga() {
  yield all([yield takeEvery("SIGN_UP_REQUEST", signUpAppSaga)]);
}
