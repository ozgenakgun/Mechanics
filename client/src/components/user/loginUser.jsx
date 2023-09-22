import React from 'react';
import { useState, useEffect } from 'react';
import {  Link } from 'react-router-dom';

const LoginUser = ({loginFunction=f=>f}) => {
    useEffect(() => {
        document.title = "Mechanics Login";  
    }, []);

    const [user, setUser] = useState('client');
    const [email, setEmail] = useState('');
    const [pwd, setPwd] = useState('');

    const onLogin = (event) => {
        event.preventDefault();
        loginFunction(email, pwd, user);
    }
    
    return ( 
    <div className="loginUser-body">
        <div className="loginUser-main">
            <p className="loginUser-sign" >User Login</p>

            <form className="loginUser-form" onSubmit={onLogin}>
                <div className="loginUser-GroupBtn">
                    <input type="radio" className="loginUser-BtnClient" name="loginUser-userType"
                        value="client" onClick={(event)=>setUser(event.target.value)} />
                    <label htmlFor="loginUserBtnClient">Client</label> &nbsp; &nbsp; &nbsp;
                    <input type="radio" className="loginUser-BtnStore" name="loginUser-userType"
                        value="store" onClick={(event)=>setUser(event.target.value)} />
                    <label htmlFor="loginUserBtnStore">Store</label>
                </div>
                <input className="loginUser-email" type="text" placeholder="E-mail"
                    onChange={(event) => setEmail(event.target.value)} />
                <input className="loginUser-pwd" type="password" placeholder="Password"
                    onChange={(event) => setPwd(event.target.value)} />
                <button className="loginUser-submit" >Login</button>
            </form>

            <div className='loginUser-alllinks'>
                <Link className="loginUser-eachlink" to={"/clientReg"} >Client Sign Up</Link>
                <Link className="loginUser-eachlink" to={"/storeReg"} >Store Sign Up</Link>
                <Link className="loginUser-eachlink" to={"/forgotPwd"} >Forgot Password?</Link>
            </div>
        </div>
    </div>
    );
}
 
export default LoginUser;