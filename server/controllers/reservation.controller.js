const Reservation = require("../models/reservation.model")


module.exports.creatReservation = (req, res) => {
    Reservation.create(req.body)
    .then((newReservation) => {
        res.status(200).json(newReservation)})
    .catch((err) => res.status(400).json(err)
    )}

module.exports.findAllReservations = (req, res) => {
    Reservation.find()
        .then((allReservations) => {
            res.json(allReservations)})
        .catch((err) => console.log(err))
        }

module.exports.getOneReservation = (req, res) => {
    Reservation.findOne({_id: req.params.id})
    .then((oneReservation) => {
        res.json(oneReservation)})
    .catch((err) => console.log(err))
}

module.exports.deleteReservation = (req, res) => {
    Reservation.deleteOne({_id: req.params.id})
    .then(result => {
        res.json(result)})
    .catch((err) => console.log(err))
        }

module.exports.updateReservation = (req, res) => {
    Reservation.findOneAndUpdate({ _id: req.params.id }, req.body, {
        new: true,
        runValidators: true,
    })
        .then((updatedReservation) => {
        res.json(updatedReservation);
        })
        .catch((err) => res.status(400).json(err));
    };

