"use strict";
/* -------------------------------------------------------
    NODEJS EXPRESS | CLARUSWAY FullStack Team
------------------------------------------------------- */
const { mongoose } = require("../configs/dbConnection");
/* ------------------------------------------------------- *
{
    "userId": "65343222b67e9681f937f001",
    "carId": "65352f518a9ea121b1ca5001",
    "startDate": "2023-10-10",
    "endDate": "2023-10-16"
}
{
    "userId": "65343222b67e9681f937f002",
    "carId": "65352f518a9ea121b1ca5002",
    "startDate": "2023-10-14",
    "endDate": "2023-10-20"
}
/* ------------------------------------------------------- */

const ReservationSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    carId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Car",
    },
    startDate: {
      type: Date,
      trim: true,
      required: true,
    },
    endDate: {
      type: Date,
      trim: true,
      required: true,
      validate: {
        validator: function (endDate) {
          return endDate > this.startDate;
        },
        message: (props) =>
          "Rezervasyonun bitiş tarih,rezervasyon başlangıç tarihinden sonra olmalıdır.!",
      },
    },
  },
  { collection: "reservations", timestamps: true }
);

// Reservation Model:

module.exports = mongoose.model("Reservation", ReservationSchema);
