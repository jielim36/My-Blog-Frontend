import React, { useEffect, useState } from "react";
import J_logo from '../Assets/J.png'
import { NavLink, Navigate, useNavigate } from "react-router-dom";
import '../Style/NavigationBar.css';
import UserIcon from "./UserIcon";
import SearchBar from "./SearchBar";
import Login from "./Login";
import { useQuery } from "@tanstack/react-query";
import { fetchUserByToken } from "./FetchAPI";

const NavigationBar = () => {

    const nav = useNavigate();
    const [loginForm , setLoginForm] = useState(false);
    const [loginValid , setLoginValid] = useState(false);
    
    const checkLogin = (event)=>{
        if(!localStorage.getItem('token')){
            event.preventDefault();
            console.log("Did not login...");
            setLoginForm(true);
            // nav('/login');

        }
        userRefetch();
        if (!userData) {
            event.preventDefault();
            console.log("Login Expired...");
            setLoginForm(true);
            // nav('/login');
        }
    }

    //check JWT expired or not
    const {
        isLoading: userIsLoading,
        isError: userIsError,
        data: userData,
        refetch: userRefetch,
        error: userError,
      } = useQuery({
        queryKey: ["articles", "users/token"],
        queryFn: fetchUserByToken,
        enabled: false,
      });

    useEffect(()=>{
        console.log("User data isssssss: ");
        console.log(userData);
        if (userData && !userError) {
            setLoginValid(true);
        }
    },[userData])

    if (userError) {
        console.log("nooooo user error");
    }

    return (
        <>
            <div className="Container">
                <NavLink to='/home'>
                    <img src={J_logo} alt="None"></img>
                </NavLink>
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
                        to="/creatorhub/1001" 
                        onClick={checkLogin}
                        style={({isActive})=> {return isActive ? {background:"#2f54eb",color:"white",borderRadius:'6px'} : null}}
                        className="nav-link">Creator Hub</NavLink>
                    </li>
                </ul>
            </div>
            {loginForm ? <Login path="/home" /> : ''}
        </>
    );
}

export default NavigationBar;
