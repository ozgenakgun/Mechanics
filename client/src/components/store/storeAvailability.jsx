import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from 'react-router-dom';

const StoreAvailability = ({ url_head, storeEmail, assignData=f=>f }) => {
    const [data, setData] = useState();
    const [quota, setQuota] = useState();

    useEffect(() => {
        let catchData = assignData();
        if (catchData !== undefined) {
            setData(catchData);
            setQuota(catchData.totalQuota - catchData.bookedQuota);
        }
    }, [assignData])

    // action
    function addQuota() {
        let newdata = data;
        newdata.totalQuota  = data.totalQuota + 1;
        setData(newdata);
        setQuota(newdata.totalQuota - newdata.bookedQuota);
        updateAva(newdata);
    }
    function redQuota() {
        if (data.totalQuota === data.bookedQuota) return;
        let newdata = data;
        newdata.totalQuota  = data.totalQuota - 1;
        setData(newdata);
        setQuota(newdata.totalQuota - newdata.bookedQuota);
        updateAva(newdata);
    }
    function clearQuota() {
        let newdata = data;
        newdata.totalQuota  = 0;
        setData(newdata);
        setQuota(newdata.totalQuota - newdata.bookedQuota);
        updateAva(newdata);
    }
    // update database
    const updateAva = async(newdata) => {
        const url_ava = `${url_head}/ava/${storeEmail}/${data.date}/${data.timeSlot}`;
        axios.put(url_ava, newdata);
    }

    return ( 
    <div className="storehome_mini">
        <div className="storehome_p1">available</div>
        <div className="storehome_p2">{quota}</div>
        <div className="storehome_addDrop">
            <input type="button" value=" + " onClick={addQuota} />
            <input type="button" value=" - " onClick={redQuota} />
        </div>
        <div className="storehome_threebtn">
            <input type="button" value="Clear" onClick={clearQuota} />
            <Link className="storehome_threebtn_link" to={"/store/orders"} state={{ data }}>Detail</Link>
        </div>
    </div> 
);
}
 
export default StoreAvailability;