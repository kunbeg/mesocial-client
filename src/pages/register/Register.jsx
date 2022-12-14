import "./register.css"
import React from 'react'
import { useRef } from "react";
import {axiosInstance} from "../../config";
import {useHistory,Link} from "react-router-dom"

export default function Register() {
    const username = useRef();
    const email = useRef();
    const password = useRef();
    const passwordAgain = useRef();
    const history = useHistory()
    const handleSubmit = async(e)=>{
      e.preventDefault()
      if(passwordAgain.current.value !== password.current.value){
        passwordAgain.current.setCustomValidity("Passwords don't match")
      }
      else{
        const user = {
          username: username.current.value,
          email: email.current.value,
          password: password.current.value,
        };
        try{
          await axiosInstance.post("/auth/register", user);
          history.push("/login")
        }catch(err){
          console.log(err);
        }
      }
    }
    return (
      <div className="login">
        <div className="loginWrapper">
          <div className="loginLeft">
            <h3 className="loginLogo">MeSocial</h3>
            <span className="loginDesc">
              Connect with friends and the world around you on MeSocial.
            </span>
          </div>
          <div className="loginRight">
            <form className="loginBox" onSubmit={handleSubmit}>
              <input
                placeholder="Username"
                className="loginInput"
                ref={username}
              />
              <input
                placeholder="Email"
                type="email"
                className="loginInput"
                ref={email}
              />
              <input
                placeholder="Password"
                className="loginInput"
                type="password"
                ref={password}
              />
              <input
                placeholder="Password Again"
                className="loginInput"
                type="password"
                ref={passwordAgain}
              />
              <button className="loginButton" type="submit">
                Sign Up
              </button>
              <Link to={`/login`}>
                <button className="loginRegisterButton">
                  Log into your Account
                </button>
              </Link>
            </form>
          </div>
        </div>
      </div>
    );
}
