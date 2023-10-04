import React, { useEffect, useState } from "react";
import "../Style/UserIcon.css";
import userIcon from "../Assets/labixiaoxin.jpg";
import arrowRight from "../Assets/arrow-right.png";
import { fetchUserByToken } from "./FetchAPI";
import { useQuery } from "@tanstack/react-query";
import anonymousUser from "../Assets/anonymousUser.png";
import Login from "./Login";
import { useNavigate } from "react-router-dom";

export default function UserIcon() {
  const [isHovered, setIsHovered] = useState(false);
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [loginForm, setLoginForm] = useState(false);
  const nav = useNavigate();

  useEffect(() => {
    console.log("User icon page: token is change...");
  }, [token]);

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
    console.log("Error!!! :");
    console.error(userError)
  },[userError]);

  const {
    isLoading:statIsLoading,
    isError:statIsError,
    data: userStatData,
    refetch: statRefetch,
    error:statError,
  } = useQuery({
    queryKey: ["articles", `follow/stat/${userData ? userData.userId : ''}`],
    queryFn: fetchUserByToken,
    enabled: false,
  });

  if (token) {
    console.log("detect token, get user info by token");
    userRefetch();
    console.log(userData);
  }
  if (userData) {
    statRefetch();
  }

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const logout = () => {
    localStorage.removeItem("token");
    nav("/home");
    window.location.reload();
  };


  if (token && userData && userStatData) {
    return (
      <div className="container">
        <div
          className={`userIcon ${isHovered ? "hovered" : ""}`}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <img src={userIcon} alt="User Icon" />
        </div>
        <div
          className={`dropdown ${isHovered ? "visible" : ""}`}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <div className="userName">{userData.userName}</div>
          <ul>
            <li className="userInfo">
              <div>
                <p className="number">{userStatData.following}</p>
                <p className="type">Following</p>
              </div>
              <div>
                <p className="number">{userStatData.follower}</p>
                <p className="type">Follower</p>
              </div>
              <div>
                <p className="number">{userStatData.articles}</p>
                <p className="type">Articles</p>
              </div>
            </li>
            <li>
              Profile <img src={arrowRight} alt="Arrow Right" />
            </li>
            <li>
              Settings <img src={arrowRight} alt="Arrow Right" />
            </li>
            <li onClick={logout}>
              Logout <img src={arrowRight} alt="Arrow Right" />
            </li>
          </ul>
        </div>
      </div>
    );
  }

    return (
      <>
        <div className="container">
          <div className="userIcon anonymous">
            <img
              src={anonymousUser}
              onClick={() => {
                setLoginForm(!loginForm);
              }}
            />
          </div>
        </div>
        {loginForm ? <Login /> : ""}
      </>
    );
}
