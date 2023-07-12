import React from "react";
import "./client.css";
import Sidebar from "../sidebar/Sidebar";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import RechLogo from "../../assets/react.svg";
import { Link } from "react-router-dom";
import Form from "react-bootstrap/Form";
import { useState, useEffect } from "react";
import MoonLoader from "react-spinners/MoonLoader";
import ClientLogo from "../../assets/client.png";

export default function Client(props) {
  const CSSProperties = {
    display: "block",
    margin: "0 auto",
    color: "#DB7A33",
    // display in center of page
  };
  let companies = [];
  let allClients = [];
  const [company, setCompany] = useState([]); // company is an array of objects (each object is a company)
  const [selectCompany, setSelectCompany] = useState("Technicolor"); // company is an array of objects (each object is a company)");
  const [client, setClient] = useState([]); // company is an array of objects (each object is a company)
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

  Object.entries(company).map((company) => {
    companies.push(company[1]["name"]);
  });
  // console.log(companies);

  const handleOnChange = (e) => {
    setSelectCompany(e.target.value);
    // console.log(e.target.value);
  };
  Object.entries(company).map((company) => {
    if (selectCompany === company[1]["name"]) {
      try {
        // console.log(company[1]["name"]);
        // console.log(company[1]["address"]);
        // console.log(company[1]);
        // console.log(company[1]["Client"][0]["client_name"]);
        Object.entries(company[1]["Client"]).map((client) => {
          // console.log(client[1]["client_name"]);
          allClients.push(client[1]["client_name"]);
        });
      } catch (error) {
        // console.log("No client");
        allClients.push("No client");
      }

      // allClients.push(company[1]["Client"][0]["client_name"]);
    }
  });
  // console.log(selectCompany);
  // console.log(company[0]["name"]);

  // console.log("ALL clients:", allClients);
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
                <div className="col-8">
                  <h5 className="mb-4">All Clients</h5>
                </div>

                <div className="col-2">
                  <Form.Select
                    aria-label="Default select example"
                    size="sm"
                    value={selectCompany}
                    onChange={(e) => handleOnChange(e)}
                  >
                    {companies.map((company) => (
                      <option value={company} key={company}>
                        {company}
                      </option>
                    ))}
                  </Form.Select>
                </div>

                <div className="col-2">
                  <Link className="link-button" to="/addClient">
                    {" "}
                    <Button variant="dark" size="sm">
                      + ADD CLIENT
                    </Button>{" "}
                  </Link>
                </div>
              </div>

              <div className="row">
                {loading ? ( // if loading is true, display loading icon
                  <div className="sweet-loading">
                    {/* <center> */}
                    <MoonLoader
                      // css={CSSProperties}
                      color={"#DB7A33"}
                      loading={loading}
                      size={50}
                    />
                    {/* </center> */}
                  </div>
                ) : (
                  <></>
                )}
                {allClients.map((client) => {
                  console.log(client);
                  return (
                    <div className="col-auto company-card" key={client}>
                      {/* <a href="" className="a-company-name"> */}
                      <Link
                        className="a-company-name"
                        to={`/clientprojects/${client}`}
                      >
                        <Card
                          border="light"
                          style={{ width: "6rem", height: "10rem" }}
                        >
                          <Card.Img
                            variant="top"
                            src={ClientLogo}
                            className="client-logo"
                          />

                          <Card.Body>
                            <center>
                              {/* <Card.Text>{company}</Card.Text> */}
                              <p className="p-company-name">{client}</p>
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
