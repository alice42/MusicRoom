const express = require("express");
const logger = require("morgan");
const http = require("http");
const firebase = require("firebase");
const sendmail = require("sendmail")({
  logger: {
    debug: console.log,
    info: console.info,
    warn: console.warn,
    error: console.error
  },
  silent: true
});

// https://firebase.google.com/docs/database/web/read-and-write?authuser=0
// https://console.firebase.google.com/project/musicroom-c656a/database/musicroom-c656a/data/

const config = {
  apiKey: "AIzaSyBO4CiYBH2ktxx0o-UXVAnC36YQtGUAzOY",
  authDomain: "musicroom-c656a.firebaseapp.com",
  databaseURL: "https://musicroom-c656a.firebaseio.com",
  projectId: "musicroom-c656a",
  storageBucket: "musicroom-c656a.appspot.com",
  messagingSenderId: "1004678495915"
};

firebase.initializeApp(config);
const database = firebase.database();

const indexRoute = require("./routes/index");
const userRoutes = require("./routes/user");
const aliceRoutes = require("./routes/alice");
const mtvRoutes = require("./routes/musicTrackVote");
const mpeRoutes = require("./routes/musicPlaylistEditor");

const app = express();
const port = "3001";

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use((req, res, next) => {
  res.database = database;
  res.mail = sendmail;
  return next();
});

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/", indexRoute);
app.use("/api/user", userRoutes);
app.use("/api/mtv", mtvRoutes);
app.use("/api/mpe", mpeRoutes);
app.use("/api/alice", aliceRoutes);

app.set("port", port);
app.set("trust proxy", true);

const server = http.createServer(app);

const io = require("socket.io")(server);

const { getAllUsers } = require("./helpers/firebaseUsers.helpers");
const { getPlaylistAvailable } = require("./helpers/playlist.helpers");
const { getSessions } = require("./helpers/firebaseSession.helpers");

const { findKey } = require("lodash");

const onConnection = async socket => {
  const date = new Date().getTime();
  const { token } = socket.handshake.query;
  console.log("SOKETIO, a user connected");
  const sessions = await getSessions(database);

  const id = findKey(sessions, sessionToken => sessionToken === token);
  if (id) {
    console.log("New user connected", id);
    database.ref("playlists").on("child_removed", () => {
      socket.emit("GET_PLAYLIST", {
        type: "GET_PLAYLIST",
        data: {}
      });
    });

    database.ref("playlists").on("child_added", snapshot => {
      if (snapshot.val().createdAt > date) {
        socket.emit("GET_PLAYLIST", {
          type: "GET_PLAYLIST",
          data: {}
        });
      }
    });

    database.ref("playlists").on("child_changed", snapshot => {
      socket.emit("UPDATED_PLAYLIST", {
        type: "UPDATED_PLAYLIST",
        data: { id: snapshot.val()._id }
      });
    });
  } else {
    console.log("New user connected not recognized");
  }
};

io.on("connection", onConnection);
require("dotenv").config({ path: "../.env" });

server.listen(port, () => {
  console.log(`-------------------------------`);
  console.log(`| API listening on port ${port}! |`);
  console.log(`-------------------------------`);
  console.log(process.env.API_URL);
});

module.exports = {
  server
};
