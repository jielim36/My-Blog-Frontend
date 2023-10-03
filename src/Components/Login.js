import React, { useEffect, useState } from "react";
import "../Style/Login.css";
import { loginRequest } from "./FetchAPI";
import { useMutation, useQuery } from "@tanstack/react-query";
import { redirect, useNavigate } from "react-router-dom";

export default function Login(props) {
  const [loginState, setLoginState] = useState(false);
  const [usernameFormat, setUsernameFormat] = useState(true);
  const [passwordFormat, setPasswordFormat] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginForm, setLoginForm] = useState({ email: "", password: "" });
  const nav = useNavigate();

  if(localStorage.getItem('token') && !loginState){
    console.log("Login successfully...");
    // setLoginState(true);
    // nav('/home');
  }

  useEffect(() => {
    setLoginForm({ email: username, password: password });
  }, [username, password]);

  const loginMutation = useMutation({
    mutationFn: (formData) => {
      return loginRequest(formData);
    },
  });

  const handleUserInfo = (e) => {
    e.preventDefault();
    console.log("userinfo");
    if (username.length <= 5) {
      setUsernameFormat(false);
    } else {
      setUsernameFormat(true);
    }
    if (password.length <= 5) {
      setPasswordFormat(false);
    } else {
      setPasswordFormat(true);
    }

    if (username.length > 5 && password.length > 5) {
      console.log("format!");
      loginMutation.mutate(loginForm);
    }
  };

  if (loginMutation.isLoading) {
    console.log("initial loading");
  }

  if (loginMutation.isSuccess && !loginState) {
    console.log("success!");
    setLoginState(true);
    console.log('My login token is : '+loginMutation.data.data);
    localStorage.setItem('token',loginMutation.data.data);
    window.location.reload();
    return nav('/home');
  }


  const closeForm = () => {
    setLoginState(true);
  };

  if (!loginState) {
    return (
      <div className="loginContainer">
        <div className="cancel" onClick={closeForm}>
          X
        </div>
        <h2>Welcome!</h2>
        <span className="sentence">
          "Log in with your account to start blogging!"
        </span>
        <form onSubmit={handleUserInfo}>
          <div className="userInput">
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
              }}
              className={`${usernameFormat ? "" : "notFormat"}`}
            />
            <div className={`remind ${usernameFormat ? "" : "errorInput"}`}>
              Username length must greater than 5!
            </div>
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`${usernameFormat ? "" : "notFormat"}`}
            />
            <div className={`remind ${passwordFormat ? "" : "errorInput"}`}>
              Password length must greater than 5!
            </div>
          </div>
          <div className="option">
            <span>Forgot Password?</span>
            <span>Sign up</span>
          </div>
          <input
            type="submit"
            className={`submitButton ${
              username && password ? "activated" : ""
            }`}
            value="Login"
            disabled={!(username && password)}
          />
        </form>
      </div>
    );
  }
}
