import React from "react";
import "./addcompanypg2.css";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Sidebar from "../sidebar/Sidebar";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import FileBase64 from "react-file-base64";

export default function AddCompanyPg2(props) {
  // console.log(props["companies"]);

  const { state } = useLocation();
  const navigate = useNavigate();
  const [companyName, setCompanyName] = useState(state.companyName);
  const [companyLogo, setCompanyLogo] = useState({ image: "" });
  // const [companyLogo, setCompanyLogo] = useState();
  const [address, setAddress] = useState(state.address);
  const [terms, setTerms] = useState(state.terms);
  // console.log(state.companyLogo);
  // console.log(state.companyName);
  console.log(companyName + " " + companyLogo + " " + address + " " + terms);
  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      name: companyName,
      logo: companyLogo,
      address: address,
      terms: terms,
    };
    console.log(data);
    fetch("http://localhost:5000/addcompanypg2", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(data),
    }).then((res) => {
      res.json();
      console.log(res);
      if (res.status === 200) {
        console.log("Company Added");
        navigate("/companies");
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
              <h5 className="mb-4">Company Settings (Logo)</h5>
              <Form>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Label>Company Name</Form.Label>
                  <Form.Control
                    type="text"
                    required
                    placeholder="ReCH"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.UploadFile">
                  <Form.Label>Change Logo</Form.Label>
                  {/* <Form.Control
                    type="file"
                    required
                    name="file"
                    size="sm"
                    onChange={(e) => setCompanyLogo(e.target.value)}
                    // onChange={handleChange}
                    // isInvalid={!!errors.file}
                  /> */}
                  <br />
                  <FileBase64
                    type="file"
                    multiple={false}
                    onDone={({ base64 }) =>
                      setCompanyLogo({ ...companyLogo, image: base64 })
                    }
                  />
                </Form.Group>
                {/* Addresses */}
                <Form.Group className="mb-3" controlId="exampleForm.Addresses">
                  <Form.Label>Address</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                </Form.Group>
                {/* Terms And conditions */}
                <Form.Group className="mb-3" controlId="exampleForm.terms">
                  <Form.Label>Terms and Conditions</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={5}
                    onChange={(e) => setTerms(e.target.value)}
                  />
                </Form.Group>
                <Button
                  variant="dark"
                  size="sm"
                  // onClick={() => {
                  //   Object.entries(props["companies"]).push({
                  //     companyName: companyName,
                  //     companyLogo: companyLogo,
                  //   });
                  //   console.log(
                  //     "From addcompany2:" + Object.entries(props["companies"])
                  //   );
                  //   navigate("/companies", {
                  //     state: {
                  //       companyName: companyName,
                  //       companyLogo: companyLogo,
                  //     },
                  //   });
                  // }}
                  onClick={handleSubmit}
                >
                  SAVE
                </Button>{" "}
              </Form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
