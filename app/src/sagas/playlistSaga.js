import { call, put, takeEvery, all, select } from "redux-saga/effects";
import { getTrack } from "../services/apiService";

function* trackRequestSaga(action) {
  const { track } = action;
  try {
    const response = yield call(getTrack, track);
    console.log("*********REPONSE API*****************", response);
  } catch (err) {
    console.log(err.message);
  }
}

export default function* rootSaga() {
  yield all([yield takeEvery("TRACK_REQUEST", trackRequestSaga)]);
}
