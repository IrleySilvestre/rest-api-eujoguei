const express = require("express");
const cors = require("cors");

const consign = require("consign");

module.exports = () => {
  const app = express();

  const corsOptions = {
    origin: "*",
    methods: ["GET", "PUT", "POST", "PATCH", "DELETE"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "Access",
      "Origin",
      "X-Requested-with",
    ],
    credentials: true,
    optionsSuccessStatus: 204,
  };

  app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", [
      "GET",
      "POST",
      "DELETE",
      "UPDATE",
      "PUT",
      "PATCH",
    ]);
    res.header("Access-Control-Allow-Headers", [
      "Content-Type",
      "Authorization",
      "Access",
      "Origin",
      "X-Requested-with",
    ]);
    res.header("Access-Control-Allow-Credentials", true);

    next();
  });
  app.use(cors());

  app.use(express.json());

  app.use(express.urlencoded({ extended: true }));

  consign().include("routes").into(app);

  app.get("/", (req, res) => {
    res.json({ message: "Welcome to eujoguei" });
  });

  return app;
};
