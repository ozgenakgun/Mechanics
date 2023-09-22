import Header from "../header";
import { useState, useEffect, React } from "react";
import axios from "axios";
import {  NavLink } from 'react-router-dom';
import AccPopup from "./accPopup";

const AdminHome = ({ url_head }) => {
    const [allClient, setAllClient] = useState([]);
    const [allStore, setAllStore] = useState([]);
    // for search and display
    const [clientDisplay, setClientDisplay] = useState([]);
    const [storeDisplay, setStoreDisplay] = useState([]);
    const [searchKey, setSearchKey] = useState("");
    // for popup
    const [clientPopup, setClientPopup] = useState([]);
    const [storePopup, setStorePopup] = useState([]);

    useEffect(() => {
        async function fetchDataClient() {
            const url_client = `${url_head}/client`;
            await axios.get(url_client).then(res => { 
                setAllClient(res.data);
                setClientDisplay(res.data);
                let button_set = res.data.map(x => ({
                    ownerEmail: x.email,
                    popup: false
                }));
                setClientPopup(button_set);
            });
        }
        fetchDataClient();
    }, [url_head])

    useEffect(() => {
        async function fetchDataStore() {
            const url_store = `${url_head}/store`;
            await axios.get(url_store).then(res => { 
                setAllStore(res.data);
                setStoreDisplay(res.data);
                let button_set = res.data.map(x => ({
                    ownerEmail: x.email,
                    popup: false
                }));
                setStorePopup(button_set);
            });
        }
        fetchDataStore();
    }, [url_head])

    function handleDelete(email, type) {
        if (type === "client") {
            // remove frontend data
            const newClient = allClient.filter(x => x.email !== email);
            setAllClient(newClient);
            const newClientDisplay = clientDisplay.filter(x => x.email !== email);
            setClientDisplay(newClientDisplay);

            // remove database
            const url_client = `${url_head}/client/${email}`;
            axios.delete(url_client);

            const url_car = `${url_head}/car/${email}`;
            axios.delete(url_car);

            const url_app = `${url_head}/appoint/client/${email}`;
            axios.delete(url_app);
        }
        else {
            // remove frontend data
            const newStore = allStore.filter(x => x.email !== email);
            setAllStore(newStore);
            const newStoreDisplay = storeDisplay.filter(x => x.email !== email);
            setStoreDisplay(newStoreDisplay);
            
            // remove database
            const url_store = `${url_head}/store/${email}`;
            axios.delete(url_store);

            const url_ava = `${url_head}/ava/${email}`;
            axios.delete(url_ava);

            const url_app = `${url_head}/appoint/store/${email}`;
            axios.delete(url_app);
        }
    }

    function setPopup(type, email, open) {
        if (type === "client") {
            const new_clientpopup = clientPopup.map(x => x.ownerEmail===email ? ({ownerEmail: email, popup: open}) : x);
            setClientPopup(new_clientpopup);
        }
        else {
            const new_storepopup = storePopup.map(x => x.ownerEmail===email ? ({ownerEmail: email, popup: open}) : x);
            setStorePopup(new_storepopup);
        }
    }

    function searchEmail() {
        let newClientDisplay = allClient;
        let newStoreDisplay = allStore;

        if (searchKey.trim() !== "") {
            newClientDisplay = allClient.filter(x => x.email.toLowerCase().includes(searchKey.trim().toLowerCase()));
            newStoreDisplay = allStore.filter(x => x.email.toLowerCase().includes(searchKey.trim().toLowerCase()));
        }
        setClientDisplay(newClientDisplay);
        setStoreDisplay(newStoreDisplay);
    }

    return ( 
   <div className="Admin_Main_Page_wrapper">
        <Header title="Mechanics - Admin" />

        <div className="Admin_Main_Page_Search">
            <input type="text" placeholder="Search Engine For Account Email" onChange={(e) => setSearchKey(e.target.value)} />
            <button className="ad_mp_search_button" onClick={searchEmail} >Search</button>
        </div>

        <NavLink className="Admin_Main_Page_CheckBox" to="./addClient">New Client Account</NavLink>
        <NavLink className="Admin_Main_Page_CheckBox" to="./addStore">New Store Account</NavLink>

        <table className="Admin_Main_Page_ViewList">
            <tbody>
                {clientDisplay.map(c => <tr className="Admin_Main_Page_Row_One" key={c.email}>
                    <td className="admin_Main_Page_td1"><strong>Account Type</strong>: Client</td>
                    <td className="admin_Main_Page_td2"><strong>Name</strong>: {c.name}</td>
                    <td className="admin_Main_Page_td3"><strong>Email</strong>: {c.email}</td>
                    <td className="Admin_Main_Page_RowDetailButton">
                        <button onClick={() => setPopup("client", c.email, true)}>Detail</button>
                        <AccPopup 
                            trigger={ clientPopup.length===0?false: clientPopup.filter(x => x.ownerEmail === c.email)[0].popup } 
                            closePopup={() => setPopup("client", c.email, false)}>
                            <h3>Account Information</h3>
                            <table className="admin_popup_table">
                                <tbody>
                                    <tr>
                                        <td><strong>Account Type:</strong></td>
                                        <td>Client</td>
                                    </tr>
                                    <tr>
                                        <td><strong>Email:</strong></td>
                                        <td>{c.email}</td>
                                    </tr>
                                    <tr>
                                        <td><strong>Name:</strong></td>
                                        <td>{c.name}</td>
                                    </tr>
                                    <tr>
                                        <td><strong>Sur Name:</strong></td>
                                        <td>{c.surName}</td>
                                    </tr>
                                    <tr>
                                        <td><strong>Phone Number:</strong></td>
                                        <td>{c.phoneNumber}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </AccPopup>
                    </td>
                    <td className="Admin_Main_Page_RowDeleteButton"><button onClick={() => handleDelete(c.email, "client")}>Delete</button></td>
                </tr>)}
                {storeDisplay.map(c => <tr className="Admin_Main_Page_Row_One" key={c.email}>
                    <td className="admin_Main_Page_td1"><strong>Account Type</strong>: Store</td>
                    <td className="admin_Main_Page_td2"><strong>Name</strong>: {c.name}</td>
                    <td className="admin_Main_Page_td3"><strong>Email</strong>: {c.email}</td>
                    <td className="Admin_Main_Page_RowDetailButton">
                        <button onClick={() => setPopup("store", c.email, true)}>Detail</button>
                        <AccPopup 
                            trigger={ storePopup.length===0?false:storePopup.filter(x => x.ownerEmail === c.email)[0].popup } 
                            closePopup={() => setPopup("store", c.email, false)}>
                            <h3>Account Information</h3>
                            <table className="admin_popup_table">
                                <tbody>
                                    <tr>
                                        <td><strong>Account Type:</strong></td>
                                        <td>Store</td>
                                    </tr>
                                    <tr>
                                        <td><strong>Email:</strong></td>
                                        <td>{c.email}</td>
                                    </tr>
                                    <tr>
                                        <td><strong>Name:</strong></td>
                                        <td>{c.name}</td>
                                    </tr>
                                    <tr>
                                        <td><strong>Phone Number:</strong></td>
                                        <td>{c.phoneNumber}</td>
                                    </tr>
                                    <tr>
                                        <td><strong>Supervisor Name:</strong></td>
                                        <td>{c.supName}</td>
                                    </tr>
                                    <tr>
                                        <td><strong>Address:</strong></td>
                                        <td>{`${c.address}, ${c.city}, ${c.province}, ${c.postalCode}`}</td>
                                    </tr>
                                    <tr>
                                        <td><strong>Facebook:</strong></td>
                                        <td>{c.facebook}</td>
                                    </tr>
                                    <tr>
                                        <td><strong>Instagram:</strong></td>
                                        <td>{c.instagram}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </AccPopup>
                    </td>
                    <td className="Admin_Main_Page_RowDeleteButton"><button onClick={() => handleDelete(c.email, "store")}>Delete</button></td>
                </tr>)}
            </tbody>
        </table>

   </div> 
     );
}
 
export default AdminHome;