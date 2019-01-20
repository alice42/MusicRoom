import { call, put, takeEvery, all } from "redux-saga/effects";
import { ResetPasswordCall } from "../services/resetPassword";

function* ResetPasswordSaga(action) {
  const { email } = action;
  try {
    const response = yield call(ResetPasswordCall, email);
    yield put({ type: "RESET_PASSWORD_SUCCESS", response: response });
  } catch (err) {
    yield put({ type: "RESET_PASSWORD_FAILURE", err: err });
  }
}

export default function* rootSaga() {
  yield all([yield takeEvery("RESET_PASSWORD_REQUEST", ResetPasswordSaga)]);
}
