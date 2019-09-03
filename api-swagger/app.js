"use strict";

var SwaggerExpress = require("swagger-express-mw");
const express = require("express");
const app = express();
require("dotenv").config({ path: "../.env" });
const logger = require("morgan");
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

const firebaseConfig = {
  apiKey: "AIzaSyBO4CiYBH2ktxx0o-UXVAnC36YQtGUAzOY",
  authDomain: "musicroom-c656a.firebaseapp.com",
  databaseURL: "https://musicroom-c656a.firebaseio.com",
  projectId: "musicroom-c656a",
  storageBucket: "musicroom-c656a.appspot.com",
  messagingSenderId: "1004678495915"
};

firebase.initializeApp(firebaseConfig);
const database = firebase.database();
module.exports = app; // for testing

const swaggerUi = require("swagger-ui-express");
const YAML = require("yamljs");
const swaggerDocument = YAML.load("./api/swagger/swagger.yaml");

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use((_, res, next) => {
  res.database = database;
  res.mail = sendmail;
  return next();
});

var config = {
  appRoot: __dirname // required config
};

SwaggerExpress.create(config, function(err, swaggerExpress) {
  if (err) {
    throw err;
  }

  // install middleware
  swaggerExpress.register(app);

  var port = 3001;

  app.listen(port, () => {
    console.log(`-------------------------------`);
    console.log(`| API listening on port ${port}! |`);
    console.log(`-------------------------------`);
  });
});

const http = require("http");
const server = http.createServer(app);
const io = require("socket.io")(server);

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
