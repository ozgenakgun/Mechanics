import React from 'react';
import { useState } from 'react';
import {  NavLink } from 'react-router-dom';

const LoginAdmin = ({loginFunction=f=>f}) => {
    const [email, setEmail] = useState('');
    const [pwd, setPwd] = useState('');

    const onLogin = (event) => {
        event.preventDefault();
        loginFunction(email, pwd, "admin");
    }

    return ( 
    <div className="loginAdmin-body">
        <div className="loginAdmin-main">
            <p className="loginAdmin-sign" >Admin Login</p>
            <form className="loginAdmin-form" onSubmit={onLogin}>
                <input className="loginAdmin-email" type="text" placeholder="E-mail"
                onChange={(event) => setEmail(event.target.value)} />
                <input className="loginAdmin-pwd" type="password" placeholder="Password"
                onChange={(event) => setPwd(event.target.value)} />
                <button className="loginAdmin-submit" >Login</button>
                <NavLink className="loginAdmin-forgot" to="#" >Forgot Password?</NavLink>
            </form>
        </div>
    </div> 
    );
}
 
export default LoginAdmin;