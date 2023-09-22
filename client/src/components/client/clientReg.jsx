import React from 'react';
import { useState, useEffect } from 'react';
import ClientRegCar from './clientRegCar';

const ClientReg = ({signupFunction=f=>f, user="client"}) => {
    
    useEffect(() => {
        document.title = "Client Registration";  
    }, []);
    
    const [email, setEmail] = useState('');
    const [phoneNum, setPhoneNum] = useState('');
    const [name, setName] = useState('');
    const [surname, setSurName] = useState('');
    const [pwd, setPwd] = useState('');
    const [pwd_confirm, setPwd_confirm] = useState('');
    const [agree, setAgree] = useState(false);

    // define cars as as list of objects
    const [carsid, setCarsId] = useState(2);
    const [cars, setCars] = useState([
        {
            id: 1,
            make: '',
            model: '',
            year: '',
            mileage: '',
            transmission: '',
            drivetrain: ''
        }
    ]);

    useEffect(() => {
        if (user === "admin") setAgree(true); 
    }, [user]);

    // functions
    const onSignup = (event) => {
        event.preventDefault();

        // validation
        if (email.trim() === "") {
            alert("Please provide your email for registration");
            return;
        }
        if (name.trim() === "") {
            alert("Please provide an account name");
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
        if (!agree) {
            alert("Please agree on the privacy policy");
            return;
        }
        for (let i=0; i<cars.length; i++) {
            if (cars[i].make === '' || cars[i].make === null) {
                alert(`The make of car ${i+1} is missing`);
                return;
            }
        }

        // if all good
        const new_info = {
            email,
            pwd,
            name,
            phoneNum,
            surname,
            cars
        }
        signupFunction('client', new_info, user);
    }
    const shiftAgree = () => {
        if (agree) setAgree(false);
        else setAgree(true);
    }
    const addCar = (event) => {
        event.preventDefault();
        const newcar = {
            id: carsid,
            make: '',
            model: '',
            year: '',
            mileage: '',
            transmission: '',
            drivetrain: ''
        };
        setCars([...cars, newcar]);
        setCarsId(carsid+1);
    }
    const updateCar = (id, make, model, year, mileage, transmission, drivetrain) => {
        const newCarData = cars.map(b => b.id===id? {...b, 
            make, model, year, mileage, transmission, drivetrain}:b);
        setCars(newCarData);
    }
    const deleteCar = (id) => {
        setCars(cars.filter((c) => c.id !== id));
    }


    return (
    <div className='cl_reg_page_body'>

    <div className="cl_reg_page_container">
        <div className="cl_reg_page_title">Client Registration</div>
        <div className="cl_reg_page_content">
            <form>
                <div className="cl_reg_page_user-details">
                    <div className="cl_reg_page_input-box">
                        <span className="cl_reg_page_details">Email*</span>
                        <input type="text" placeholder="abc@xyz.com" name='email'
                            onChange={(event) => setEmail(event.target.value)} /> 
                    </div>
                    <div className="cl_reg_page_input-box">
                        <span className="cl_reg_page_details">Phone Number</span>
                        <input type="text" placeholder="(1)___ ___ ____" name='phone'
                            onChange={(event) => setPhoneNum(event.target.value)} />
                    </div>
                    <div className="cl_reg_page_input-box">
                        <span className="cl_reg_page_details">Name*</span>
                        <input type="text" placeholder="Enter your name" name='name'
                            onChange={(event) => setName(event.target.value)} /> 
                    </div>
                    <div className="cl_reg_page_input-box">
                        <span className="cl_reg_page_details">Surname</span>
                        <input type="text" placeholder="Enter your surname" name='surname'
                            onChange={(event) => setSurName(event.target.value)} />
                    </div>
                    <div className="cl_reg_page_input-box">
                        <span className="cl_reg_page_details">Password*</span>
                        <input type="text" placeholder="Enter your password" name='pwd'
                            onChange={(event) => setPwd(event.target.value)} /> 
                    </div>
                    <div className="cl_reg_page_input-box">
                        <span className="cl_reg_page_details">Confirm Password*</span>
                        <input type="text" placeholder="Confirm your password" name='pwd_confirm'
                            onChange={(event) => setPwd_confirm(event.target.value)} /> 
                    </div>
                </div>

                {cars.map(c => <ClientRegCar key={c.id} info={c} 
                    deleteFunc={() => deleteCar(c.id)} 
                    updateFunc={updateCar} />)}

                <button className='cl_reg_page_add' onClick={addCar}>Add more car</button>

                <div className='cl_reg_page_policy'>
                    {user === "admin"? null : <>
                    <input type="checkbox" onClick={shiftAgree} name='agree' />
                    &nbsp;
                    *By clicking this button, you are accepting our data privacy policy nasdjlfajdflkjsldfjsljfdl;sadkflsajfa
                    </>}
                </div>
                <div className="cl_reg_page_button_submit">
                    <input type="submit" value="Submit" onClick={onSignup} name='submitBtn' /> 
                </div>
            </form>
        </div>
    </div>

    </div>
    );
}
 
export default ClientReg;