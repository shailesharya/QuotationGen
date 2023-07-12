import React from "react";
import "./clientprojects.css";
import Sidebar from "../sidebar/Sidebar";
import Button from "react-bootstrap/Button";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import MoonLoader from "react-spinners/MoonLoader";
import Modal from "react-bootstrap/Modal";
import axios from "axios";

export default function ClientProjects() {
  const navigate = useNavigate();

  let [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [clientData, setclientData] = useState(["empty"]);

  // MOdel stuff
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);

  let clientID = window.location.href.split("/")[4];
  //   replace %20 with space
  clientID = clientID.replace(/%20/g, " ");
  console.log(clientID);

  useEffect(() => {
    fetch("http://localhost:5000/clientprojects/" + clientID).then((response) =>
      response.json().then((data) => {
        console.log("DAta:", data);
        // if field exists
        if (data[0]["Client"][0]["Projects"]) {
          console.log("Projects exist");
          console.log(data[0]["Client"][0]["client_name"]);
          data[0]["Client"].map((client) => {
            // console.log(client["client_name"]);
            if (client["client_name"] === clientID) {
              setclientData(client);
            }
            // setclientData((prev) => [...prev, client]);
          });
          setData(data);
          setLoading(false);
        } else {
          console.log("Projects do not exist");
          setLoading(false);
        }
      })
    );
  }, []);
  console.log("ClientData:", clientData);
  console.log("ClientData:", clientData["client_name"]);
  // console.log(clientData["Projects"][0]["Project Name"]);
  const [projectName, setProjectName] = useState();
  const handleShow = (e, projectName) => {
    setShow(true);
    setProjectName(projectName);
    console.log("ProjecrName from HanldeShow:", projectName);
  };

  const handleSave = (e) => {
    // prevent default
    console.log("Project Name from HandleSave:", projectName);
    console.log("Client Name:", clientData["client_name"]);
    const clientName = clientData["client_name"];
    setShow(false);
    axios
      .get(`http://localhost:5000/clientprojects/${clientName}/${projectName}`)
      .then(
        (response) => {
          console.log(response);
          if (response.status === 200) {
            console.log("Project Deleted Successfully");
            window.location.reload(true);
            // navigate(`/clientprojects/${clientName}`);
          }
        }
        // .catch((err) => {
        //   console.log(err);
        // })
      );
  };

  const handleEdit = (e, projectName) => {
    console.log("Edit");
    navigate(`/editquotation/${projectName}`);
  };

  const handleView = (e, projectName) => {
    console.log("View");
    console.log("Project Name:", projectName);
    navigate(`/viewquotation/${projectName}`);
  };

  const handleRemoveClient = (e) => {
    alert("Are you sure you want to remove this client?");

    console.log("Remove Client");
    console.log("Client Name:", clientData["client_name"]);
    const clientName = clientData["client_name"];
    // axios delete request
    axios.delete(`http://localhost:5000/clientprojects/${clientName}`).then(
      (response) => {
        console.log(response);
        if (response.status === 200) {
          console.log("Client Deleted Successfully");
          navigate("/client");
        }
      }
      // .catch((err) => {
      //   console.log(err);
      // })
    );
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
                <div className="col-8">
                  <h5 className="mb-4">
                    {/* Quotes for {clientID} [{data[0]["name"]}]s */}
                    Quotes for {clientID}
                  </h5>
                </div>
                <div className="col-4">
                  {/*  2 buttons in same row */}
                  <div className="row float-end">
                    <div className="col-auto">
                      <Button variant="dark" size="sm">
                        <Link
                          className="link-button"
                          to={`/addquotation/${clientID}`}
                        >
                          {"  + ADD QUOTATION"}
                        </Link>
                      </Button>{" "}
                    </div>
                    <div className="col-auto">
                      <Button
                        variant="outline-dark"
                        size="sm"
                        onClick={handleRemoveClient}
                      >
                        {"REMOVE CLIENT"}
                      </Button>{" "}
                    </div>
                  </div>
                </div>
              </div>
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
                <>
                  <table className="table">
                    <thead>
                      <tr>
                        <th scope="col">Date</th>
                        <th scope="col" colSpan="4">
                          Project Name
                        </th>
                        <th scope="col">Version</th>
                        <th scope="col">Status</th>
                        {/* span 3 columns */}
                        <th scope="col" colSpan="1">
                          Actions
                        </th>
                      </tr>
                      {
                        // if clientData["Projects"] exists, map through it
                        clientData["Projects"] &&
                          Object.entries(clientData["Projects"]).map((data) => {
                            console.log("clientData['Projects']:", data);
                            return (
                              <>
                                <tr>
                                  <td>{data[1]["date"]}</td>
                                  <td colSpan="4">{data[1]["projectName"]}</td>
                                  {/* <td>{project["version"]}</td> */}
                                  <td>Version</td>
                                  {/* <td>{project["status"]}</td> */}
                                  <td>
                                    <Button variant="outline-dark" size="sm">
                                      SEND TO CLIENT
                                    </Button>
                                  </td>
                                  <td className="buttons-group">
                                    <Button
                                      variant="dark"
                                      size="sm"
                                      onClick={(e) => {
                                        handleView(e, data[1]["projectName"]);
                                      }}
                                    >
                                      VIEW
                                    </Button>
                                    <Button
                                      variant="outline-dark"
                                      size="sm"
                                      onClick={(e) => {
                                        handleEdit(e, data[1]["projectName"]);
                                      }}
                                    >
                                      EDIT
                                    </Button>
                                    <Button
                                      variant="outline-dark"
                                      size="sm"
                                      // onClick={handleDelete}
                                      onClick={(e) =>
                                        handleShow(e, data[1]["projectName"])
                                      }
                                    >
                                      DELETE
                                    </Button>
                                  </td>
                                </tr>
                              </>
                            );
                          })
                      }
                    </thead>
                  </table>
                </>
              )}
              <Modal show={show} onHide={handleClose} className="modal">
                <Modal.Header closeButton>
                  <Modal.Title>Confirmation Required</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <b>Are you sure you want to delete this quote!!!</b>
                </Modal.Body>
                <Modal.Footer>
                  <Button
                    variant="outline-dark"
                    onClick={handleClose}
                    size="sm"
                  >
                    Close
                  </Button>
                  <Button variant="dark" onClick={handleSave} size="sm">
                    Save Changes
                  </Button>
                </Modal.Footer>
              </Modal>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
