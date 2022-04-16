const express = require("express");
const cors = require("cors");

const consign = require("consign");

var corsOptions = {
  origin: "http://localhost:8081",
};

module.exports = () => {
  const app = express();

  app.use(cors(corsOptions));

  app.use(express.json());

  app.use(express.urlencoded({ extended: true }));

  consign().include("routes").into(app);

  app.get("/", (req, res) => {
    res.json({ message: "Welcome to eujoguei" });
  });

  return app;
};
