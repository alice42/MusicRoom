import { call, put, takeEvery, all } from "redux-saga/effects";
import { signInWithFacebookAsync } from "../services/facebook";

function* facebookLoginSaga(action) {
  try {
    console.log("4");
    const response = yield call(signInWithFacebookAsync);
    console.log("6", response);
    yield put({ type: "FACEBOOK_LOGIN_SUCCESS", response: response });
  } catch (err) {
    yield put({ type: "FACEBOOK_LOGIN_FAILURE", err: err });
  }
}

export default function* rootSaga() {
  yield all([yield takeEvery("FACEBOOK_LOGIN_REQUEST", facebookLoginSaga)]);
}
