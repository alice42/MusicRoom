import { call, put, takeEvery, all, select } from "redux-saga/effects";
import { updateMethod } from "../services/apiService";

function* updateAppSaga(action) {
  const { newValue, toChange } = action;
  const user = yield select(state => state.update);
  console.log("*******USER***", user);
  const token = user.token;

  try {
    const payload = {
      token,
      toChange,
      newValue
    };
    console.log("****PAYLOAD", payload);
    const response = yield call(updateMethod, payload);
    console.log("******USER SAGA******", user);

    console.log("RESPONSE STATUS CODE", response);
    if (response.error) {
      yield put({ type: "UPDATE_FAILURE", err: response.error, user });
    } else {
      yield put({
        type: "UPDATE_SUCCESS",
        user: { ...user, user: { ...user.user, [toChange]: newValue } }
      });
    }
  } catch (err) {
    yield put({ type: "UPDATE_FAILURE", err: err.message });
  }
}

export default function* rootSaga() {
  yield all([yield takeEvery("UPDATE_REQUEST", updateAppSaga)]);
}
