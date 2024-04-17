"use strict";
/* -------------------------------------------------------
    NODEJS EXPRESS | CLARUSWAY FullStack Team
------------------------------------------------------- */
const router = require("express").Router();
const reservation = require("../controllers/reservation");
const permissions = require("../middlewares/permissions");

router
  .route("/")
  .get(permissions.isLogin, reservation.list)
  .post(permissions.isLogin, reservation.create);

router
  .route("/:id")
  .get(permissions.isLogin, reservation.read)
  .put(permissions.isStaffOrisAdmin, reservation.update)
  .patch(permissions.isStaffOrisAdmin, reservation.update)
  .delete(permissions.isStaffOrisAdmin, reservation.delete);
/* ------------------------------------------------------- */

module.exports = router;
