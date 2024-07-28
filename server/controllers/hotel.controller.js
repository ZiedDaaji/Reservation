const CircularJSON = require('circular-json');
const Hotel = require("../models/hotel.model")
const Reservation = require("../models/hotel.model")
const mongoose = require('mongoose');
const Flatted = require('flatted');


module.exports.creatHotel = (req, res) => {
    Hotel.create(req.body)
    .then((newHotel) => {
        res.status(200).json(newHotel)})
    .catch((err) => res.status(400).json(err)
    )}

module.exports.findAllHotels = (req, res) => {
    Hotel.find()
        .then((allHotels) => {
            res.json(allHotels)})
        .catch((err) => console.log(err))
        }

module.exports.getOneHotel = (req, res) => {
    Hotel.findOne({_id: req.params.id})
    .then((oneHotel) => {
        res.json(oneHotel)})
    .catch((err) => console.log(err))
}

module.exports.deleteHotel = (req, res) => {
    Hotel.deleteOne({_id: req.params.id})
    .then(result => {
        res.json(result)})
    .catch((err) => console.log(err))
        }

module.exports.updateHotel = (req, res) => {
    Hotel.findOneAndUpdate({ _id: req.params.id }, req.body, {
        new: true,
        runValidators: true,
    })
        .then((updatedHotel) => {
        res.json(updatedHotel);
        })
        .catch((err) => res.status(400).json(err));
    };


    /*module.exports.updateHotelReservation = (req, res) => {const hotelId = req.params.id;
        const reservationData = req.body;
    
        try {
            // Vérifiez si l'ID de l'hôtel est valide
            if (!mongoose.Types.ObjectId.isValid(hotelId)) {
                return res.status(400).json({ message: 'ID d\'hôtel invalide' });
            }
    
            // Créez une nouvelle instance de réservation
            const newReservation = new Reservation(reservationData);
    
            // Recherchez l'hôtel et ajoutez la réservation
            const updatedHotel = Hotel.findByIdAndUpdate(
                hotelId, // ID de l'hôtel
                { $push: { reservation: newReservation } }, // Ajoute la nouvelle réservation
                { new: true, runValidators: true } // Retourner le document mis à jour
            ).lean();
    
            if (!updatedHotel) {
                return res.status(404).json({ message: 'Hôtel non trouvé' });
            }
    
            // Répondre avec l'hôtel mis à jour
            const serializedHotel = CircularJSON.stringify(updatedHotel);

            res.send(serializedHotel);
        } catch (error) {
            console.error('Erreur lors de l\'ajout de la réservation:', error.message);
            res.status(500).json({ message: 'Erreur interne du serveur', error: error.message });
        }
    };*/






        