import { call, put, takeEvery, all } from "redux-saga/effects";
import { recoverPassword } from "../services/apiService";

function* recoverPasswordSaga(action) {
  const { email } = action;
  try {
    const response = yield call(recoverPassword, email);
    yield put({
      type: "RECOVER_PASSWORD_EMAIL_SEND",
      emailSendMessage: response.message
    });
  } catch (err) {
    yield put({
      type: "RECOVER_PASSWORD_EMAIL_SEND",
      emailSendMessage: err
    });
  }
}

export default function* rootSaga() {
  yield all([yield takeEvery("RECOVER_PASSWORD_REQUEST", recoverPasswordSaga)]);
}
