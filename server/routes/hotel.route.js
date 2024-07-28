const hotelController = require ("../controllers/hotel.controller");


module.exports = (app) => {
    app.post("/api/Hotels", hotelController.creatHotel);
    app.get("/api/Hotels", hotelController.findAllHotels);  
    app.delete("/api/Hotels/:id", hotelController.deleteHotel);
    app.patch("/api/Hotels/:id", hotelController.updateHotel);
    app.get("/api/Hotels/:id", hotelController.getOneHotel);
    
    
}



