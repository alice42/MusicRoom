"use strict";
require("dotenv").config({ path: "../.env" });

const express = require("express");
const app = express();
const SwaggerExpress = require("swagger-express-mw");

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
const swaggerUi = require("swagger-ui-express");
const YAML = require("yamljs");

// https://firebase.google.com/docs/database/web/read-and-write?authuser=0
// https://console.firebase.google.com/project/musicroom-c656a/database/musicroom-c656a/data/

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTHDOMAIN,
  databaseURL: process.env.FIREBASE_DATABASE_URL,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID
};

const swaggerConfig = {
  appRoot: __dirname
};

SwaggerExpress.create(swaggerConfig, (err, swaggerExpress) => {
  if (err) {
    throw err;
  }

  firebase.initializeApp(firebaseConfig);
  const database = firebase.database();
  io.on("connection", onConnection(database));

  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));

  const swaggerDocument = YAML.load("./api/swagger/swagger.yaml");
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

  app.use((_, res, next) => {
    res.database = database;
    res.mail = sendmail;
    next();
  });

  app.use(logger("dev"));

  swaggerExpress.register(app);

  app.use((err, req, res, next) => {
    try {
      const { code, message, path } = err.results.errors[0];
      const error = `${code} for "${path.join("->")}": ${message}`;
      res.status(500).json({ error });
    } catch (_) {
      res.status(500).json({ error: err.message });
    }
  });

  var port = 3001;

  app.listen(port, () => {
    console.log(`-------------------------------`);
    console.log(`| API listening on port ${port}! |`);
    console.log(`-------------------------------`);
  });
});

// WEB SOCKET

const http = require("http");
const server = http.createServer(app);
const io = require("socket.io")(server);
const { getSessions } = require("./helpers/firebaseSession.helpers");
const { findKey } = require("lodash");

const onConnection = db => async socket => {
  const date = new Date().getTime();
  const { token } = socket.handshake.query;
  console.log("SOKETIO, a user connected");
  const sessions = await getSessions(db);

  const id = findKey(sessions, sessionToken => sessionToken === token);
  if (id) {
    console.log("New user connected", id);
    db.ref("playlists").on("child_removed", () => {
      socket.emit("GET_PLAYLIST", {
        type: "GET_PLAYLIST",
        data: {}
      });
    });

    db.ref("playlists").on("child_added", snapshot => {
      if (snapshot.val().createdAt > date) {
        socket.emit("GET_PLAYLIST", {
          type: "GET_PLAYLIST",
          data: {}
        });
      }
    });

    db.ref("playlists").on("child_changed", snapshot => {
      socket.emit("UPDATED_PLAYLIST", {
        type: "UPDATED_PLAYLIST",
        data: { id: snapshot.val()._id }
      });
    });
  } else {
    console.log("New user connected not recognized");
  }
};
