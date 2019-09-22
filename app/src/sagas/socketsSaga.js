import io from "socket.io-client";
import { call, put, take, takeEvery, all } from "redux-saga/effects";
import { eventChannel } from "redux-saga";
import Config from "react-native-config";

const apiUrl = Config.API_URL;
let socket;

// wrapping function for socket.on
const connect = token => {
  socket = io(apiUrl, {
    query: `token=${token}`
  });
  return new Promise(resolve => {
    socket.on("connect", () => {
      resolve(socket);
    });
  });
};

// This is how a channel is created
const createSocketChannel = socket =>
  eventChannel(emit => {
    const handler = data => {
      emit(data);
    };
    socket.on("SERVICE_MPE_GET_PLAYLISTS_REQUEST_SUCCESS", handler);
    socket.on("GET_PLAYLIST", handler);
    socket.on("UPDATED_PLAYLIST_MPE", handler);
    return () => {
      socket.off("SERVICE_MPE_GET_PLAYLISTS_REQUEST_SUCCESS", handler);
      socket.off("GET_PLAYLIST", handler);
      socket.off("UPDATED_PLAYLIST_MPE", handler);
    };
  });

// saga that listens to the socket and puts the new data into the reducer
function* socketConnection(action) {
  const token = action.response.sessionId;

  //   // connect to the server
  const socket = yield call(connect, token);

  // then create a socket channel
  const socketChannel = yield call(createSocketChannel, socket);

  // then put the new data into the reducer
  while (true) {
    const payload = yield take(socketChannel);
    yield put({ type: payload.type, response: payload.data });
  }
}

export default function* rootSaga() {
  yield all(
    [yield takeEvery("LOGIN_SUCCESS", socketConnection)],
    [yield takeEvery("LOGIN_SUCCESS_FACEBOOK", socketConnection)],
    [yield takeEvery("LOGIN_SUCCESS_GOOGLE", socketConnection)]
  );
}
