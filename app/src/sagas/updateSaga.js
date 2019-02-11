import { call, put, takeEvery, all } from "redux-saga/effects";

function* updateMethod({ user, newValue, toChange }) {
  const err = null;
  if (toChange === "username") {
    user.username = newValue;
  } else if (toChange === "email") {
    user.email = newValue;
  } else if (toChange === "avatarUri") {
    user.avatarUri = newValue;
  } else if (toChange === "tags") {
    user.tags = newValue;
  } else {
    err = "Something went wrong";
  }
  const reponse = {
    user,
    err
  };
  return response;
}

function* updateAppSaga(action) {
  const { newValue, user, toChange } = action;
  console.log(newValue);
  try {
    const payload = {
      toChange,
      newValue,
      user
    };
    const response = yield call(updateMethod, payload);
    console.log("RESPONSE STATUS CODE", response);
    if (response.error) {
      yield put({ type: "UPDATE_FAILURE", err: response.err });
    } else {
      yield put({ type: "UPDATE_SUCCESS", response: response.user });
    }
  } catch (err) {
    yield put({ type: "UPDATE_FAILURE", err: err });
  }
}

export default function* rootSaga() {
  yield all([yield takeEvery("UPDATE_REQUEST", updateAppSaga)]);
}
