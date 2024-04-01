"use strict";
/* -------------------------------------------------------
    NODEJS EXPRESS | CLARUSWAY FullStack Team
------------------------------------------------------- */
const router = require("express").Router();
const car = require("../controllers/car");

router.route("/").get(car.list).post(car.create);

router.route("/:id").put(car.update).patch(car.update).delete(car.delete);

module.exports = router;
