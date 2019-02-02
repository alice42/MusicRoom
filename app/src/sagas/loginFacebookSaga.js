import { call, put, takeEvery, all } from "redux-saga/effects";
import { loginFacebook } from "../services/apiService";
import { getTokenFacebook } from "../services/facebookService";

function* loginAppSaga(action) {
  try {
    const facebookInformation = yield call(getTokenFacebook);
    const response = yield call(loginFacebook, facebookInformation);
    if (response.error) {
      yield put({ type: "LOGIN_FAILURE", err: response.error });
    } else {
      yield put({
        type: "LOGIN_SUCCESS",
        response: {
          email: facebookInformation.email,
          sessionId: response.sessionId
        }
      });
    }
  } catch (err) {
    yield put({ type: "LOGIN_FAILURE", err });
  }
}

export default function* rootSaga() {
  yield all([yield takeEvery("LOGIN_FACEBOOK_REQUEST", loginAppSaga)]);
}
