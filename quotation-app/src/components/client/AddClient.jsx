import React from "react";
import "./addclient.css";
import Sidebar from "../sidebar/Sidebar";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

import axios from "axios";
import { Link } from "react-router-dom";
// import { Outlet } from "react-router-dom";
export default function AddClient() {
  const navigate = useNavigate();
  let companies = [];
  const [selectCompany, setSelectCompany] = useState(); //selectCompany is the value of the selected option
  const [client, setClient] = useState();
  const [clientAddress, setClientAddress] = useState();

  const [company, setCompany] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/companies").then((response) =>
      response.json().then((data) => {
        // console.log(data);
        setCompany(data);
      })
    );
  }, []);

  Object.entries(company).map((company) => {
    companies.push(company[1]["name"]);
  });
  console.log(companies);

  const handleSubmit = (e) => {
    e.preventDefault();
    const clientData = { selectCompany, client, clientAddress };
    console.log(clientData);
    axios({
      method: "post",
      url: "http://localhost:5000/addClient",
      data: clientData,
    }).then((res) => {
      // res.json();
      console.log(res);
      if (res.status === 200) {
        console.log("Company Added");
        navigate("/client");
      }
    });
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
              <h5 className="mb-4">Add new Client</h5>
              <Form>
                <Form.Label>Select Company</Form.Label>
                <Form.Select
                  aria-label="Default select example"
                  size="sm"
                  className="mb-3"
                  value={selectCompany}
                  defaultValue={"ReCH"}
                  onChange={(e) => setSelectCompany(e.target.value)}
                >
                  {companies.map((company) => (
                    <option value={company} key={company}>
                      {company}
                    </option>
                  ))}
                </Form.Select>
                <Form.Group className="mb-3" controlId="exampleForm.ClientName">
                  <Form.Label>Name*</Form.Label>
                  <Form.Control
                    type="text"
                    required
                    placeholder="ReCH"
                    onChange={(e) => setClient(e.target.value)}
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.Addresses">
                  <Form.Label>Client Address</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={5}
                    onChange={(e) => setClientAddress(e.target.value)}
                  />
                </Form.Group>
                <Button variant="dark" size="sm" onClick={handleSubmit}>
                  ADD CLIENT
                </Button>{" "}
              </Form>
            </div>
          </div>
        </div>
      </div>
      {/* <Outlet /> */}
    </>
  );
}
