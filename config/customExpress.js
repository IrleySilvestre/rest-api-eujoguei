const express = require("express");
const cors = require("cors");

const consign = require("consign");

var corsOptions = {
    origin: "*",
    optionsSuccessStatus: 200,
    methods: ["GET", "POST", "DELETE", "UPDATE", "PUT", "PATCH"],
};

module.exports = () => {
    const app = express();

    // app.use((req, res, next) => {
    //   res.header("Access-Control-Allow-Origin", "*");
    //   res.header(
    //     "Access-Control-Allow-Methods",
    //     "GET,POS,DELETE,UPDATE,PUT,PATCH"
    //   );
    //   res.header("Access-Control-Allow-Headers", [
    //     "Content-Type",
    //     "Authorization",
    //   ]);

    //   next();
    // });
    app.use(cors(corsOptions));

    app.use(express.json());

    app.use(express.urlencoded({ extended: true }));

    consign().include("routes").into(app);

    app.get("/", (req, res) => {
        res.json({ message: "Welcome to eujoguei" });
    });

    return app;
};