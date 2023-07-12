import React from "react";
import "rsuite/dist/rsuite.min.css";
import "./sidebar.css";
import RechLogo from "../../assets/rechlogo1.svg";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

import { NavLink } from "react-router-dom";

// import { BsPersonBadge } from "react-icons/bs";
import { BsFillPeopleFill } from "react-icons/bs";
import { BsFillBuildingFill } from "react-icons/bs";
import { IoLogOut } from "react-icons/io5";
import { AiFillSetting } from "react-icons/ai";

export default function Sidebar() {
  // const navLinkStyle = ({ isActive }) => {
  //   return {
  //     // change link color on hover if link is not active
  //     link: {
  //       textDecoration: "none",
  //       "&:hover": {
  //         textDecoration: "none",
  //         color: "red",
  //       },
  //     },

  //     // On active change color
  //     fontWeight: isActive ? "bold" : "normal",
  //     color: isActive ? "white" : "grey",
  //     textDecoration: "none",
  //   };
  // };
  return (
    <div className="row">
      <div className="col-2">
        <Navbar
          fixed="top"
          className="side-bar"
          // bg="dark"
          variant="dark"
          style={{ backgroundColor: "black" }}
        >
          <Nav defaultActiveKey="/home" className="flex-column">
            <div>
              <img src={RechLogo} alt="" id="rechLogoSidebar" />
              {/* <FaAmazon size="50px" color="black" /> */}
            </div>

            <Nav.Link eventKey="disabled" disabled>
              MENU
            </Nav.Link>

            <NavLink className="link" to="/companies">
              <BsFillBuildingFill size="20" /> &ensp;Companies
              {/* <Nav.Link eventKey="/companies">
                <BsFillBuildingFill size="20" /> &ensp;Companies
              </Nav.Link> */}
            </NavLink>
            <NavLink className="link" to="/client">
              <BsFillPeopleFill size="20" />
              &ensp; Client
            </NavLink>

            <Nav.Link eventKey="disabled" disabled>
              ACCOUNT
            </Nav.Link>
            <NavLink className="link" to="/">
              <AiFillSetting size="20" /> &ensp;Settings
            </NavLink>
            <NavLink className="link" to="/">
              <BsFillPeopleFill size="20" />
              &ensp; Users
            </NavLink>
            <NavLink className="link" to="/">
              <IoLogOut size="20" /> &ensp;Log Out
            </NavLink>
          </Nav>
        </Navbar>
      </div>
    </div>
  );
}
