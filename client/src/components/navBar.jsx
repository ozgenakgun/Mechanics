import {  NavLink } from 'react-router-dom';

const NavBar = ({ navtype='client' }) => {

    return ( <nav className='navBar'>

        {navtype === 'client'?
        <div className="nav nav-tabs" id="nav-tab" role="tablist">
            <NavLink data-toggle="tab" role="tab" aria-selected="false"
            className="nav-link"
            to="/clientHome" end>
                <div className={window.location.pathname==='/clientHome'?"nav_bar_selected":"nav_bar_not"} >
                    Home</div>
            </NavLink>
            <NavLink data-toggle="tab" role="tab" aria-selected="false"
            className="nav-link"
            to="/appointments">
                <div className={window.location.pathname==='/appointments'?"nav_bar_selected":"nav_bar_not"} >
                    Upcoming Appointments</div>
            </NavLink>
            <NavLink data-toggle="tab" role="tab" aria-selected="false"
            className="nav-link"
            to="/client/history">
                <div className={window.location.pathname==='/client/history'?"nav_bar_selected":"nav_bar_not"} >
                    History Appointments</div>
            </NavLink>
            <NavLink data-toggle="tab" role="tab" aria-selected="false"
            className="nav-link"
            to="/" end>
                <div className="nav_bar_not" >Exit</div>
            </NavLink>
        </div>
        :
        <div className="nav nav-tabs" id="nav-tab" role="tablist">
            <NavLink data-toggle="tab" role="tab" aria-selected="false"
            className="nav-link"
            to="/storeHome" end>
                <div className={window.location.pathname==='/storeHome'?"nav_bar_selected":"nav_bar_not"} >
                    Home</div>
            </NavLink>
            <NavLink data-toggle="tab" role="tab" aria-selected="false"
            className="nav-link"
            to="/requests">
                <div className={window.location.pathname==='/requests'?"nav_bar_selected":"nav_bar_not"}>
                    Pending Requests</div>
            </NavLink>
            <NavLink data-toggle="tab" role="tab" aria-selected="false"
            className="nav-link"
            to="/store/history">
                <div className={window.location.pathname==='/store/history'?"nav_bar_selected":"nav_bar_not"} >
                    History Orders</div>
            </NavLink>
            <NavLink data-toggle="tab" role="tab" aria-selected="false"
            className="nav-link"
            to="/" end>
                <div className="nav_bar_not" >Exit</div>
            </NavLink>
        </div>}
    </nav> );
}
 
export default NavBar;