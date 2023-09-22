import StoreAvailability from './store/storeAvailability';
import moment from 'moment';
import axios from "axios";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Calendar = ({urlhead, user="store", storeInfo}) => {
    const [avadata, setAvadata] = useState([]);

    // get days
    const today = moment();
    const firstDayGap = parseInt(today.day())-1;
    const thistime = parseInt(moment().format("HH"));
    const thisday = moment(today.format("YYYY-M-D"), "YYYY-M-D");

    const [monday, setMonday] = useState(moment().subtract(firstDayGap, 'days'));
    const [tuesday, setTuesday] = useState(moment().subtract(firstDayGap, 'days').add(1, 'days'));
    const [wednesday, setWednesday] = useState(moment().subtract(firstDayGap, 'days').add(2, 'days'));
    const [thursday, setThursday] = useState(moment().subtract(firstDayGap, 'days').add(3, 'days'));
    const [friday, setFriday] = useState(moment().subtract(firstDayGap, 'days').add(4, 'days'));
    const [saturday, setSaturday] = useState(moment().subtract(firstDayGap, 'days').add(5, 'days'));
    const [sunday, setSunday] = useState(moment().subtract(firstDayGap, 'days').add(6, 'days'));
    const [weeksaway, setWeeksAway] = useState(0);

    // read store availability
    useEffect(() => {
        const url = `${urlhead}/ava/${storeInfo.email}`;
        axios
            .get(url)
            .then(res => {
                setAvadata(res.data
                    .filter(dat => 
                        moment(dat.date, "YYYY-M-D") >= moment(monday.format("YYYY-M-D"), "YYYY-M-D")
                        && moment(dat.date, "YYYY-M-D") <= moment(sunday.format("YYYY-M-D"), "YYYY-M-D")
                    )
                );
            })
    }, [weeksaway])

    // functions
    const DateBack = () => {
        setMonday(monday.subtract(7, 'days'));
        setThursday(tuesday.subtract(7, 'days'));
        setWednesday(wednesday.subtract(7, 'days'));
        setThursday(thursday.subtract(7, 'days'));
        setFriday(friday.subtract(7, 'days'));
        setSaturday(saturday.subtract(7, 'days'));
        setSunday(sunday.subtract(7, 'days'));
        setWeeksAway(weeksaway - 1);
    }
    const DateForward = () => {
        setMonday(monday.add(7, 'days'));
        setThursday(tuesday.add(7, 'days'));
        setWednesday(wednesday.add(7, 'days'));
        setThursday(thursday.add(7, 'days'));
        setFriday(friday.add(7, 'days'));
        setSaturday(saturday.add(7, 'days'));
        setSunday(sunday.add(7, 'days'));
        setWeeksAway(weeksaway + 1);
    }
    const BackToThisWeek = () => {
        setMonday(moment().subtract(firstDayGap, 'days'));
        setTuesday(moment().subtract(firstDayGap, 'days').add(1, 'days'));
        setWednesday(moment().subtract(firstDayGap, 'days').add(2, 'days'));
        setThursday(moment().subtract(firstDayGap, 'days').add(3, 'days'));
        setFriday(moment().subtract(firstDayGap, 'days').add(4, 'days'));
        setSaturday(moment().subtract(firstDayGap, 'days').add(5, 'days'));
        setSunday(moment().subtract(firstDayGap, 'days').add(6, 'days'));
        setWeeksAway(0);
    }
    const dayRelationship = (day, isWeekend) => {
        let result = "";
        if (today.format('YYYY-MMMM-DD')===day.format('YYYY-MMMM-DD'))
            result += "storehome_today";
        else
            result += "";
        
        if (isWeekend) result += " storehome_weekend";
        return result;
    }
    const filterAvaData = (date, time) => {
        if (avadata.length!==0)
            return avadata.filter(dat => dat.date === date.format("YYYY-M-D") 
                                    && dat.timeSlot === time)[0];
        else return undefined;
    }
    const getOnlyQuota = (date, time) => {
        const timeInfo = filterAvaData(date, time);
        let class_name = "store_detail_client_reservation";
        // if past time slot
        if (moment(date.format("YYYY-M-D"), "YYYY-M-D") < thisday
            || (date.format("YYYY-M-D") === thisday.format("YYYY-M-D")
                && time <= thistime))
            class_name = "store_detail_link_disable";

        if (timeInfo !== undefined) {
            if (timeInfo.totalQuota - timeInfo.bookedQuota === 0) class_name = "store_detail_link_disable";
            
            return <Link to="/clientReservation" 
            state={{ storeInfo, timeInfo }}
            className={class_name} >
                <div>{timeInfo.totalQuota - timeInfo.bookedQuota}</div>
            </Link>;
        }
    }

    // process the availability data
    const displayAva = (time) => {
        if (user === "store")
            return <tr>
                <td className="storehome_headcol">{`${time}:00 - ${time+1}:00`}</td>
                <td><StoreAvailability url_head={urlhead} storeEmail={storeInfo.email} assignData={() => filterAvaData(monday, time)} /></td>
                <td><StoreAvailability url_head={urlhead} storeEmail={storeInfo.email} assignData={() => filterAvaData(tuesday, time)} /></td>
                <td><StoreAvailability url_head={urlhead} storeEmail={storeInfo.email} assignData={() => filterAvaData(wednesday, time)} /></td>
                <td><StoreAvailability url_head={urlhead} storeEmail={storeInfo.email} assignData={() => filterAvaData(thursday, time)} /></td>
                <td><StoreAvailability url_head={urlhead} storeEmail={storeInfo.email} assignData={() => filterAvaData(friday, time)} /></td>
                <td><StoreAvailability url_head={urlhead} storeEmail={storeInfo.email} assignData={() => filterAvaData(saturday, time)} /></td>
                <td><StoreAvailability url_head={urlhead} storeEmail={storeInfo.email} assignData={() => filterAvaData(sunday, time)} /></td>
            </tr>
        else
            return <tr>
                <td className="storehome_headcol">{`${time}:00 - ${time+1}:00`}</td>
                <td>{getOnlyQuota(monday, time)}</td>
                <td>{getOnlyQuota(tuesday, time)}</td>
                <td>{getOnlyQuota(wednesday, time)}</td>
                <td>{getOnlyQuota(thursday, time)}</td>
                <td>{getOnlyQuota(friday, time)}</td>
                <td>{getOnlyQuota(saturday, time)}</td>
                <td>{getOnlyQuota(sunday, time)}</td>
            </tr>
    }

    return ( <>    
        <div className={user==="store"?"storehome_calendar":"store_detail_calendar"}>
    
            {user==="store"?null:<div className='store_detail_spec'>* Click on a time slot to make reservation</div>}

            <div className='storehome_calendar_top'>
                <button className="storehome_secondary" onClick={BackToThisWeek} >Today</button>
                <div className="storehome_calendar_title">
                    <IoIosArrowBack className='storehome_arr_icon' onClick={DateBack} />
                    <div className="storehome_h1"><strong>{monday.format('D MMM')} – {sunday.format('D MMM')}</strong> &nbsp; {sunday.format('Y')}</div>
                    <IoIosArrowForward className='storehome_arr_icon' onClick={DateForward} />
                </div>
            </div>
    
            <div className={user==="store"?"storehome_outer":"store_detail_outer"}>
                <table className='storehome_table'>
                    <thead>
                        <tr>
                            <th className="storehome_headcol"></th>
                            <th className={ dayRelationship(monday, false) } >
                                <div>{monday.format('ddd, D')}</div>
                            </th>
                            <th className={ dayRelationship(tuesday, false) } >
                                <div>{tuesday.format('ddd, D')}</div>
                            </th>
                            <th className={ dayRelationship(wednesday, false) } >
                                <div>{wednesday.format('ddd, D')}</div>
                            </th>
                            <th className={ dayRelationship(thursday, false) } >
                                <div>{thursday.format('ddd, D')}</div>
                            </th>
                            <th className={ dayRelationship(friday, false) } >
                                <div>{friday.format('ddd, D')}</div>
                            </th>
                            <th className={ dayRelationship(saturday, true) } >
                                <div>{saturday.format('ddd, D')}</div>
                            </th>
                            <th className={ dayRelationship(sunday, true) } >
                                <div>{sunday.format('ddd, D')}</div>
                            </th>
                        </tr>
                    </thead>
    
                    <tbody>
                        <tr className='storehome_empty_row'>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                        {displayAva(8)}
                        {displayAva(9)}
                        {displayAva(10)}
                        {displayAva(11)}
                        {displayAva(12)}
                        {displayAva(13)}
                        {displayAva(14)}
                        {displayAva(15)}
                        {displayAva(16)}
                        {displayAva(17)}
                        {displayAva(18)}
                    </tbody>
                </table>
            </div>
        </div>
        
    </> );
}
 
export default Calendar;