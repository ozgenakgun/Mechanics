import Header from '../header';
import React, { useState, useEffect } from 'react';
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

const AppointSubmit = ({accdata, url_head}) => {
    const { state } = useLocation();
    const [cardata, setCarData] = useState([]);
    const navigate = useNavigate();

    // client info part
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [userChoice, setUserChoice] = useState("Auto Fill by User Profile");

    // car info part
    const [make, setMake] = useState('');
    const [model, setModel] = useState('');
    const [year, setYear] = useState(0);
    const [mileage, setMileage] = useState(0);
    const [transmission, setTrans] = useState('');
    const [drivetrain, setDT] = useState('');
    const [category, setCategory] = useState('');
    const [desc, setDesc] = useState('');
    const [carSelect, setCarSelect] = useState('');

    // read car information
    useEffect(() => {
        const url = `${url_head}/car/${accdata.email}`;
        axios
        .get(url)
        .then(res => {
            setCarData(res.data);
        })
    }, [])

    // auto-fill customer informaiton
    function autoFillClient() {
        if (userChoice === "Auto Fill by User Profile") {
            setName(accdata.name);
            setPhone(accdata.phoneNumber);
            setEmail(accdata.email);
            setUserChoice("Cancel Auto-Filling");
        }
        else {
            setName("");
            setPhone('');
            setEmail('');
            setUserChoice("Auto Fill by User Profile");
        }
    }
    function getCarOptions() {
        if (cardata.length === 0) 
            return <option value="">No car in profile, please input manually</option>
        else
            return cardata.map((car, i) => <option key={i} value={i}>
                {`Car ${i+1}: ${car.make}-${car.model}`}
            </option>)
    }
    function autoFillCar(index) {
        if (index === "") {
            setMake('');
            setModel('');
            setYear(0);
            setMileage(0);
            setTrans('');
            setDT('');
        }
        else {
            const car = cardata[index];
            setMake(car.make);
            setModel(car.model);
            setYear(car.year);
            setMileage(car.mileage);
            setTrans(car.transmission);
            setDT(car.drivetrain);
        }
    }

    // submit the form
    const submitAppoint = async(event) => {
        event.preventDefault();

        // validation - client info
        if (name === '' || name === null || name === undefined) {
            alert("Please provide your name for appointment booking");
            return;
        }
        if (phone === '' || phone === null || phone === undefined) {
            alert("Please provide your phone number for appointment booking");
            return;
        }
        if (email === '' || email === null || email === undefined) {
            alert("Please provide your email for appointment booking");
            return;
        }
        
        // validation - car info
        if (make === '' || make === null || make === undefined) {
            alert("Please provide car make for appointment booking");
            return;
        }

        // validation - category selection
        if (category === '' || category === null || category === undefined) {
            alert("Please select a service category for appointment booking");
            return;
        }

        const url_appoint = url_head + '/appoint';
        const newApp = {
            clientEmail: accdata.email,
            storeEmail: state.storeInfo.email,
            clientName: accdata.name,
            storeName: state.storeInfo.name,
            clientPhoneNum: accdata.phoneNumber,
            day: state.timeInfo.date,
            timeSlot: state.timeInfo.timeSlot,
            carMake: make,
            carModel: model,
            carYear: year,
            carMileage: mileage,
            carTransmission: transmission,
            carDrivetrain: drivetrain,
            problemCate: category,
            problemDesc: desc,
            apptStatus: "Waiting Approval",
            cancelledByStore: null,
            cancelledByClient: null
        }
        await axios.post(url_appoint, newApp);

        // update ava database
        const url_ava = `${url_head}/ava/${state.storeInfo.email}/${state.timeInfo.date}/${state.timeInfo.timeSlot}`;
        const new_ava = {
            ownerEmail: state.timeInfo.ownerEmail,
            date: state.timeInfo.date,
            timeSlot: state.timeInfo.timeSlot,
            totalQuota: state.timeInfo.totalQuota,
            bookedQuota: state.timeInfo.bookedQuota + 1
        }
        await axios.put(url_ava, new_ava);

        // send a window confirm
        if (window.confirm("Appointment Submitted!\nPress OK to back to the home page.") === true) {
            navigate("/clientHome");
        }
    }

    return ( 
<div className="appo_submi_body">
    <Header title={"Appointment Booking"} />   
    <div className="appo_submi_wrapper">

        <div className="appo_submi_cust_info">
            <p className="appo_submi_p">Customer Information</p>

            <input className="appo_submi_auto_fill_btn" type="button" value={userChoice} onClick={() => autoFillClient()} />

            <div className="appo_submi_cust_info_input">
                <div className="appo_submi_cust_info_input_left">
                    <label htmlFor="appo_submi_cust_info_ipnut_left_name">Name:</label>
                    <input type="text" className="appo_submi_cust_info_ipnut_left_name" name="appo_submi_cust_info_ipnut_left_name"
                        value={name} onChange={(event) => setName(event.target.value)} />
                    <label htmlFor="appo_submi_cust_info_ipnut_left_phone">Phone Number:</label>
                    <input type="text" className="appo_submi_cust_info_ipnut_left_phone" name="appo_submi_cust_info_ipnut_left_phone"
                        value={phone} onChange={(event) => setPhone(event.target.value)}  />
                    <label htmlFor="appo_submi_cust_info_ipnut_left_email">Email:</label>
                    <input type="text" className="appo_submi_cust_info_ipnut_left_email" name="appo_submi_cust_info_ipnut_left_email"
                        value={email} onChange={(event) => setEmail(event.target.value)}  />
                </div>
                <div className="appo_submi_cust_info_input_right">
                    <label htmlFor="appo_submi_cust_info_ipnut_right_address">Appointment Date:</label>
                    <input type="text" className="appo_submi_cust_info_ipnut_right_address" name="appo_submi_cust_info_ipnut_right_address"
                        value={state.timeInfo.date} disabled />
                    <label htmlFor="appo_submi_cust_info_ipnut_right_city">Appointment Time:</label>
                    <input type="text" className="appo_submi_cust_info_ipnut_right_city" name="appo_submi_cust_info_ipnut_right_city"
                        value={`${state.timeInfo.timeSlot}:00 - ${state.timeInfo.timeSlot+1}:00`} disabled />
                </div>
            </div>       
        </div>
            
        <div className="appo_submi_car_info">
            <p className="appo_submi_p">Car Information</p>
            
            <div className="appo_submi_car_info_car_select">
                <label htmlFor="appo_submi_car_select">- Select Car by User Profile</label> 
                <select className="appo_submi_select_car" name="appo_submi_car_select"
                    value={carSelect} onChange={(event) => {
                        setCarSelect(event.target.value);
                        autoFillCar(event.target.value);
                    }}>
                    <option value="">---</option>
                    { getCarOptions() }
                </select>
                <div>- Or Manually input car information</div>
            </div>

            <div className="appo_submi_dropdown_input">
                
                <div className="appo_submi_dropdown_input_left">
                    <label htmlFor="appo_submi_make_select">Make</label> 
                    <select className="appo_submi_select_make" name="appo_submi_make_select"
                        value={make} onChange={(event) => setMake(event.target.value)} >
                        <option value="">---</option>
                        <option value="Toyota"> Toyota</option>
                        <option value="Audi"> Audi</option>
                        <option value="BMW"> BMW</option>
                        <option value="Mercedes"> Mercedes</option>
                        <option value="Kia"> Kia</option>
                        <option value="Others"> Others</option>
                    </select>
    
                    <label htmlFor="appo_submi_model_select">Model</label> 
                    <select className="appo_submi_select_model" name="appo_submi_model_select"
                        value={model} onChange={(event) => setModel(event.target.value)} >
                        <option value="">---</option>
                        <option value="Corolla"> Corolla</option>
                        <option value="Rav4"> Rav4</option>
                        <option value="4Runner"> 4Runner</option>
                        <option value="Auris"> Auris</option>
                        <option value="GR86"> GR86</option>
                        <option value="Others"> Others</option>
                    </select>
    
                    <label htmlFor="appo_submi_year_select">Year</label> 
                    <select className="appo_submi_select_year" name="appo_submi_year_select"
                        value={year} onChange={(event) => setYear(event.target.value)} >
                        <option value="">---</option>
                        {Array.from({ length: 34 }, (value, index) => index)
                            .map(x => <option key={`${1990+x}`} value={`${1990+x}`}>{1990+x}</option>)}
                    </select>
                </div>
                    
                <div className="appo_submi_dropdown_input_right">
                    <label htmlFor="appo_submi_milage_select">Mileage</label> 
                    <input className="appo_submi_select_milage" name="appo_submi_milage_select"
                        value={mileage} onChange={(event) => setMileage(event.target.value)} />
    
                    <label htmlFor="appo_submi_transmission_select">Transmission</label> 
                    <select className="appo_submi_select_transmission" name="appo_submi_transmission_select"
                        value={transmission} onChange={(event) => setTrans(event.target.value)} >
                        <option value="">---</option>
                        <option value="Auto">Auto</option> 
                        <option value="Manual">Manual</option>
                        <option value="Others">Others</option>
                    </select>
    
                    <label htmlFor="appo_submi_drive_select">Drivetrain</label> 
                    <select className="appo_submi_select_drive" name="appo_submi_drive_select"
                        value={drivetrain} onChange={(event) => setDT(event.target.value)} >
                        <option value="">---</option>
                        <option value="4x4">4x4</option> 
                        <option value="4x2">4x2</option> 
                        <option value="Others">Others</option> 
                    </select>
                </div>
    
            </div>
        </div>
            
        <div className="appo_submi_prob_desc">
            <p className="appo_submi_p">Problem Description</p>
            
            <div className="appo_submi_car_prob_desc_select">
                <label htmlFor="appo_submi_category_select">Service Category</label> 
                <select className="appo_submi_select_category" name="appo_submi_category_select" 
                    value={category} onChange={(event) => setCategory(event.target.value)} >
                    <option value="">---</option>
                    <option value="Oil Change">Oil Change</option>
                    <option value="Brake">Brake</option>
                    <option value="Batteries & Electrical">Batteries & Electrical</option>
                    <option value="Cooling System">Cooling System</option>
                    <option value="Exhaust System">Exhaust System</option>
                    <option value="Scheduled">Scheduled</option>
                    <option value="Maintenance">Maintenance</option>
                    <option value="3D Wheel Alignment">3D Wheel Alignment</option>
                    <option value="Tires">Tires</option>
                    <option value="Heating & A/C">Heating & A/C</option>
                    <option value="Used Car Inspection">Used Car Inspection</option>
                    <option value="Car Detailing">Car Detailing</option>
                    <option value="Others">Others</option>
                </select>
            </div>
            
            <div className="appo_submi_car_prob_desc_txt">
                <label htmlFor="appo_submi_prob_input">Description</label>
                <textarea className="appo_submi_prob_desc_box" type="text" name="appo_submi_prob_input" 
                    value={desc} onChange={(event) => setDesc(event.target.value)} />
            </div>


        </div>
        <div className="appo_submi_submit_btn">
            <input type="submit" value="Submit" onClick={(event) => submitAppoint(event)} />
        </div>

    </div>
</div> );
}
 
export default AppointSubmit;