const express = require("express");
require("dotenv").config();
const app = express();
const { Sequelize } = require("sequelize");
const router = require("./routes");
const morgan = require("morgan");
const controller = require("./controllers");

const { HTTP_PORT, DB_NAME, DB_USERNAME, DB_PASSWORD, DB_HOST, DB_DIALECT } =
  process.env;
const sequelize = new Sequelize(DB_NAME, DB_USERNAME, DB_PASSWORD, {
  host: DB_HOST,
  dialect: DB_DIALECT,
});

try {
  sequelize.authenticate();
  console.log("Connection has been established successfully.");

  app.use(express.json()); // untuk membaca body tipe json

  app.use(morgan("dev")); // untuk logging

  app.set("view engine", "ejs");

  app.get("/", (_req, res) => {
    res.render("home");
  });

  app.get("/error", (_req, _res) => {
    error; // mengembalikan error makanya langsung memanggil exception
  });

  app.use(router);

  app.use(controller.notFound);

  // server-error
  app.use(controller.exception);

  app.listen(HTTP_PORT, () =>
    console.info(`Listening on HTTP_PORT ${HTTP_PORT}`)
  );
} catch (error) {
  console.error("Unable to connect to the database:", error);
}
