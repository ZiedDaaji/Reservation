const mongoose = require("mongoose")

const ReservationSchema = new mongoose.Schema({
    hotelName: {type: String},
    hotelLocation: {type: String},
    firstName: {type: String, required: [true, "name is required"]},
    lastName: {type: String, required: [true, "Location is required"]},
    civility: {type: String, required: [true, "Rate is required"]},
    phone: {type: String, required: [true, "price is required"]},
    email: {type: String, required: [true, "Number of rooms is required"]},
    nights: {type: Number},
    badroom: {type: Number},
    adults: {type: Number},
    children: {type: Number},
    enfant: {type: Number},
    checkIn: {type: String},
    checkOut: {type: String},
    img: {type: String},
    total: {type: Number}
    }, {timestamps: true});


    const Reservation = mongoose.model("Reservation", ReservationSchema);
    module.exports = Reservation;