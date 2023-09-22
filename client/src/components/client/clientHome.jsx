import React, { useState, useEffect } from 'react';
import axios from "axios";
import Header from '../header';
import ClientHomeStore from './clientHomeStore';
import NavBar from '../navBar';

const ClientHome = ({acc, url_head}) => {
    const [storedata, setStoreData] = useState([]);
    const [display, setDisplay] = useState([]);
    const [cityFilter, setCityFilter] = useState([]);
    const [serviceFilter, setServiceFilter] = useState([]);
    const [searchKey, setSearchKey] = useState("");

    // set page title
    useEffect(() => {
        document.title = "Mechanics - Client";  
    }, []);

    // read all store data
    useEffect(() => {
        const url = `${url_head}/store`;
        axios
          .get(url)
          .then((res) => {
            setStoreData(res.data);
            setDisplay(res.data);
          })
          .catch((err) => console.log("ERROR in reading data from collection: ", err));
    }, [url_head]);

    // check box onclick handler
    const filterDisplay = (value, type='city') => {
        let newCityFilter = cityFilter;
        let newServiceFilter = serviceFilter;
        if (type === 'city') {  // update city filter
            if (cityFilter.includes(value))
                newCityFilter = newCityFilter.filter(c => c!==value);
            else
                newCityFilter = [...newCityFilter, value];
            setCityFilter(newCityFilter);
        }
        else {
            if (serviceFilter.includes(value))
                newServiceFilter = newServiceFilter.filter(s => s!==value);
            else
                newServiceFilter = [...newServiceFilter, value];
            setServiceFilter(newServiceFilter);
        }

        // after all filter reset, start reset display data
        let newDisplay = storedata;
        if (newCityFilter.length !== 0) {
            let cityDisplay = []
            newCityFilter.forEach(c => {
                let thisFilter = newDisplay.filter(d => d.city.toLowerCase() === c.toLowerCase());
                cityDisplay = cityDisplay.concat(thisFilter);
            })
            newDisplay = cityDisplay;
        }
        if (newServiceFilter.length !== 0 && newDisplay.length !== 0) {
            newServiceFilter.forEach(s => {
                newDisplay = newDisplay.filter(d => d.service.includes(s));
                console.log(newDisplay);
            })
        }
        setDisplay(newDisplay);
    }

    const searchDisplay = () => {
        let newDisplay = storedata;
        if (searchKey.trim() !== "")
            newDisplay = storedata.filter(x => x.name.toLowerCase().includes(searchKey.trim().toLowerCase()));
        setDisplay(newDisplay);
    }


    return ( < div className='cl_mp_body'>

    <Header title={"Mechanics"}/>
    <NavBar />
    <div className="cl_mp_wrapper">

        <div className="cl_mp_left">
            <div className="cl_mp_left_two">
                <p>City</p>
                {["Vancouver", "Burnaby", "Surrey", "Coquitlam", "Toronto", "Ottawa", "Montreal", "Quebec City"]
                .map(x => 
                    <div key={x}>
                        <input type="checkbox" onClick={() => filterDisplay(x, "city")} />
                        <label>{x}</label>
                    </div>)}
            </div>

            <div className="cl_mp_left_three">
                <p>Service</p>
                {["Oil Change", "Brake", "Batteries & Electrical", "Cooling System", "Exhaust System", "Scheduled", 
                    "Maintenance", "3D Wheel Alignment", "Tires", "Heating & A/C", "Used Car Inspection", "Car Detailing", "Others"]
                    .map(x => <div key={x}>
                                <input type="checkbox" onClick={() => filterDisplay(x, "service")} />
                                <label>{x}</label>
                            </div>)}
            </div>
        </div>

        <div className="cl_mp_right">
            <div className="cl_mp_search">
                <input type="text" placeholder="Search Store Name" onChange={(event) => setSearchKey(event.target.value)} />
                <button className="cl_mp_search_button" onClick={searchDisplay} >Search</button>
            </div>
            <div className="cl_mp_sel_pics">
                {display.map(s => <ClientHomeStore storeInfo={s} key={s.email} />)}
            </div>
        </div>
    </div>
    </div> );
}
 
export default ClientHome;