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
const firebaseRef = database.ref();

const indexRoute = require("./routes/index");
const userRoutes = require("./routes/user");
const deezerRoutes = require("./routes/deezer");
const aliceRoutes = require("./routes/alice");
const mtvRoutes = require("./routes/musicTrackVote");

const app = express();
const port = "3001";

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use((req, res, next) => {
  res.database = database;
  res.mail = sendmail;
  return next();
});

app.use(
  logger(
    "dev"
    //   function(tokens, req, res) {
    //   // console.log(res.output);
    //   return [
    //     tokens.method(req, res),
    //     tokens.url(req, res),
    //     tokens.status(req, res),
    //     // function (req, res) { return res.statusCode < 400 }
    //     tokens.res(req, res, "content-length"),
    //     "-",
    //     tokens["response-time"](req, res),
    //     "ms"
    //   ].join(" ");
    // })
  )
);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/", indexRoute);
app.use("/api/user", userRoutes);
app.use("/api/mtv", mtvRoutes);
app.use("/api/alice", aliceRoutes);
app.set("port", port);
app.set("trust proxy", true);

const server = http.createServer(app);
const io = require("socket.io")(server);

// io.sockets.emit("MESSAGE_TYPE", "everyone");

io.on("connection", function(socket) {
  console.log("SOKETIO, a user connected");
  io.emit("MESSAGE_TYPE", "connection seen");
  socket.broadcast.emit("new user connected");

  socket.on("disconnect", function() {
    console.log("SOKETIO, user disconnected");
  });
  socket.on("MESSAGE_TYPE", function(msg) {
    console.log("message: " + msg);
  });

  firebaseRef.on("value", function(snapshot) {
    var test = snapshot.val();

    // Print the data object's values
    console.log("TEST SOCKET: " + test);
    io.emit("TEST", {
      test
    });
  });
});

// io.on("connection", function(socket) {
//   console.log("Connected and ready!");

//   // firebase reference listens on value change,
//   // and return the data snapshot as an object
//   firebaseRef.on("value", function(snapshot) {
//     var test = snapshot.val();

//     // Print the data object's values
//     console.log("TEST SOCKET: " + test);
//     socket.broadcast.emit("TEST", {
//       test
//     });
//   });
// });

server.listen(port, () =>
  console.log(
    `-------------------------------\n| API listening on port ${port}! |\n-------------------------------`
  )
);
