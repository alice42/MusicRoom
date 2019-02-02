import { call, put, takeEvery, all } from "redux-saga/effects";
import { loginGoogle } from "../services/apiService";
import { getTokenGoogle } from "../services/googleService";

function* loginGoogleSaga(action) {
  try {
    const googleInformation = yield call(getTokenGoogle);
    const response = yield call(loginGoogle, googleInformation);
    if (response.error) {
      yield put({ type: "LOGIN_FAILURE", err: response.error });
    } else {
      yield put({
        type: "LOGIN_SUCCESS",
        response: {
          email: googleInformation.user.email,
          sessionId: response.sessionId
        }
      });
    }
  } catch (err) {
    yield put({ type: "LOGIN_FAILURE", err });
  }
}

export default function* rootSaga() {
  yield all([yield takeEvery("LOGIN_GOOGLE_REQUEST", loginGoogleSaga)]);
}
