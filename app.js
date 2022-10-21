const express = require("express");
const morgan = require("morgan");
const router = require("./routes");
const cookieParser = require("cookie-parser");
const app = express();
const HTTP_PORT = 3000;

app.use(express.json()); // untuk membaca body tipe json

app.use(morgan("dev")); // untuk logging
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/api", router);

module.exports = app;
