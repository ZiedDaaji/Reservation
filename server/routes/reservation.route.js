const reservationController = require ("../controllers/reservation.controller");


module.exports = (app) => {
    app.post("/api/Reservations", reservationController.creatReservation);
    app.get("/api/Reservations", reservationController.findAllReservations);  
    app.delete("/api/Reservations/:id", reservationController.deleteReservation);
    app.patch("/api/Reservations/:id", reservationController.updateReservation);
    app.get("/api/Reservations/:id", reservationController.getOneReservation);
    
    
}





