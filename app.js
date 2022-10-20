const express = require("express");
// require("dotenv").config();
// const indexRouter = require("./routes/index");
const morgan = require("morgan");
// const controller = require("./controllers");
const router = require("./routes");
// const path = require("path");
const cookieParser = require("cookie-parser");
const app = express();
const HTTP_PORT = 3000;

app.use(express.json()); // untuk membaca body tipe json

app.use(morgan("dev")); // untuk logging
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(express.static(path.join(__dirname, "public")));

// app.set("view engine", "ejs");

// app.get("/", (_req, res) => {
//   res.render("home");
// });

// app.get("/error", (_req, _res) => {
//   error; // mengembalikan error makanya langsung memanggil exception
// });

app.use("/api", router);

// handle
// app.use(controller.notFound);

// server-error
// app.use(controller.exception);

// app.listen(HTTP_PORT, () =>
//   console.info(`Listening on HTTP_PORT ${HTTP_PORT}`)
// );

module.exports = app;
