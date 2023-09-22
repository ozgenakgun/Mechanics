import React from 'react';
import { useState, useEffect } from 'react';
import sampleImg from '../../resource/storeSample.jpg';

const StoreReg = ({signupFunction=f=>f, user="store"}) => {
    useEffect(() => {
        document.title = "Store Registration";  
    }, []);

    // registration info
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [pwd, setPwd] = useState('');
    const [pwd_confirm, setPwd_confirm] = useState('');

    // company info
    const [supName, setSupName] = useState('');
    const [phoneNum, setPhoneNum] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [province, setProvince] = useState('');
    const [postal, setPostal] = useState('');
    const [desc, setDesc] = useState('');
    const [pic, setPic] = useState("");
    
    // more info
    const [facebook, setFacebook] = useState('');
    const [ins, setIns] = useState('');
    const [service, setService] = useState([]);
    const [quota, setQuota] = useState(0);
    const [agree, setAgree] = useState(false);

    useEffect(() => {
        if (user === "admin") setAgree(true); 
    }, [user]);

    // functions
    const onSignup = (event) => {
        event.preventDefault();

        // validation
        if (name.trim() === "") {
            alert("Please provide your company name");
            return;
        }
        if (email.trim() === "") {
            alert("Please provide your email");
            return;
        }
        if (pwd.trim() === "") {
            alert("Please provide a password");
            return;
        }
        if (pwd.trim() !== pwd_confirm.trim()) {
            alert("Password need to be the same as confirmed");
            return;
        }
        if (supName.trim() === "") {
            alert("Please provide your supervisor name");
            return;
        }
        if (phoneNum.trim() === "") {
            alert("Please provide a phone number");
            return;
        }
        if (address.trim() === "") {
            alert("Please provide your address");
            return;
        }
        if (city.trim() === "") {
            alert("Please provide your city");
            return;
        }
        if (province.trim() === "") {
            alert("Please provide your province");
            return;
        }
        if (postal.trim() === "") {
            alert("Please provide your postal code");
            return;
        }
        if (province === "") {
            alert("Please provide your postal code");
            return;
        }
        if (!agree) {
            alert("Please agree on the privacy policy");
            return;
        }

        // if all good
        const new_info = {
            name,
            email,
            pwd,
            phoneNum,
            supName,
            address,
            city,
            province,
            postal,
            desc,
            facebook,
            ins,
            service,
            quota,
            pic
        }
        signupFunction('store', new_info, user);
    }
    const shiftAgree = () => {
        if (agree) setAgree(false);
        else setAgree(true);
    }
    const addOrRemoveService = (ser) => {
        if (service.includes(ser))
            setService(service.filter(x => x!== ser));
        else
            setService([...service, ser]);
    }
    const convert2Base64 = (file) => {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file);
            fileReader.onload = () => {
                resolve(fileReader.result)
            };
            fileReader.onerror = (error) => {
                reject(error)
            }
        })
    }
    const handleFileUpload = async (e) => {
        const file = e.target.files[0];
        const base64 = await convert2Base64(file);
        setPic(base64);
    }


    return (
    <div className='store_reg_page_body'>

    <div className="store_reg_page_container">
        <div className="store_reg_page_title">Store Registration</div>

        <form className="store_reg_page_content" onSubmit={onSignup}>
            <img src={ pic || sampleImg } alt="Store_Pic" className="store_reg_page_image" />
            <div className="store_reg_page_updatePicBtn">
                <p>Set Profile Image</p>
                <input type="file" accept='.jpeg, .png, .jpg' onChange={(e) => handleFileUpload(e)} />
            </div>

            <div className="store_reg_page_user-details">
                <hr ></hr>
                <h4>Registration Information</h4>
                <div className="store_reg_page_input-box">
                    <span className="store_reg_page_details">* Company Name</span>
                    <input type="text" placeholder="Company Name" onChange={(e) => setName(e.target.value)} />
                </div>
                <div className="store_reg_page_input-box">
                    <span className="store_reg_page_details">* Email</span>
                    <input type="text" placeholder="xyz@abc.com" onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className="store_reg_page_input-box">
                    <span className="store_reg_page_details">* Password</span>
                    <input type="text" placeholder="******" onChange={(e) => setPwd(e.target.value)} />
                </div>
                <div className="store_reg_page_input-box">
                    <span className="store_reg_page_details">* Confirm Password</span>
                    <input type="text" placeholder="******" onChange={(e) => setPwd_confirm(e.target.value)} />
                </div>

                <h4>Store Information</h4>
                <div className="store_reg_page_input-box">
                    <span className="store_reg_page_details">* Supervisor Name</span>
                    <input type="text" onChange={(e) => setSupName(e.target.value)} />
                </div>
                <div className="store_reg_page_input-box">
                    <span className="store_reg_page_details">* Telephone</span>
                    <input type="text" placeholder="(1)___ ___ ____" onChange={(e) => setPhoneNum(e.target.value)} />
                </div>
                <div className="store_reg_page_input-box">
                    <span className="store_reg_page_details">* Address Line</span>
                    <input type="text" onChange={(e) => setAddress(e.target.value)} />
                </div>
                <div className="store_reg_page_input-box">
                    <span className="store_reg_page_details">* City</span>
                    
                    <select name="" onChange={(e) => setCity(e.target.value)}>
                        <option value="">--</option>
                        <option value="Vancouver"> Vancouver</option>
                        <option value="Burnaby"> Burnaby</option>
                        <option value="Surrey"> Surrey</option>
                        <option value="Coquitlam"> Coquitlam</option>
                        <option value="Toronto"> Toronto</option>
                        <option value="Ottawa"> Ottawa</option>
                        <option value="Montreal"> Montreal</option>
                        <option value="Quebec City"> Quebec City</option>
                        <option value="Others"> Others</option>
                    </select>
                
                </div>
                <div className="store_reg_page_input-box">
                    <span className="store_reg_page_details">* Province</span>
                    
                    <select name="" onChange={(e) => setProvince(e.target.value)}>
                        <option value="">--</option>
                        <option value="Alberta"> Alberta</option>
                        <option value="British Columbia"> British Columbia</option>
                        <option value="Manitoba"> Manitoba</option>
                        <option value="Nova Scotia"> Nova Scotia</option>
                        <option value="Ontario"> Ontario</option>
                        <option value="Quebec"> Quebec</option>
                        <option value="Saskatchewan"> Saskatchewan</option>
                        <option value="Others"> Others</option>
                    </select>
                
                </div>
                <div className="store_reg_page_input-box">
                    <span className="store_reg_page_details">* Postal Code</span>
                    <input type="text" placeholder="XXX XXX" onChange={(e) => setPostal(e.target.value)} />
                </div>
                
                <div className="store_reg_page_input-box">
                    <span className="store_reg_page_details">Instagram</span>
                    <input type="text" onChange={(e) => setIns(e.target.value)} />
                </div>
                <div className="store_reg_page_input-box">
                    <span className="store_reg_page_details">FaceBook</span>
                    <input type="text" onChange={(e) => setFacebook(e.target.value)} />
                </div>
                <div className="store_reg_page_input-box">
                    <span className="store_reg_page_details">Available Seats Each Hour</span>
                    <input type="number" onChange={(e) => setQuota(e.target.value)} />
                </div>
                <div className="store_reg_page_input-box-special">
                    <span className="store_reg_page_details">Description</span>
                    <textarea className="store_reg_page_textarea" rows={5} onChange={(e) => setDesc(e.target.value)} />
                </div>
                
            </div>

            <div className="store_reg_page_service_type">
                <p>Service Type - Please enter the areas of service you provide</p>
                <div>
                    <input type="checkbox" onClick={() => addOrRemoveService("Oil Change")} /><label>Oil Change</label>
                </div>
                <div>
                    <input type="checkbox" onClick={() => addOrRemoveService("Brake")} /><label>Brake</label>
                </div>
                <div>
                    <input type="checkbox" onClick={() => addOrRemoveService("Batteries & Electrical")} /><label>Batteries & Electrical</label>
                </div>
                <div>
                    <input type="checkbox" onClick={() => addOrRemoveService("Cooling System")} /><label>Cooling System</label>
                </div>
                <div>
                    <input type="checkbox" onClick={() => addOrRemoveService("Exhaust System")} /><label>Exhaust System</label>
                </div>
                <div>
                    <input type="checkbox" onClick={() => addOrRemoveService("Scheduled")} /><label>Scheduled</label>
                </div>
                <div>
                    <input type="checkbox" onClick={() => addOrRemoveService("Maintenance")} /><label>Maintenance</label>
                </div>
                <div>
                    <input type="checkbox" onClick={() => addOrRemoveService("3D Wheel Alignment")} /><label>3D Wheel Alignment</label>
                </div>
                <div>
                    <input type="checkbox" onClick={() => addOrRemoveService("Tires")} /><label>Tires</label>
                </div>
                <div>
                    <input type="checkbox" onClick={() => addOrRemoveService("Heating & A/C")} /><label>Heating & A/C</label>
                </div>
                <div>
                    <input type="checkbox" onClick={() => addOrRemoveService("Used Car Inspection")} /><label>Used Car Inspection</label>
                </div>
                <div>
                    <input type="checkbox" onClick={() => addOrRemoveService("Car Detailing")} /><label>Car Detailing</label>
                </div>
                <div>
                    <input type="checkbox" onClick={() => addOrRemoveService("Others")} /><label>Others</label>
                </div>
            </div>

            <div className="store_reg_page_input-box-agree">
                {user === "admin"? null : <>
                <input type="checkbox" onClick={shiftAgree}  />&nbsp;*By clicking this button, you are accepting our data privacy policy of our company and consent our usage to your data.
                </>}
            </div>

            <div className="store_reg_page_button">
                <input type="submit" value="Confirm" />
            </div>
        </form>
    </div>

    </div>
    );
}
 
export default StoreReg;