import { call, put, takeEvery, all } from "redux-saga/effects";
import { loginClassic } from "../services/apiService";

function* deezerSaga(action) {
  const { token } = action;
  console.log("TOKEN SAGA", token);
  //   try {

  //     const response = yield call(loginClassic, payload);
  //     if (response.error) {
  //       yield put({ type: "LOGIN_FAILURE", err: response.error });
  //     } else {
  //       yield put({
  //         type: "LOGIN_SUCCESS",
  //         response: { email, sessionId: response.sessionId }
  //       });
  //     }
  //   } catch (err) {
  //     yield put({ type: "LOGIN_FAILURE", err: err });
  //   }
}

export default function* rootSaga() {
  yield all([yield takeEvery("DEEZER_GET_TOKEN_SUCCESS", deezerSaga)]);
}
