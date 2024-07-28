const mongoose = require("mongoose")

const ReservationSchema = new mongoose.Schema({
    hotelName: {type: String},
    firstName: {type: String, required: [true, "name is required"]},
    LastName: {type: String, required: [true, "Location is required"]},
    civility: {type: String, required: [true, "Rate is required"]},
    phone: {type: String, required: [true, "price is required"]},
    email: {type: String, required: [true, "Number of rooms is required"]},
    nights: {type: Number},
    badroom: {type: Number},
    checkIn: {type: Date},
    checkOut: {type: Date},
    total: {type: Number}
    }, {timestamps: true});


    const Reservation = mongoose.model("Reservation", ReservationSchema);
    module.exports = Reservation;