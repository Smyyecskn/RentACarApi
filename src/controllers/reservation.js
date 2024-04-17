"use strict";
/* -------------------------------------------------------
    NODEJS EXPRESS | CLARUSWAY FullStack Team
------------------------------------------------------- */
// Reservation Controller:

const Reservation = require("../models/reservation");

module.exports = {
  list: async (req, res) => {
    /*
            #swagger.tags = ["Reservations"]
            #swagger.summary = "List Reservations"
            #swagger.description = `
                You can send query with endpoint for search[], sort[], page and limit.
                <ul> Examples:
                    <li>URL/?<b>search[field1]=value1&search[field2]=value2</b></li>
                    <li>URL/?<b>sort[field1]=1&sort[field2]=-1</b></li>
                    <li>URL/?<b>page=2&limit=1</b></li>
                </ul>
            `
        */
    const data = await res.getModelList(Reservation, {}, ["userId", "carId"]);

    res.status(200).send({
      error: false,
      details: await res.getModelListDetails(Reservation),
      data,
    });
  },
  create: async (req, res) => {
    /*
            #swagger.tags = ["Reservations"]
            #swagger.summary = "Create Reservation"
           
    */
    /* EĞER login olan kullanıcı admin değilse post işleminde yetkileri false  
        req.body.isStaff=false
        req.body.isAdmin=false
        */

    //!AYNI TARİHTE AYNI ARAÇ KİRALANAMAZ.
    const { carId, startDate, endDate } = req.body; //

    const sameReservation = await Reservation.findOne({
      carId: carId,
      $or: [{ startDate: { $lte: endDate }, endDate: { $gte: startDate } }],
    });

    if (sameReservation) {
      return res.status(409).send({
        error: true,
        message:
          " Bu tarihlerde aracımız rezervasyonludur. Farklı araçlardan birini seçebilirsiniz! ",
      });
    }

    const data = await Reservation.create(req.body);

    res.status(201).send({
      error: false,
      data,
      user: req.user,
    });
  },

  read: async (req, res) => {
    /*
            #swagger.tags = ["Reservations"]
            #swagger.summary = "Get Single Reservation"
        */

    const data = await Reservation.findOne({ _id: req.params.id }).populate(
      "userId",
      "carId"
    );

    res.status(200).send({
      error: false,
      data,
    });
  },

  update: async (req, res) => {
    /*
            #swagger.tags = ["Reservations"]
            #swagger.summary = "Update Reservation"
            
        */

    res.status(202).send({
      error: false,
      data,
      new: await Reservation.findOne({ _id: req.params.id }),
    });
  },

  delete: async (req, res) => {
    /*
            #swagger.tags = ["Reservations"]
            #swagger.summary = "Delete Reservation"
        */

    const data = await Reservation.deleteOne({ _id: req.params.id });

    res.status(data.deletedCount ? 204 : 404).send({
      error: !data.deletedCount,
      data,
    });
  },
};
