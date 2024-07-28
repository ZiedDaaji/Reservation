const mongoose = require("mongoose")

const HotelSchema = new mongoose.Schema({

    name: {type: String, required: [true, "name is required"]},
    location: {type: String, required: [true, "Location is required"]},
    rate: {type: String, required: [true, "Rate is required"]},
    price: {type: Number, required: [true, "price is required"]},
    rooms: {type: Number, required: [true, "Number of rooms is required"]},
    photo: {type: String},
    photo2: {type: String},
    photo3: {type: String},
    reservation: {type: String}
    }, {timestamps: true});



    const Hotel = mongoose.model("Hotel", HotelSchema);
    module.exports = Hotel;