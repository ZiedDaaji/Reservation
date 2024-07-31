import './App.css';
import {Route, Routes} from 'react-router-dom';
import Register from './component/Register';
import Login from "./component/Login";
import AboutUs from "./component/AboutUs";
import Home from "./component/Home";
import EditProfile from "./component/EditProfile.";
import HomePage from "./component/HomePage";
import BookingForm from "./component/BookingForm";
import Confirmation from "./component/Confirmation";
import EditBooking from "./component/EditBooking";
import Dashbord from "./component/Dashbord";


function App() {
  return (
    <div className="App">
      <Routes>
      <Route path='/' element={<Home/>} />
            <Route path='/register' element={<Register/>} />
            <Route path='/login' element={<Login/>} />
            <Route path='/homePage/Profile' element={<EditProfile/>} />
            <Route path='/homePage' element={<HomePage/>}></Route>
            <Route path='/homePage/:hotelId/Reservation' element={<BookingForm/>} />
            <Route path=':HotelId/reservation/confirmation/done' element={<Confirmation/>} />
            <Route path='/editBooking/:hotelId' element={<EditBooking/>} />
            <Route path='/dashbord' element={<Dashbord />} />
            <Route path='/aboutUs' element={<AboutUs/>} />
      </Routes>
    </div>
  );
}

export default App;
