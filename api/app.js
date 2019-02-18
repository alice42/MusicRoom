const express = require("express");
const logger = require("morgan");
const http = require("http");
const firebase = require("firebase");
const sendmail = require("sendmail")({
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
const deezerRoutes = require("./routes/deezer");

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
app.set("port", port);

const server = http.createServer(app);

server.listen(port);
