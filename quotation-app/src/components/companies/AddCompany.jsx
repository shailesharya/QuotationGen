import React from "react";
import "./addcompany.css";
import Sidebar from "../sidebar/Sidebar";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
export default function AddCompany() {
  const [companyName, setCompanyName] = useState("");
  const [logo, setLogo] = useState("");
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    const company = { companyName, logo };
    console.log(company);
  };
  return (
    <>
      <div class="row">
        <div class="col-2">
          <Sidebar />
        </div>
        <div class="col-10">
          <div class="container">
            <div className="jumbotron" id="addQuotationJumbotron">
              <h5 class="mb-4">Add new Company</h5>
              <Form onSubmit={handleSubmit}>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Label>Company Name*</Form.Label>
                  <Form.Control
                    type="text"
                    required
                    placeholder="ReCH"
                    name="name"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.UploadFile">
                  <Form.Label>Upload Logo*</Form.Label>
                  <Form.Control
                    type="file"
                    required
                    size="sm"
                    name="logo"
                    value={logo}
                    onChange={(e) => setLogo(e.target.value)}
                    // onChange={handleChange}
                    // isInvalid={!!errors.file}
                  />
                </Form.Group>
                <Button
                  variant="dark"
                  size="sm"
                  type="submit"
                  onClick={() =>
                    navigate("/AddCompanyPg2", {
                      state: {
                        companyName: companyName,
                        companyLogo: logo,
                      },
                    })
                  }
                >
                  ADD COMPANY
                </Button>{" "}
              </Form>
              <p>{companyName}</p>
              <p>{logo}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
