const express = require("express");
const logger = require("morgan");
const http = require("http");

const indexRoute = require("./routes/index");
const apiRoutes = require("./routes/api");

const app = express();
const port = "3001";

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/", indexRoute);
app.use("/api", apiRoutes);
app.set("port", port);

const server = http.createServer(app);

server.listen(port);
