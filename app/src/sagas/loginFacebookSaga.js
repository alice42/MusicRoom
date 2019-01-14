import { call, put, takeEvery, all } from "redux-saga/effects";
import { loginFacebookCall } from "../services/loginFacebook";

function* loginFacebookSaga(action) {
  try {
    const response = yield call(loginFacebookCall);
    if (!response.cancelled) {
      yield put({ type: "FACEBOOK_LOGIN_SUCCESS", response: response });
    }
  } catch (err) {
    yield put({ type: "FACEBOOK_LOGIN_FAILURE", err: err });
  }
}

export default function* rootSaga() {
  yield all([yield takeEvery("FACEBOOK_LOGIN_REQUEST", loginFacebookSaga)]);
}
