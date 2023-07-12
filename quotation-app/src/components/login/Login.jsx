import React from "react";

import Button from "react-bootstrap/Button";
import "./login.css";
import rechLogo from "../../assets/rechlogo.jpeg";
import facebookLogo from "../../assets/facebook.svg";
import googleLogo from "../../assets/google.svg";
import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { auth, provider } from "./config";
import { signInWithPopup } from "firebase/auth";
//import { admin } from "firebase-admin";
import { useNavigate } from "react-router-dom";

export default function () {
  const navigate = useNavigate();

  console.log("auth", auth);
  const databse = {
    email: "arya@gmail.com",
    pass: "123456",
  };
  const [email, setEmail] = useState("");
  const [passw, setPassw] = useState("");
  const [dataInput, setDataInput] = useState("");
  const submitThis = () => {
    const info = { email: email, passw: passw };
    setDataInput([info]);
    console.log(info);
    alert(info["email"] + "-" + info["passw"]);
    if (info["email"] === databse["email"]) {
      if (info["passw"] === databse["pass"]) {
        alert("Login Successfull");
      } else {
        alert("Wrong Password");
      }
    } else {
      alert("Wrong Email");
    }
  };
  const [value, setValue] = useState("");
  const handleClick = () => {
    signInWithPopup(auth, provider).then((data) => {
      setValue(data.user.email);
      localStorage.setItem("email", data.user.email);
    });
  };
  useEffect(() => {
    setValue(localStorage.getItem("email"));
  });

  return (
    <div className="container-bg">
      {value ? (
        navigate("/users", {
          user: value,
        })
      ) : (
        <div className="container">
          <div className="jumbotron" id="login-jumbotron">
            <img src={rechLogo} alt="" id="rechLogo" />
            <form onSubmit={submitThis}>
              <div className="form-group">
                <label for="exampleInputEmail1">Email*</label>
                <input
                  type="email"
                  className="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  placeholder="example@rech.com"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="form-group ">
                <label for="exampleInputPassword1">Password*</label>
                <input
                  type="password"
                  className="form-control"
                  id="exampleInputPassword1"
                  placeholder="Password"
                  onChange={(e) => setPassw(e.target.value)}
                />
              </div>

              <div className="d-grid gap-2">
                <center>
                  <NavLink to="/companies">
                    <Button className="LogIn" size="sm" type="submit">
                      LOGIN
                    </Button>
                  </NavLink>
                </center>
              </div>
            </form>

            <hr className="hr-text" data-content="OR"></hr>

            <div className="other-platform">
              <a onClick={handleClick}>
                <img src={googleLogo} alt="" id="googleLogo" />
              </a>
              <a href="">
                <img src={facebookLogo} alt="" id="facebookLogo" />
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
