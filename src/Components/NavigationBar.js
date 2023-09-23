import React from "react";
import J_logo from '../Assets/J.png'
import { Link, NavLink } from "react-router-dom";
import '../Style/NavigationBar.css';
import UserIcon from "./UserIcon";
import SearchBar from "./SearchBar";

const NavigationBar = () => {
    
    return (
        <div className="Container">
            <img src={J_logo} alt="None"></img>
            <div className="searchBar">
                <SearchBar />
            </div>
            <ul>
                <li className="userInfo">
                    <UserIcon />
                </li>
                <li>
                    <NavLink 
                      exact
                      to="/home" 
                      style={({isActive})=> {return isActive ? {background:"#2f54eb",color:"white",borderRadius:'6px'} : null}}
                      className="nav-link">Home</NavLink>
                </li>
                <li>
                    <NavLink 
                      to="/about" 
                      style={({isActive})=> {return isActive ? {background:"#2f54eb",color:"white",borderRadius:'6px'} : null}}
                      className="nav-link">About</NavLink>
                </li>
                <li>
                    <NavLink 
                      to="/creatorhub" 
                      style={({isActive})=> {return isActive ? {background:"#2f54eb",color:"white",borderRadius:'6px'} : null}}
                      className="nav-link">Creator Hub</NavLink>
                </li>
            </ul>
        </div>
    );
}

export default NavigationBar;
