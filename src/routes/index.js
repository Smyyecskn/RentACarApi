"use strict";

const router = require("express").Router();

//auth
router.use("/auth", require("./auth"));
//users
router.use("/user", require("./user"));
//reservations
router.use("/reservation", require("./reservation"));
//cars
router.use("/car", require("./car"));
//token
router.use("/token", require("./token"));

module.exports = router;
