import React from "react";
import "./companies.css";
import Sidebar from "../sidebar/Sidebar";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import RechLogo from "../../assets/rechlogo.jpeg";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import MoonLoader from "react-spinners/MoonLoader";

export default function Companies(props) {
  const companies = [];
  const allCompaniesLogos = [];
  const [company, setCompany] = useState([]);
  let [loading, setLoading] = useState(true);
  useEffect(() => {
    fetch("http://localhost:5000/companies").then((response) =>
      response.json().then((data) => {
        // console.log(data);
        setCompany(data);
        setLoading(false);
      })
    );
  }, []);
  // console.log("company:", company[0]["name"]);
  // console.log("company:", company[0]["logo"]["image"]);
  // console.log(company);
  // console.log(Object.entries(company).map((company) => company[1]["name"]));
  // const image = company[6]["logo"]["image"];
  Object.entries(company).map((company) => {
    // console.log(company);
    // console.log(companies);
    companies.push(company[1]["name"]);
    allCompaniesLogos.push(company[1]["logo"]["image"]);
  });

  console.log(allCompaniesLogos);

  // Object.entries(props["companies"]).map((company) => {
  //   //console.log(company);
  //   //console.log(company[1]["client"]);
  //   console.log(company[1]["name"]);
  //   companies.push(company[1]["name"]);
  // });

  const handlClick = (e) => {
    e.preventDefault();
    console.log(e);
    console.log("Cliecked");
  };

  return (
    <>
      <div className="row">
        <div className="col-2">
          <Sidebar />
        </div>
        <div className="col-10">
          <div className="container">
            <div className="jumbotron" id="addQuotationJumbotron">
              <div className="row">
                <div className="col-10">
                  <h5 className="mb-4">Companies</h5>
                </div>
                <div className="col-2">
                  <Link className="link-button" to="/addCompany">
                    <Button variant="dark" size="sm">
                      {"  + ADD COMPANY"}
                    </Button>{" "}
                  </Link>
                </div>
              </div>
              <div className="row">
                {loading ? ( // if loading is true, display loading icon
                  <div className="sweet-loading">
                    <MoonLoader
                      // css={CSSProperties}
                      color={"#DB7A33"}
                      loading={loading}
                      size={50}
                    />
                  </div>
                ) : (
                  <></>
                )}
                {companies.map((company) => {
                  return (
                    <div
                      className="col-auto company-card"
                      key={company}
                      // onClick={handlClick}
                    >
                      {/* <a href="" className="a-company-name"> */}
                      <Link
                        className="a-company-name"
                        to={`/companysettings/${company}`}
                      >
                        <Card
                          border="light"
                          style={{ width: "6rem", height: "10rem" }}
                          // onClick={handlClick}
                          // value={company}
                          key={company}
                        >
                          <Card.Img
                            variant="top"
                            src={allCompaniesLogos.shift()}
                            className="company-logo"
                            key={company}
                          />
                          <Card.Body>
                            <center>
                              {/* <Card.Text>{company}</Card.Text> */}
                              <p className="p-company-name" key={company}>
                                {company}
                              </p>
                            </center>
                            {/* <Button variant="primary">Go somewhere</Button> */}
                          </Card.Body>
                        </Card>
                        {/* </a> */}
                      </Link>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
