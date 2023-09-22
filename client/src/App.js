import axios from "axios";
import { useState } from "react";
import { Routes, Route, useNavigate } from 'react-router-dom';
// Components
import LoginAdmin from "./components/admin/loginAdmin";
import ClientReg from "./components/client/clientReg";
import LoginUser from "./components/user/loginUser";
import StoreReg from "./components/store/storeReg";
import StoreHome from "./components/store/storeHome";
import ClientHome from "./components/client/clientHome";
import StoreDetail from "./components/client/storeDetail";
import AppointSubmit from "./components/client/appointSubmit";
import ReqDetail from "./components/reqDetail";
import HistoryOrder from "./components/historyOrder";
import AdminHome from "./components/admin/adminHome";
// CSS
import './css/admin/loginAdmin.css';
import './css/user/loginUser.css';
import './css/client/clientReg.css';
import './css/store/storeReg.css';
import './css/client/clientHome.css';
import './css/store/storeHome.css';
import './css/store/storeHeader.css';
import './css/client/storeDetail.css';
import './css/client/appointSubmit.css';
import './css/reqDetail.css';
import './css/navBar.css';
import './css/historyOrder.css';
import './css/admin/adminHome.css';
import './css/admin/accPopup.css';



function App() {

  // const variables declaration
  const urlhead = "http://localhost:5000";
  const navigate = useNavigate();
  const [account, setAccount] = useState({});

  // LOGIN (for admin, client, and stores)
  const handleLogin = async (email="", pwd="", typeLogin="client") => {
    // verify if user input the email
    if (email === "") {
      alert("Please input an account email for login.");
      return;
    }

    // login
    const url = `${urlhead}/${typeLogin}/${email.toLowerCase()}`;
    await axios
      .get(url)
      .then((res) => {
        // verify if account exists
        if (res.data.length === 0) alert("Sorry no such account.");
        else {
          // verify if password match with database
          if (res.data[0].password !== pwd) alert("Password incorrect. Please re-enter.");
          else {
            setAccount(res.data[0]);

            // password correct, figure out which page to go based on login type
            if (typeLogin === 'admin') navigate('/admin/home');
            else if (typeLogin === 'store') navigate('/storeHome')
            else navigate('/clientHome');
          }
        }
      })
  }
  // SIGNUP for users
  const handleSignup = (type='client', new_obj, user) => {
    if (type === 'client') {
      // save client profile
      const url_client = urlhead + '/client';
      const newclient = {
        email: new_obj.email.toLowerCase(),
        password: new_obj.pwd,
        name: new_obj.name,
        phoneNumber: new_obj.phoneNum,
        surName: new_obj.surname
      }
      axios.post(url_client, newclient);

      // save cars
      const url_car = urlhead + '/car';
      var newcar;
      new_obj.cars.forEach(c => {
        newcar = {
          ownerEmail: new_obj.email.toLowerCase(),
          make: c.make,
          model: c.model,
          year: c.year,
          mileage: c.mileage,
          transmission: c.transmission,
          drivetrain: c.drivetrain
        };
        axios.post(url_car, newcar);
      });
    }
    else {
      // store
      const url_store = urlhead + '/store';
      const newstore = {
        name: new_obj.name,
        email: new_obj.email.toLowerCase(),
        password: new_obj.pwd,
        phoneNumber: new_obj.phoneNum,
        supName: new_obj.supName,
        address: new_obj.address,
        city: new_obj.city,
        province: new_obj.province,
        postalCode: new_obj.postal,
        description: new_obj.desc,
        facebook: new_obj.facebook,
        instagram: new_obj.ins,
        service: new_obj.service,
        defaultQuota: new_obj.quota,
        imgurl: new_obj.pic
      }
      axios.post(url_store, newstore);

      // save availabilities
      const url_ava = urlhead + '/ava';
      const newAva = {
        ownerEmail: new_obj.email.toLowerCase(),
        totalQuota: new_obj.quota
      }
      axios.post(url_ava, newAva);
    }

    // navigate back to login page
    if (user === "admin") navigate('/admin/home');
    else navigate('/');
  }
  
  return (
    <div className="App">
      <Routes>
        {/* admin routes */}
        <Route path="/admin" element={
          <LoginAdmin loginFunction={handleLogin} />
        } />
        <Route path="/admin/home" element={
          <AdminHome url_head={urlhead} />
        } />
        <Route path="/admin/home/addClient" element={
          <ClientReg signupFunction={handleSignup} user="admin" />
        } />
        <Route path="/admin/home/addStore" element={
          <StoreReg signupFunction={handleSignup} user="admin" />
        } />

        {/* user routes */}
        <Route path="/" element={
          <LoginUser loginFunction={handleLogin} />
        } />

        {/* client routes */}
        <Route path="/clientReg" element={
          <ClientReg signupFunction={handleSignup} user="client" />
        } />
        <Route path="/clientHome" element={
          <ClientHome acc={account} url_head={urlhead} />
        } />
        <Route path="/storeDetail" element={
          <StoreDetail url_head={urlhead} />
        } />
        <Route path="/clientReservation" element={
          <AppointSubmit accdata={account} url_head={urlhead} />
        } />
        <Route path="/appointments" element={
          <ReqDetail acc={account} url_head={urlhead} user="client" cancel_desc="Yes" />
        } />
        <Route path="/client/history" element={
          <HistoryOrder acc={account} url_head={urlhead} user="client" />
        } />

        {/* store routes */}
        <Route path="/storeReg" element={
          <StoreReg signupFunction={handleSignup} user="store" />
        } />
        <Route path="/storeHome" element={
          <StoreHome store_info={account} url_head={urlhead} />
        } />
        <Route path="/requests" element={
          <ReqDetail acc={account} url_head={urlhead} user="store" cancel_desc="Yes" />
        } />
        <Route path="/store/history" element={
          <HistoryOrder acc={account} url_head={urlhead} user="store" />
        } />
        <Route path="/store/orders" element={
          <ReqDetail acc={account} url_head={urlhead} user="time" />
        } />
      </Routes>
    </div>
  );
}

export default App;
