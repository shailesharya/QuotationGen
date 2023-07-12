import React from "react";
import "./companysettings.css";
import axios from "axios";
import { useState, useEffect } from "react";
import Sidebar from "../sidebar/Sidebar";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import FileBase64 from "react-file-base64";
import { MoonLoader } from "react-spinners";

export default function CompanySettings() {
  // console.log(window.location.href);
  let companyID = window.location.href.split("/")[4];
  // console.log(companyID);
  const navigate = useNavigate();
  const [companyDetails, setCompanyDetails] = useState({});
  const [companyName, setCompanyName] = useState("");
  // const [companyLogo, setCompanyLogo] = useState("");
  const [companyLogo, setCompanyLogo] = useState({ image: "" });
  const [address, setAddress] = useState("");
  const [terms, setTerms] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:5000/companysettings/" + companyID).then(
      (response) =>
        response.json().then((data) => {
          console.log(data);
          setCompanyDetails(data[0]);
          setCompanyName(data[0]["name"]);
          setCompanyLogo(data[0]["logo"]);
          setAddress(data[0]["address"]);
          setTerms(data[0]["terms"]);
          setLoading(false);
        })
    );
  }, []);

  // console.log(companyDetails);
  // console.log(companyDetails["name"]);
  console.log("Company LOgo", companyLogo);

  // console.log(companyName + " " + companyLogo + " " + address + " " + terms);

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      name: companyName,
      logo: companyLogo,
      address: address,
      terms: terms,
    };
    console.log(data);
    fetch("http://localhost:5000//companysettings/" + companyID, {
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

  const handleDelete = (e) => {
    e.preventDefault();
    console.log("Delete");
    fetch("http://localhost:5000/companysettings/" + companyID, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
      },
    }).then((res) => {
      res.json();
      console.log(res);
      if (res.status === 200) {
        console.log("Company Deleted");
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
            {loading ? (
              <div className="sweet-loading">
                <MoonLoader color="#36D7B7" loading={loading} size={75} />
              </div>
            ) : (
              <>
                <div className="jumbotron" id="addQuotationJumbotron">
                  <h5 className="mb-4">
                    COMPANY SETTINGS
                    <img
                      src={companyLogo["image"]}
                      alt=""
                      className="company-settings-logo"
                    />
                  </h5>

                  <Form>
                    <Form.Group
                      className="mb-3"
                      controlId="exampleForm.ControlInput1"
                    >
                      <Form.Label>Company Name</Form.Label>
                      <Form.Control
                        type="text"
                        required
                        // placeholder={companyDetails["name"]}
                        value={companyName}
                        onChange={(e) => setCompanyName(e.target.value)}
                      />
                      <Button
                        variant="outline-dark"
                        size="sm"
                        onClick={handleDelete}
                        // className for align right bootstrap
                        className="mt-2 float-end"
                      >
                        Remove Company
                      </Button>{" "}
                    </Form.Group>
                    <Form.Group
                      className="mb-3"
                      controlId="exampleForm.UploadFile"
                    >
                      {/* class for margin on right */}
                      <Form.Label className="mr-2">Change Logo</Form.Label>

                      <FileBase64
                        type="file"
                        multiple={false}
                        onDone={({ base64 }) =>
                          setCompanyLogo({ ...companyLogo, image: base64 })
                        }
                      />
                    </Form.Group>
                    {/* Addresses */}
                    <Form.Group
                      className="mb-3"
                      controlId="exampleForm.Addresses"
                    >
                      <Form.Label>Address</Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={3}
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                      />
                    </Form.Group>
                    {/* Terms And conditions */}
                    <Form.Group className="mb-3" controlId="exampleForm.terms">
                      <Form.Label>Terms and Conditions</Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={10}
                        value={terms}
                        onChange={(e) => setTerms(e.target.value)}
                      />
                    </Form.Group>
                    <Button variant="dark" size="sm" onClick={handleSubmit}>
                      SAVE
                    </Button>{" "}
                  </Form>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
