import NavBar from './navBar';
import Header from './header';
import Requests from './requests';
import axios from "axios";
import React, { useState, useEffect } from 'react';
import { useLocation } from "react-router-dom";
import moment from 'moment';

const ReqDetail = ({ acc, url_head, user, cancel_desc }) => {
    const [reqData, setReqData] = useState([]);
    const { state } = useLocation();

    useEffect(() => {
        if (user === "store") {
            const url = `${url_head}/appoint/store/${acc.email}`;
            axios
            .get(url)
            .then(res => {
                let filtered = res.data.filter(x => x.apptStatus === "Waiting Approval");
                if (filtered.length !== 0)
                    setReqData(filtered);
            })
        }
        else if (user === "client") {
            const url = `${url_head}/appoint/client/${acc.email}`;
            axios
            .get(url)
            .then(res => {
                let filtered = res.data.filter(x => x.apptStatus === "In-Progress" || x.apptStatus === "Waiting Approval");
                if (filtered.length !== 0)
                    setReqData(filtered);
            })
        }
        else {
            const url = `${url_head}/appoint/time/${state.data.date}/${state.data.timeSlot}`;
            axios
            .get(url)
            .then(res => {
                let filtered = res.data.filter(x => x.apptStatus === "In-Progress");
                if (filtered.length !== 0)
                    setReqData(filtered);
            })
        }
    }, [user]);


    function handleAccpet(data) {
        // update appointment database
        const url_app = `${url_head}/appoint/${data.clientEmail}/${data.storeEmail}/${data.day}/${data.timeSlot}`;
        let newdata = data;
        newdata.apptStatus = "In-Progress";
        axios.put(url_app, newdata);

        // delete frontend data
        let newreq = reqData.filter(x => 
            x.clientEmail !== data.clientEmail ||
            x.storeEmail !== data.storeEmail ||
            x.day !== data.day ||
            x.timeSlot !== data.timeSlot);
        setReqData(newreq);
    }

    async function handleCancel(data, type) {
        // update appointment database
        const url_app = `${url_head}/appoint/${data.clientEmail}/${data.storeEmail}/${data.day}/${data.timeSlot}`;
        let newapp = data;
        newapp.apptStatus = "Cancelled";
        if (type === "store") {
            newapp.cancelledByStore = true;
            newapp.cancelledByClient = false;
        }
        else {
            newapp.cancelledByClient = true;
            newapp.cancelledByStore = false;
        }
        axios.put(url_app, newapp);

        // update availability database
        const url_ava = `${url_head}/ava/${data.storeEmail}/${data.day}/${data.timeSlot}`;
        console.log(url_ava);
        let ava;
        await axios.get(url_ava).then(res => ava =res.data);
        let newava = ava;
        newava.bookedQuota = ava.bookedQuota-1;
        await axios.put(url_ava, newava);

        // delete frontend data
        let newreq = reqData.filter(x => 
            x.clientEmail !== data.clientEmail ||
            x.storeEmail !== data.storeEmail ||
            x.day !== data.day ||
            x.timeSlot !== data.timeSlot);
        setReqData(newreq);
    }
   
    return ( <>
    <Header title={user==="store"?acc.name:"Mechanics"} img={user==="store"?acc.imgurl:""} />
    <NavBar navtype={user} />

    <div className="Req_Det_Page_Body">
        <div className="Req_Det_Page_Wrapper">
            {reqData.length === 0? <p>No appointments</p>
            :
            reqData.sort((x1, x2) => {
                let x1time = moment(`${x1.day}:${x1.timeSlot}`, "YYYY-M-D:H");
                let x2time = moment(`${x2.day}:${x2.timeSlot}`, "YYYY-M-D:H");
                if (x1time >= x2time) return 1;
                else return -1;
            }).map((x,i) => <Requests key={i} data={x} type={user} cancel={cancel_desc}
                                      handleAccpetFunc={() => handleAccpet(x)}
                                      handleCancelFunc={() => handleCancel(x, user)} />)}
        </div>
    </div>
</>);
}
 
export default ReqDetail;