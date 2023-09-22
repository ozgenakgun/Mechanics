import NavBar from './navBar';
import Header from './header';
import Requests from './requests';
import axios from "axios";
import React, { useState, useEffect } from 'react';
import moment from 'moment';
import StorePopup from './store/storePopup';

const HistoryOrder = ({ acc, url_head, user }) => {
    const [reqData, setReqData] = useState([]);
    const [displayData, setDisplayData] = useState([]);
    const [dayStart, setDayStart] = useState("");
    const [dayEnd, setDayEnd] = useState("");
    const [email, setEmail] = useState("");
    const [popup, setPopup] = useState(false);

    useEffect(() => {
        if (user === "store") {
            const url = `${url_head}/appoint/store/${acc.email}`;
            axios
            .get(url)
            .then(res => {
                setReqData(res.data);
                setDisplayData(res.data);
            })
        }
        else {
            const url = `${url_head}/appoint/client/${acc.email}`;
            axios
            .get(url)
            .then(res => {
                setReqData(res.data);
                setDisplayData(res.data);
            })
        }
    }, [acc.email, url_head, user])
    
    const handleSearch = (event) => {
        event.preventDefault();

        let display = reqData;
        if (display.length === 0) return;

        if (dayStart!=="")
            display = display.filter(x => moment(x.day, "YYYY-M-D") >= moment(dayStart, "YYYY-M-D"));
        
        if (dayEnd!=="")
            display = display.filter(x => moment(x.day, "YYYY-M-D") <= moment(dayEnd, "YYYY-M-D"));

        if (email!=="") {
            if (user==="store") display = display.filter(x => x.clientEmail.toLowerCase() === email.toLowerCase());
            else display = display.filter(x => x.storeEmail.toLowerCase() === email.toLowerCase());
        }

        setDisplayData(display);
    }

    const handleClear = () => {
        setDayStart("");
        setDayEnd("");
        setEmail("");
        setDisplayData(reqData);
    }


    return ( <>

    <Header title={user==="store"?acc.name:"Mechanics"} img={user==="store"?acc.imgurl:""} />
    <NavBar navtype={user} />

    <div className="appointment_store_wrapper">

        <div className="appointment_store_left">
            <form onSubmit={handleSearch}>
                <div>
                    <label htmlFor="appo_store_DS">Day Start</label> 
                    <input type="text" value={dayStart} onChange={(e) => setDayStart(e.target.value)} />
                </div>
                <div>
                    <label htmlFor="appo_store_DE">Day End</label> 
                    <input type="text" value={dayEnd} onChange={(e) => setDayEnd(e.target.value)} />
                </div>
                <div>
                    <label htmlFor="appo_store_DE">{user==="store"?"Client Email":"Store Email"}</label> 
                    <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                
                <div className="appointment_store_analysis_btn">
                    <input type="submit" value="Search" />
                </div>
            </form>
            <div className="appointment_store_analysis_btn">
                <input type="button" value="Clear" onClick={() => handleClear()} />
            </div>
            <br />
            { user === "store"?
            <div className="appointment_store_analysis_btn">
                <input type="button" value="Analysis" onClick={() => setPopup(true)} />
                <StorePopup 
                    trigger={popup} 
                    closePopup={() => setPopup(false)}
                    urlhead = {url_head}
                    email = {acc.email}
                    />
            </div> : null }
            
        </div>

        <div className="appointment_store_right">
            <div className="appointment_store_client_info">

            {displayData.length === 0? null
            :
            displayData.sort((x1, x2) => {
                let x1time = moment(`${x1.day}:${x1.timeSlot}`, "YYYY-M-D:H");
                let x2time = moment(`${x2.day}:${x2.timeSlot}`, "YYYY-M-D:H");
                if (x1time >= x2time) return 1;
                else return -1;
            }).map((x,i) => <Requests key={i} data={x} type={user} />)}

            </div>

        </div>
    </div>

    </> );
}
 
export default HistoryOrder;