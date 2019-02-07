import { call, put, takeEvery, all } from "redux-saga/effects";
import { fetchCameraRoll } from "../services/apiService";

function* cameraRollSaga(action) {
  try {
  } catch (err) {}
}

export default function* rootSaga() {
  yield all([yield takeEvery("FETCH_CAMERA_ROLL", cameraRollSaga)]);
}
