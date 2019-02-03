import { call, put, takeEvery, all } from "redux-saga/effects";
import { recoverPassword, resetPassword } from "../services/apiService";

function* recoverPasswordSaga(action) {
  const { email } = action;
  try {
    const response = yield call(recoverPassword, email);
    if (response.error) {
      yield put({
        type: "RECOVER_PASSWORD_FAILURE",
        err: response.error
      });
    } else {
      yield put({
        type: "RECOVER_PASSWORD_SUCCESS",
        message: response.message
      });
    }
  } catch (err) {
    yield put({ type: "RECOVER_PASSWORD_FAILURE", err });
  }
}

function* resetPasswordSaga(action) {
  const { token, password, passwordConfirm } = action;
  try {
    const payload = { password, passwordConfirm, token };
    const response = yield call(resetPassword, payload);
    if (response.error) {
      yield put({
        type: "RESET_PASSWORD_FAILURE",
        err: response.error
      });
    } else {
      yield put({
        type: "RESET_PASSWORD_SUCCESS"
      });
    }
  } catch (err) {
    yield put({ type: "RESET_PASSWORD_FAILURE", err });
  }
}

export default function* rootSaga() {
  yield all([
    yield takeEvery("RECOVER_PASSWORD_REQUEST", recoverPasswordSaga),
    yield takeEvery("RESET_PASSWORD_REQUEST", resetPasswordSaga)
  ]);
}
