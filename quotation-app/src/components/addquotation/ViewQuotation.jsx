import React from "react";
import "./quotationpreview.css";
import Sidebar from "../sidebar/Sidebar";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import { AiFillPrinter } from "react-icons/ai";
import { useState, useEffect } from "react";
import MoonLoader from "react-spinners/MoonLoader";
import FormGroup from "react-bootstrap/esm/FormGroup";
import Form from "react-bootstrap/Form";

export default function ViewQuotation() {
  const Print = () => {
    //console.log('print');
    let printContents = document.getElementById(
      "addQuotationJumbotron"
    ).innerHTML;
    let originalContents = document.body.innerHTML;
    document.body.innerHTML = printContents;
    window.print();
    document.body.innerHTML = originalContents;
  };

  const [projectData, setProjectData] = useState(["empty"]);
  const [loading, setLoading] = useState(true);
  let projectName = window.location.pathname.split("/")[2];
  projectName = projectName.replace(/%20/g, " ");

  useEffect(() => {
    fetch("http://localhost:5000/viewquotation/" + projectName).then((res) =>
      res.json().then((data) => {
        // console.log("data:", data);
        setProjectData(data);
        setLoading(false);
      })
    );
  }, []);
  console.log("Project Data:", projectData);
  let count = 0;
  // convert camel case to normal
  function camelCaseToNormal(str) {
    return str.replace(/([A-Z])/g, " $1").replace(/^./, function (str) {
      return str.toUpperCase();
    });
  }

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
                  {/* <h5 className="mb-4">Summary</h5> */}
                  <h3 className="mb-0">
                    PROJECT: {projectData["projectName"]}
                  </h3>
                </div>
                <div className="col-2">
                  <Link className="link-button" to="/">
                    {" "}
                    <Button variant="dark" size="sm" onClick={Print}>
                      {<AiFillPrinter size="20" />} PRINT
                    </Button>{" "}
                  </Link>
                </div>
              </div>
              {/* <p className="mb-3">DATE: {new Date().toLocaleString() + ""}</p> */}

              {/* check for loading */}
              {loading ? (
                <div className="sweet-loading">
                  <MoonLoader
                    // css={CSSProperties}
                    color={"#DB7A33"}
                    loading={loading}
                    size={50}
                  />
                </div>
              ) : (
                <>
                  {/* check for clientData */}
                  {projectData[0] === "empty" || projectData === "undefined" ? (
                    <p>Loading...</p>
                  ) : (
                    <>
                      <h4 className="mt-2 mb-1">CLIENT DETAILS</h4>
                      <table className="table-sm company-detail-table mt-0 mb-3">
                        <tr>
                          <th>Company Name</th>
                          <th>{projectData["name"]}</th>
                        </tr>
                        <tr>
                          <th>Client Name</th>
                          <th>{projectData["client_name"]}</th>
                        </tr>
                        <tr>
                          <th>Email</th>
                          <th>{projectData["contactEmail"]}</th>
                        </tr>
                        <tr>
                          {" "}
                          <th>Phone</th>
                          <th>{projectData["contactPhone"]}</th>
                        </tr>
                        <tr>
                          <th>Address</th>
                          <th>{projectData["client_address"]}</th>
                        </tr>
                      </table>

                      <h5 className="mb-2">PURPOSE OF THE DOCUMENT</h5>

                      <p className="mb-2">
                        {projectData["project"]["purposeOfDocument"]}
                      </p>

                      <h5 className="mb-2">ROLES & RESPONSIBILITY</h5>
                      <table className="table company-detail-table ">
                        <tr>
                          <td>Sr. No</td>
                          <th>Name</th>
                          <th>Role</th>
                          <th>Responsibility</th>
                        </tr>
                        {Object.entries(
                          projectData["project"]["responsibility"]
                        ).map(([key, value], index) => {
                          // console.log("key:", key);
                          // console.log("value:", value);
                          return (
                            <tr>
                              <td>{index + 1}</td>
                              <th>{projectData["project"]["name"][index]}</th>
                              <th>
                                {camelCaseToNormal(
                                  projectData["project"]["role"][index]
                                )}
                              </th>
                              <th>{value}</th>
                            </tr>
                          );
                        })}
                      </table>

                      <h5 className="mb-2">BUDGET</h5>
                      <table className="table company-detail-table ">
                        <tr>
                          <td>Sr Num</td>
                          <th>Description</th>
                          <td>Quantity</td>
                          <td>Rate is USD</td>
                          <td>Unit Cost in USD</td>
                        </tr>
                        {Object.entries(
                          projectData["project"]["budget"][0]
                        ).map(([key, value], index) => {
                          // console.log("key:", key);
                          // console.log("value:", value);
                          if (
                            key.includes("Quantity") &&
                            parseInt(value) !== 0
                          ) {
                            console.log(
                              camelCaseToNormal(
                                key.replace("Quantity", "").replace("Price", "")
                              )
                            );
                            count++;
                            return (
                              <tr>
                                <td>{count}</td>
                                <th>{camelCaseToNormal(key)}</th> {/* item */}
                                {/* quantity */}
                                <td>
                                  {projectData["project"]["budget"][0][key]}
                                </td>
                                {/* rate in USD */}
                                <td>
                                  {
                                    projectData["project"]["budget"][0][
                                      key.replace("Quantity", "Price")
                                    ]
                                  }
                                </td>
                                {/* unit cost in USD */}
                                <td>
                                  {projectData["project"]["budget"][0][
                                    key.replace("Quantity", "Price")
                                  ] * projectData["project"]["budget"][0][key]}
                                </td>
                              </tr>
                            );
                          } else {
                            return null;
                          }
                        })}
                      </table>
                    </>
                  )}

                  <h5 className="mb-2">TERMS & CONDITION</h5>
                  <FormGroup size="sm">
                    <Form.Control
                      size="sm"
                      className="text-area"
                      as="textarea"
                      name="purposeOfDocument"
                      style={{ height: "300px" }}
                      defaultValue={projectData["terms"]}
                      disabled
                    />
                  </FormGroup>

                  <b>
                    <p className="mb-5 mt-5">SIGNED</p>
                    <p className="mb-5">NAME</p>
                    <p className="mb-5">COMPANY</p>
                    <p className="mb-5">DATE</p>
                  </b>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
