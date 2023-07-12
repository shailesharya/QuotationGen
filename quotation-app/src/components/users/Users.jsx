import React, { useState } from "react";
import "./users.css";
import Sidebar from "../sidebar/Sidebar";
import Button from "react-bootstrap/Button";
import { auth, provider } from "../login/config";
import { useNavigate } from "react-router-dom";
import MoonLoader from "react-spinners/MoonLoader";
import Card from "react-bootstrap/Card";
export default function Users() {
  const user = auth.currentUser;
  // const [user, setUser] = useState("");
  //  console.log("user", user);
  // console.log("user", user.displayName);
  console.log("auth", auth);
  console.log("Current User:", auth["currentUser"]);
  if (auth["currentUser"]) {
    console.log("auth", auth.currentUser.displayName);
    // setUser(auth["currentUser"]);
  } else {
    console.log("authElase", auth.currentUser);
    // setUser("empty AF");
  }

  console.log("user", user);

  let navigate = useNavigate();
  const handleClick = () => {
    localStorage.clear();
    // auth.signOut();
    // reload page
    navigate("/");
  };
  return (
    <>
      <div class="row">
        <div class="col-2">
          <Sidebar />
        </div>
        <div class="col-10">
          <div class="container">
            {/* <h4 className="mb-2 mt-5">User</h4> */}
            <div className="jumbotron" id="userJumbotron">
              <center>
                {" "}
                <img
                  className="mb-3"
                  src={user.photoURL}
                  alt=""
                  id="userPhotoUrl"
                />
              </center>

              <p className="mb-2 h3">{user.displayName}</p>
              <p className="mb-2">{user.email}</p>
              <p className="mb-2">Last Login: {user.metadata.lastSignInTime}</p>
              <Button className="LogIn" size="sm" onClick={handleClick}>
                Log out
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
