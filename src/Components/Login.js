import React, { useState } from "react";
import "../Style/Login.css";
import { fetchUserById } from "./FetchAPI";
import { useQuery } from "@tanstack/react-query";

export default function Login() {
  const [loginState , setLoginState] = useState(false);
  const [usernameFormat , setUsernameFormat] = useState(true);
  const [passwordFormat , setPasswordFormat] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const { isInitialLoading, isError, data, error, refetch, isFetching } =
  useQuery({
    queryKey: ['user',`/users/login/${username}/${password}`],
    queryFn: fetchUserById,
    enabled: false,
  })

  const handleUserInfo = (e) => {
    e.preventDefault();
    console.log("userinfo");
    if (username.length <= 5) {
      setUsernameFormat(false);
    }else{
      setUsernameFormat(true);
    }
    if (password.length <= 5) {
      setPasswordFormat(false);
    }else{
      setPasswordFormat(true);
    }
    
    if(username.length > 5 && password.length > 5){
      console.log('format!');
      refetch();
    }

  };

  if (isInitialLoading) {
    console.log("initial loading");
  }

  if (data && !loginState) {
    console.log("success!");
    setLoginState(true);
    console.log(data);
    return <div>hi</div>
  }

  if(!loginState){
    return (
      <div className="loginContainer">
        <div className="cancel">X</div>
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
              className={`${usernameFormat ? '':'notFormat'}`}
            />
            <div className={`remind ${usernameFormat ? '' : 'errorInput'}`}>Username length must greater than 5!</div>
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`${usernameFormat ? '':'notFormat'}`}
            />
            <div className={`remind ${passwordFormat ? '' : 'errorInput'}`}>Password length must greater than 5!</div>
          </div>
          <div className="option">
            <span>Forgot Password?</span>
            <span>Sign up</span>
          </div>
          <input
            type="submit"
            className={`submitButton ${username && password ? "activated" : ""}`}
            value="Login"
            disabled={!(username&&password)}
          />
        </form>
      </div>
    );
  }
}
