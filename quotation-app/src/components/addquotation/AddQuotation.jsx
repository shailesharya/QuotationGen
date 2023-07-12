import React from "react";
import "./addquotation.css";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Sidebar from "../sidebar/Sidebar";
import Button from "react-bootstrap/Button";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import FormGroup from "react-bootstrap/esm/FormGroup";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import axios from "axios";

import Table from "react-bootstrap/Table";

export default function AddQuotation() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [clientData, setclientData] = useState([]); // client data for storing client data usage: Project NO.
  const [allItemsCounts, setallItemsCounts] = useState(1);

  const [total, setTotal] = useState({ total: 0 });

  // for setting PNO in quotation page
  let pno = 0;
  let clientID = window.location.href.split("/")[4];
  clientID = clientID.replace(/%20/g, " ");
  console.log("ClientID:", clientID);
  useEffect(() => {
    fetch("http://localhost:5000/clientprojects/" + clientID).then((res) =>
      res.json().then((data) => {
        if (data[0]["Client"][0]["Projects"]) {
          data[0]["Client"].map((client) => {
            console.log("client['client_name']:", client["client_name"]);
            if (client["client_name"] === clientID) {
              setclientData(client);
              setLoading(false);
            }
          });
        } else {
          console.log("Projects do not exist");
          setLoading(false);
        }
      })
    );
  }, []);

  // console.log("Client Data:", clientData);
  // check if clientData exists

  if (clientData["Projects"]) {
    Object.entries(clientData["Projects"]).map((client) => {
      pno += 1;
    });
  }
  console.log("ProjectNo:", pno + 1);

  const [quotationData, setQuotationData] = React.useState({
    date: "",
    projectNo: "",
    projectName: "",
    contactEmail: "",
    contactPhone: "",
    purposeOfDocument: "",

    name: [],
    role: [],
    responsibility: [],

    projectSummary: "",
    budget: [
      {
        executiveProducerQuantity: "0",
        executiveProducerPrice: "0",
        executiveProducer1Quantity: "0",
        executiveProducer1Price: "0",
        bizDevQuantity: "0",
        bizDevPrice: "0",
        prepQuantity: "0",
        prepPrice: "0",
        threeDArtistQuantity: "0",
        threeDArtistPrice: "0",
        flameArtistQuantity: "0",
        flameArtistPrice: "0",
        dmpQuantity: "0",
        dmpPrice: "0",
        fxQuantity: "0",
        fxPrice: "0",
        compositingQuantity: "0",
        compositingPrice: "0",
        gfxAssetsQuantity: "0",
        gfxAssetsPrice: "0",
        threeDAssetsQuantity: "0",
        threeDAssetsPrice: "0",
        officeRentalQuantity: "0",
        officeRentalPrice: "0",
        tpnQuantity: "0",
        tpnPrice: "0",
        marketingQuantity: "0",
        marketingPrice: "0",
        internetQuantity: "0",
        internetPrice: "0",
        phonesAndCablesQuantity: "0",
        phonesAndCablesPrice: "0",
        airShippingAndCarriersQuantity: "0",
        airShippingAndCarriersPrice: "0",
        externalBillingCostsQuantity: "0",
        externalBillingCostsPrice: "0",
        specialInsuranceQuantity: "0",
        specialInsurancePrice: "0",
        bankFeesQuantity: "0",
        bankFeesPrice: "0",
        accountingQuantity: "0",
        accountingPrice: "0",
        archivingQuantity: "0",
        archivingPrice: "0",
        standardsConversionQuantity: "0",
        standardsConversionPrice: "0",
        workingMealsQuantity: "0",
        workingMealsPrice: "0",
        postShippingMessengersQuantity: "0",
        postShippingMessengersPrice: "0",
        extendedMediaStorageQuantity: "0",
        extendedMediaStoragePrice: "0",
        fileCreationAndPostingQuantity: "0",
        fileCreationAndPostingPrice: "0",
        miscPostSoftwareCostsQuantity: "0",
        miscPostSoftwareCostsPrice: "0",
        softwareUpgradesForProjectQuantity: "0",
        softwareUpgradesForProjectPrice: "0",
      },
    ],
  });

  // List of items for budget
  const budgetItems = ["Executive Producer", "Executive Producer1", "Biz Dev"];
  const postProduction = [
    "Prep", // (R,P, MM/Tracking)
    "3D Artist",
    "Flame Artist / Roto",
    "DMP",
    "FX",
    "Compositing",
    "GFX Assets",
    "3D Assets",
  ];

  const productionExpenses = [
    "Office Rental",
    "TPN",
    "Marketing",
    "Internet",
    "Phones and Cables",
    "Air Shipping and Carriers",
    "External Billing Costs",
    "Special Insurance",
    "Bank Fees",
    "Accounting",
  ];

  const miscelleneousExpenses = [
    "Archiving",
    "Standards Conversion",
    "Working Meals",
    "Post Shipping Messengers",
    "Extended Media Storage",
    "File Creation and Posting",
    "Misc Post Software Costs",
    "Software Upgrades for Project",
  ];

  const budgetItemsCamelCase = convertToCamelCase(budgetItems);
  const postProductionCamelCase = convertToCamelCase(postProduction);
  const productionExpensesCamelCase = convertToCamelCase(productionExpenses);
  const miscelleneousExpensesCamelCase = convertToCamelCase(
    miscelleneousExpenses
  );

  const itemCount = budgetItemsCamelCase.concat(
    postProductionCamelCase,
    productionExpensesCamelCase,
    miscelleneousExpensesCamelCase
  );

  // console.log(itemCount);
  // changing the notation of the items to camelCase
  postProductionCamelCase.map((item, i) => {
    if (item === "3dArtist") {
      postProductionCamelCase[i] = "threeDArtist";
    } else if (item === "flameArtist/Roto") {
      postProductionCamelCase[i] = "flameArtist";
    } else if (item === "3dAssets") {
      postProductionCamelCase[i] = "threeDAssets";
    }
  });

  let role_name = "";
  let role = "";
  let responsibility = "";
  // console.log("Budget", quotationData["budget"][0]["executiveProducerPrice"]);
  const onChangeHandler = (e) => {
    if (e.target.name === "projectNo") {
      setQuotationData({ ...quotationData, [e.target.name]: e.target.value });
    }
    if (
      e.target.name === "name" ||
      e.target.name === "role" ||
      e.target.name === "responsibility"
    ) {
      // quotationData[e.target.name] = e.target.value;
      if (e.target.name === "name") {
        role_name = e.target.value;
      } else if (e.target.name === "role") {
        role = e.target.value;
      } else if (e.target.name === "responsibility") {
        responsibility = e.target.value;
      }
      console.log(quotationData);
    } else if (
      e.target.name.includes("Price") ||
      e.target.name.includes("Quantity")
    ) {
      if (e.target.name === "executiveProducerQuantity") {
        quotationData.budget[0][e.target.name] = e.target.value;
      } else if (e.target.name === "executiveProducerPrice") {
        quotationData.budget[0][e.target.name] = e.target.value;
      } else if (e.target.name === "executiveProducer1Quantity") {
        quotationData.budget[0][e.target.name] = e.target.value;
      } else if (e.target.name === "executiveProducer1Price") {
        quotationData.budget[0][e.target.name] = e.target.value;
      } else if (e.target.name === "bizDevQuantity") {
        quotationData.budget[0][e.target.name] = e.target.value;
      } else if (e.target.name === "bizDevPrice") {
        quotationData.budget[0][e.target.name] = e.target.value;
      } else if (e.target.name === "prepQuantity") {
        quotationData.budget[0][e.target.name] = e.target.value;
      } else if (e.target.name === "prepPrice") {
        quotationData.budget[0][e.target.name] = e.target.value;
      } else if (e.target.name === "threeDArtistQuantity") {
        quotationData.budget[0][e.target.name] = e.target.value;
      } else if (e.target.name === "threeDArtistPrice") {
        quotationData.budget[0][e.target.name] = e.target.value;
      } else if (e.target.name === "flameArtistQuantity") {
        quotationData.budget[0][e.target.name] = e.target.value;
      } else if (e.target.name === "flameArtistPrice") {
        quotationData.budget[0][e.target.name] = e.target.value;
      } else if (e.target.name === "dmpQuantity") {
        quotationData.budget[0][e.target.name] = e.target.value;
      } else if (e.target.name === "dmpPrice") {
        quotationData.budget[0][e.target.name] = e.target.value;
      } else if (e.target.name === "fxQuantity") {
        quotationData.budget[0][e.target.name] = e.target.value;
      } else if (e.target.name === "fxPrice") {
        quotationData.budget[0][e.target.name] = e.target.value;
      } else if (e.target.name === "compositingQuantity") {
        quotationData.budget[0][e.target.name] = e.target.value;
      } else if (e.target.name === "compositingPrice") {
        quotationData.budget[0][e.target.name] = e.target.value;
      } else if (e.target.name === "gfxAssetsQuantity") {
        quotationData.budget[0][e.target.name] = e.target.value;
      } else if (e.target.name === "gfxAssetsPrice") {
        quotationData.budget[0][e.target.name] = e.target.value;
      } else if (e.target.name === "threeDAssetsQuantity") {
        quotationData.budget[0][e.target.name] = e.target.value;
      } else if (e.target.name === "threeDAssetsPrice") {
        quotationData.budget[0][e.target.name] = e.target.value;
      } else if (e.target.name === "officeRentalQuantity") {
        quotationData.budget[0][e.target.name] = e.target.value;
      } else if (e.target.name === "officeRentalPrice") {
        quotationData.budget[0][e.target.name] = e.target.value;
      } else if (e.target.name === "tpnQuantity") {
        quotationData.budget[0][e.target.name] = e.target.value;
      } else if (e.target.name === "tpnPrice") {
        quotationData.budget[0][e.target.name] = e.target.value;
      } else if (e.target.name === "marketingQuantity") {
        quotationData.budget[0][e.target.name] = e.target.value;
      } else if (e.target.name === "marketingPrice") {
        quotationData.budget[0][e.target.name] = e.target.value;
      } else if (e.target.name === "internetQuantity") {
        quotationData.budget[0][e.target.name] = e.target.value;
      } else if (e.target.name === "internetPrice") {
        quotationData.budget[0][e.target.name] = e.target.value;
      } else if (e.target.name === "phonesAndCablesQuantity") {
        quotationData.budget[0][e.target.name] = e.target.value;
      } else if (e.target.name === "phonesAndCablesPrice") {
        quotationData.budget[0][e.target.name] = e.target.value;
      } else if (e.target.name === "airShippingAndCarriersQuantity") {
        quotationData.budget[0][e.target.name] = e.target.value;
      } else if (e.target.name === "airShippingAndCarriersPrice") {
        quotationData.budget[0][e.target.name] = e.target.value;
      } else if (e.target.name === "externalBillingCostsQuantity") {
        quotationData.budget[0][e.target.name] = e.target.value;
      } else if (e.target.name === "externalBillingCostsPrice") {
        quotationData.budget[0][e.target.name] = e.target.value;
      } else if (e.target.name === "specialInsuranceQuantity") {
        quotationData.budget[0][e.target.name] = e.target.value;
      } else if (e.target.name === "specialInsurancePrice") {
        quotationData.budget[0][e.target.name] = e.target.value;
      } else if (e.target.name === "bankFeesQuantity") {
        quotationData.budget[0][e.target.name] = e.target.value;
      } else if (e.target.name === "bankFeesPrice") {
        quotationData.budget[0][e.target.name] = e.target.value;
      } else if (e.target.name === "accountingQuantity") {
        quotationData.budget[0][e.target.name] = e.target.value;
      } else if (e.target.name === "accountingPrice") {
        quotationData.budget[0][e.target.name] = e.target.value;
      } else if (e.target.name === "archivingQuantity") {
        quotationData.budget[0][e.target.name] = e.target.value;
      } else if (e.target.name === "archivingPrice") {
        quotationData.budget[0][e.target.name] = e.target.value;
      } else if (e.target.name === "standardsConversionQuantity") {
        quotationData.budget[0][e.target.name] = e.target.value;
      } else if (e.target.name === "standardsConversionPrice") {
        quotationData.budget[0][e.target.name] = e.target.value;
      } else if (e.target.name === "workingMealsQuantity") {
        quotationData.budget[0][e.target.name] = e.target.value;
      } else if (e.target.name === "workingMealsPrice") {
        quotationData.budget[0][e.target.name] = e.target.value;
      } else if (e.target.name === "postShippingMessengersQuantity") {
        quotationData.budget[0][e.target.name] = e.target.value;
      } else if (e.target.name === "postShippingMessengersPrice") {
        quotationData.budget[0][e.target.name] = e.target.value;
      } else if (e.target.name === "extendedMediaStorageQuantity") {
        quotationData.budget[0][e.target.name] = e.target.value;
      } else if (e.target.name === "extendedMediaStoragePrice") {
        quotationData.budget[0][e.target.name] = e.target.value;
      } else if (e.target.name === "fileCreationAndPostingQuantity") {
        quotationData.budget[0][e.target.name] = e.target.value;
      } else if (e.target.name === "fileCreationAndPostingPrice") {
        quotationData.budget[0][e.target.name] = e.target.value;
      } else if (e.target.name === "miscPostSoftwareCostsQuantity") {
        quotationData.budget[0][e.target.name] = e.target.value;
      } else if (e.target.name === "miscPostSoftwareCostsPrice") {
        quotationData.budget[0][e.target.name] = e.target.value;
      } else if (e.target.name === "softwareUpgradesForProjectQuantity") {
        quotationData.budget[0][e.target.name] = e.target.value;
      } else if (e.target.name === "softwareUpgradesForProjectPrice") {
        quotationData.budget[0][e.target.name] = e.target.value;
      }
      console.log(quotationData);
    } else {
      console.log(e.target.name);
      setQuotationData({
        ...quotationData,
        [e.target.name]: e.target.value,
      });
      //
      // console.log("Here", quotationData);
      console.log(quotationData);
    }
  };
  // console.log(quotationData);
  // const onSubmitHandler = (e) => {
  //   e.preventDefault();
  //   console.log("Submitted");
  //   console.log(e);
  //   console.table(quotationData);
  // };
  // console.log("SetInpout", input);
  console.log("Total:", total);
  // console.log("GrandTotal", grandTotal);
  const [val, setVal] = useState([]);
  const handleAdd = () => {
    const abc = [...val, []];
    setVal(abc);
    quotationData["name"].push(role_name);
    quotationData["role"].push(role);
    quotationData["responsibility"].push(responsibility);
  };
  // const handleChange = (onChangeValue, i) => {
  //   const inputdata = [...val];
  //   inputdata[i] = onChangeValue.target.value;
  //   setVal(inputdata);
  // };

  function convertToCamelCase(list) {
    var camelCaseList = [];

    for (var i = 0; i < list.length; i++) {
      var words = list[i].split(" ");
      var camelCaseWord = words[0].toLowerCase();

      for (var j = 1; j < words.length; j++) {
        var capitalizedWord =
          words[j].charAt(0).toUpperCase() + words[j].slice(1).toLowerCase();
        camelCaseWord += capitalizedWord;
      }

      camelCaseList.push(camelCaseWord);
    }

    return camelCaseList;
  }

  const onSubmitHandler = (e) => {
    console.log("Submitted");

    // set date
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, "0");
    var mm = String(today.getMonth()).padStart(2, "0"); //January is 0!
    mm = parseInt(mm) + 1;
    var yyyy = today.getFullYear();

    today = dd + "/" + mm + "/" + yyyy;
    quotationData["date"] = today;

    e.preventDefault();

    console.table(quotationData);

    axios({
      method: "post",
      url: "http://localhost:5000/addquotation/" + clientID,
      data: quotationData,
    }).then((res) => {
      // res.json();
      console.log(res);
      if (res.status === 200) {
        console.log("Quotation Added Successfully");
        navigate(
          "/quotationpreview/" + clientID + "/" + quotationData["projectName"],
          {
            state: { quotationData },
          }
        );
      }
    });
  };

  // budgetItems.forEach((item) => {
  //   console.log(camelCase(item.toString()));
  // });
  // console.log(convertToCamelCase(budgetItems));
  // console.log(
  //   "Here",
  //   (quotationData.budget[0]["executiveProducerPrice"] = "Sha")
  // );

  const handleCalculate = (e) => {
    console.log("Calculate");
    handleAdd();
    Object.entries(quotationData["budget"][0]).map(([key, value], index) => {
      if (key.includes("Quantity")) {
        // console.log("Keys with quantigty", key);
        // console.log("Value:", value);
        if (
          parseInt(value) > 0 &&
          parseInt(
            quotationData["budget"][0][key.replace("Quantity", "Price")]
          ) > 0
        ) {
          if (parseInt(quotationData["discount"]) > 0) {
            setTotal({
              total:
                parseInt(total["total"]) +
                parseInt(value) *
                  parseInt(
                    quotationData["budget"][0][key.replace("Quantity", "Price")]
                  ) -
                (parseInt(value) *
                  parseInt(
                    quotationData["budget"][0][key.replace("Quantity", "Price")]
                  ) *
                  parseInt(quotationData["discount"])) /
                  100,
            });
          } else {
            setTotal({
              total:
                parseInt(total["total"]) +
                parseInt(value) *
                  parseInt(
                    quotationData["budget"][0][key.replace("Quantity", "Price")]
                  ),
            });
          }
        }
      }
    });
    console.log("Total:", total);
  };

  quotationData["projectNo"] = pno + 1;
  console.log(quotationData);

  return (
    <div>
      <div className="row">
        <div className="col-2">
          <Sidebar />
        </div>
        <div className="col-10">
          <div className="container">
            <div className="jumbotron" id="addQuotationJumbotron">
              <h5 className="mb-4">Add New Quotation</h5>

              <Form>
                {/* Project no and name */}
                <Row className="mb-3">
                  <Form.Group as={Col} controlId="projectNo">
                    <Form.Label>Project No.</Form.Label>
                    <Form.Control
                      size="sm"
                      // placeholder="1"
                      aria-describedby="basic-addon1"
                      type="number"
                      name="projectNo"
                      onChange={onChangeHandler}
                      disabled
                      value={pno + 1}
                    />
                  </Form.Group>

                  <Form.Group as={Col} controlId="projectName">
                    <Form.Label>Project Name</Form.Label>
                    <Form.Control
                      size="sm"
                      placeholder="Rech"
                      aria-label="ProjectName"
                      aria-describedby="basic-addon1"
                      name="projectName"
                      onChange={onChangeHandler}
                    />
                  </Form.Group>
                </Row>

                {/* COntact email and number */}
                <div className="row">
                  <div className="col-6">
                    <FormGroup size="sm" className="mb-3">
                      <Form.Label>Email</Form.Label>
                      <Form.Control
                        size="sm"
                        placeholder="user@rech.com"
                        aria-label="contactemail"
                        aria-describedby="basic-addon1"
                        name="contactEmail"
                        onChange={onChangeHandler}
                      />
                    </FormGroup>
                  </div>
                  <div className="col-6">
                    <FormGroup size="sm" className="mb-3">
                      <Form.Label>Contact Phone</Form.Label>

                      <Form.Control
                        size="sm"
                        placeholder="+91 1234567890"
                        aria-label="contactphone"
                        aria-describedby="basic-addon1"
                        name="contactPhone"
                        onChange={onChangeHandler}
                      />
                    </FormGroup>
                  </div>

                  {/* Purpose of Document */}
                  <FormGroup size="sm">
                    <Form.Label>Purpose of Document</Form.Label>
                    <Form.Control
                      size="sm"
                      className="text-area"
                      as="textarea"
                      placeholder=""
                      aria-label="With textarea"
                      name="purposeOfDocument"
                      onChange={onChangeHandler}
                      style={{ height: "200px" }}
                    />
                  </FormGroup>

                  <div className="border mt-3 mb-0"></div>
                  {/* Role and Responsibility */}
                  <h6 className="mt-4 mb-2">Roles and Responsibility</h6>
                  <div className="row justify-content-center">
                    <div className="col-auto">
                      {/* <center>
                        <Form.Label htmlFor="Role">Name</Form.Label>
                      </center> */}

                      <Form.Control
                        size="sm"
                        className="mb-1 mt-2"
                        type="text"
                        id="Name"
                        aria-describedby="Name"
                        name="name"
                        placeholder="Name"
                        onChange={onChangeHandler}
                      />
                    </div>
                    <div className="col-auto">
                      {/* <center>
                        <Form.Label htmlFor="Role">Role</Form.Label>
                      </center> */}

                      <Form.Control
                        size="sm"
                        className="mb-1 mt-2"
                        type="text"
                        id="Role"
                        aria-describedby="Role"
                        name="role"
                        placeholder="Role"
                        onChange={onChangeHandler}
                      />
                    </div>
                    <div className="col-auto">
                      {/* <center>
                        <Form.Label htmlFor="Responsibility">
                          Responsibility
                        </Form.Label>
                      </center> */}

                      <Form.Control
                        size="sm"
                        className="mb-1 mt-2"
                        type="text"
                        id="Responsibility"
                        aria-describedby="Responsibility"
                        name="responsibility"
                        placeholder="Responsibility"
                        onChange={onChangeHandler}
                      />
                    </div>
                    <div className="col-auto">
                      {/* <p className="mb-2">""</p> */}
                      <Button variant="dark" size="sm" className="mt-2 mb-2">
                        Delete
                      </Button>{" "}
                    </div>
                  </div>

                  {/* Adding ROle dynamically */}
                  {val.map((data, i) => {
                    return (
                      <div className="row justify-content-center">
                        <div className="col-auto">
                          <Form.Control
                            size="sm"
                            className="mb-2"
                            type="text"
                            id="Name"
                            placeholder="Name"
                            aria-describedby="Name"
                            name="name"
                            onChange={onChangeHandler}
                            key={data[i]}
                          />
                        </div>
                        <div className="col-auto">
                          <Form.Control
                            size="sm"
                            className="mb-2"
                            type="text"
                            id="Role"
                            placeholder="Role"
                            aria-describedby="Role"
                            name="role"
                            onChange={onChangeHandler}
                            key={data[i]}
                          />
                        </div>
                        <div className="col-auto">
                          <Form.Control
                            size="sm"
                            className="mb-2"
                            type="text"
                            id="Responsibility"
                            placeholder="Responsibility"
                            aria-describedby="Responsibility"
                            name="responsibility"
                            onChange={onChangeHandler}
                            key={data[i]}
                          />
                        </div>
                        <div className="col-auto">
                          <Button variant="dark" size="sm">
                            Delete
                          </Button>{" "}
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* add role button */}
                <div className="mt-2">
                  <center>
                    <Button
                      variant="dark"
                      size="sm"
                      onClick={() => handleAdd()}
                    >
                      Add Role
                    </Button>{" "}
                  </center>
                </div>
                {/* Project Summary */}
                <div className="mt-3">
                  <FormGroup size="sm">
                    <Form.Label>Project Summary</Form.Label>
                    <Form.Control
                      className="text-area"
                      as="textarea"
                      size="sm"
                      placeholder=""
                      aria-label="With textarea"
                      name="projectSummary"
                      onChange={onChangeHandler}
                      style={{ height: "200px" }}
                    />
                  </FormGroup>
                </div>
                <div className="border mt-3 mb-0"></div>
                {/* ************************************************************* */}
                {/* Budget */}
                {/* ************************************************************* */}

                <div className="row justify-content-center">
                  <h6 className="mt-4 mb-2">Budget</h6>

                  {/* <h6 className="mb-2">Management</h6> */}
                  <table className="table table-borderless table-sm">
                    <thead>
                      <tr>
                        <th>Management</th>
                      </tr>
                    </thead>
                  </table>

                  <div className="col-1">
                    <center>
                      <Form.Label htmlFor="no">No.</Form.Label>
                    </center>

                    {budgetItems.map((data, i) => {
                      return (
                        <Form.Control
                          size="sm"
                          placeholder={i + 1}
                          disabled
                          className="mb-1 disable-input primary-input"
                          key={data}
                        />
                      );
                    })}
                  </div>

                  <div className="col-3">
                    <center>
                      <Form.Label htmlFor="Description">Description</Form.Label>
                    </center>

                    {budgetItems.map((data, i) => {
                      return (
                        // <InputGroup.Text
                        //   id="basic-addon1"
                        //   name={data[i]}
                        //   key={data[i]}
                        // >
                        //   {data}
                        // </InputGroup.Text>
                        <Form.Control
                          size="sm"
                          placeholder={data}
                          disabled
                          className="mb-1"
                          key={data}
                        />
                      );
                    })}
                  </div>
                  <div className="col-2">
                    <center>
                      <Form.Label htmlFor="Quantity">Quantity</Form.Label>
                    </center>

                    {budgetItems.map((data, i) => {
                      // console.log(data);
                      return (
                        <Form.Control
                          size="sm"
                          className="mb-1"
                          type="number"
                          id="Quantity"
                          aria-describedby="Quantity"
                          name={budgetItemsCamelCase[i] + "Quantity"}
                          onChange={onChangeHandler}
                          placeholder={
                            quotationData["budget"][0][
                              budgetItemsCamelCase[i] + "Quantity"
                            ]
                          }
                          key={data}
                        />
                      );
                    })}
                  </div>
                  <div className="col-2">
                    <center>
                      <Form.Label htmlFor="Price">Price</Form.Label>
                    </center>

                    {budgetItems.map((data, i) => {
                      // console.log(
                      //   "Hereee: ",
                      //   quotationData["budget"][0][
                      //     convertToCamelCase(budgetItems)[i] + "Price"
                      //   ]
                      // );
                      return (
                        <Form.Control
                          size="sm"
                          className="mb-1"
                          type="number"
                          id="Price"
                          aria-describedby="Price"
                          name={budgetItemsCamelCase[i] + "Price"}
                          placeholder={
                            quotationData["budget"][0][
                              budgetItemsCamelCase[i] + "Price"
                            ]
                          }
                          onChange={onChangeHandler}
                          key={data}
                        />
                      );
                    })}
                  </div>
                  {/* Post Production */}
                  {/* <center>
                    <h6 className="mb-2 mt-3">Post Production Expenses</h6>
                  </center> */}
                  <table className="table table-borderless table-sm mt-3">
                    <thead>
                      <tr>
                        <th>Post Production Expenses</th>
                      </tr>
                    </thead>
                  </table>
                  <div className="col-1">
                    {postProduction.map((data, i) => {
                      return (
                        <Form.Control
                          size="sm"
                          placeholder={i + 1}
                          disabled
                          className="mb-1"
                          key={data}
                        />
                      );
                    })}
                  </div>
                  <div className="col-3">
                    {postProduction.map((data, i) => {
                      return (
                        <Form.Control
                          size="sm"
                          placeholder={data}
                          disabled
                          className="mb-1"
                          key={data}
                        />
                      );
                    })}
                  </div>
                  <div className="col-2">
                    {postProduction.map((data, i) => {
                      return (
                        <Form.Control
                          size="sm"
                          className="mb-1"
                          type="number"
                          id="Quantity"
                          aria-describedby="Quantity"
                          name={postProductionCamelCase[i] + "Quantity"}
                          onChange={onChangeHandler}
                          placeholder={
                            quotationData["budget"][0][
                              postProductionCamelCase[i] + "Quantity"
                            ]
                          }
                          key={data}
                        />
                      );
                    })}
                  </div>
                  <div className="col-2">
                    {postProduction.map((data, i) => {
                      return (
                        <Form.Control
                          size="sm"
                          className="mb-1"
                          type="text"
                          id="Price"
                          aria-describedby="Price"
                          name={postProductionCamelCase[i] + "Price"}
                          onChange={onChangeHandler}
                          placeholder={
                            quotationData["budget"][0][
                              postProductionCamelCase[i] + "Price"
                            ]
                          }
                          key={data}
                        />
                      );
                    })}
                  </div>

                  {/* Production Expenses */}
                  {/* <center>
                    <h6 className="mb-2 mt-3">Production Expenses</h6>
                  </center> */}
                  <table className="table table-borderless table-sm mt-3">
                    <thead>
                      <tr>
                        <th>Production Expenses</th>
                      </tr>
                    </thead>
                  </table>
                  <div className="col-1">
                    {productionExpenses.map((data, i) => {
                      return (
                        <Form.Control
                          size="sm"
                          placeholder={i + 1}
                          disabled
                          className="mb-1"
                          key={data}
                        />
                      );
                    })}
                  </div>
                  <div className="col-3">
                    {productionExpenses.map((data, i) => {
                      return (
                        <Form.Control
                          size="sm"
                          placeholder={data}
                          disabled
                          className="mb-1"
                          key={data}
                        />
                      );
                    })}
                  </div>
                  <div className="col-2">
                    {productionExpenses.map((data, i) => {
                      return (
                        <Form.Control
                          size="sm"
                          className="mb-1"
                          type="number"
                          id="Quantity"
                          aria-describedby="Quantity"
                          name={productionExpensesCamelCase[i] + "Quantity"}
                          onChange={onChangeHandler}
                          placeholder={
                            quotationData["budget"][0][
                              productionExpensesCamelCase[i] + "Quantity"
                            ]
                          }
                          key={data}
                        />
                      );
                    })}
                  </div>
                  <div className="col-2">
                    {productionExpenses.map((data, i) => {
                      return (
                        <Form.Control
                          size="sm"
                          className="mb-1"
                          type="text"
                          id="Price"
                          aria-describedby="Price"
                          name={productionExpensesCamelCase[i] + "Price"}
                          onChange={onChangeHandler}
                          placeholder={
                            quotationData["budget"][0][
                              productionExpensesCamelCase[i] + "Price"
                            ]
                          }
                          key={data}
                        />
                      );
                    })}
                  </div>

                  {/* Miscelleneous Expenses */}
                  {/* <center>
                    <h6 className="mb-2 mt-3">Miscelleneous Expenses</h6>
                  </center> */}
                  <table className="table table-borderless table-sm mt-3">
                    <thead>
                      <tr>
                        <th>Miscelleneous Expenses</th>
                      </tr>
                    </thead>
                  </table>
                  <div className="col-1">
                    {miscelleneousExpenses.map((data, i) => {
                      return (
                        <Form.Control
                          size="sm"
                          placeholder={i + 1}
                          disabled
                          className="mb-1"
                          key={data}
                        />
                      );
                    })}
                  </div>
                  <div className="col-3">
                    {miscelleneousExpenses.map((data, i) => {
                      return (
                        <Form.Control
                          size="sm"
                          placeholder={data}
                          disabled
                          className="mb-1"
                          key={data}
                        />
                      );
                    })}
                  </div>
                  <div className="col-2">
                    {miscelleneousExpenses.map((data, i) => {
                      return (
                        <Form.Control
                          size="sm"
                          className="mb-1"
                          type="number"
                          id="Quantity"
                          aria-describedby="Quantity"
                          name={miscelleneousExpensesCamelCase[i] + "Quantity"}
                          onChange={onChangeHandler}
                          placeholder={
                            quotationData["budget"][0][
                              miscelleneousExpensesCamelCase[i] + "Quantity"
                            ]
                          }
                          key={data}
                        />
                      );
                    })}
                  </div>
                  <div className="col-2">
                    {miscelleneousExpenses.map((data, i) => {
                      return (
                        <Form.Control
                          size="sm"
                          className="mb-1"
                          type="text"
                          id="Price"
                          aria-describedby="Price"
                          name={miscelleneousExpensesCamelCase[i] + "Price"}
                          onChange={onChangeHandler}
                          placeholder={
                            quotationData["budget"][0][
                              miscelleneousExpensesCamelCase[i] + "Price"
                            ]
                          }
                          key={data}
                        />
                      );
                    })}
                  </div>

                  {/* <div className="col-2">
                      <p className="mb-2">""</p>
                      {budgetItems.map((data, i) => {
                        return (
                          <div>
                            <Button
                              variant="light"
                              size="sm"
                              className="mb-1 mt-1"
                            >
                              Delete
                            </Button>
                          </div>
                        );
                      })}
                    </div> */}
                </div>
                <div className="border mt-3 mb-0"></div>

                {/* Discount */}
                <div className="row">
                  <h6 className="col-md-4 offset-md-8 mt-3">Discount</h6>
                  <div className="col-md-4 offset-md-8 mt-1">
                    <InputGroup size="sm" className="mb-1">
                      <Form.Control
                        placeholder="20%"
                        aria-label="discount"
                        aria-describedby="basic-addon1"
                        name="discount"
                        onChange={onChangeHandler}
                      />
                    </InputGroup>
                  </div>
                </div>

                {/* Calculate button */}
                <div className="col-md-4 offset-md-8 mb-2 mt-0">
                  <Button
                    variant="dark"
                    size="sm"
                    className="mb-1 mt-1"
                    onClick={handleCalculate}
                  >
                    Calculate
                  </Button>
                </div>

                {/* Total */}
                <div className="row">
                  <div className="col-md-6 offset-md-8">
                    <h6>Total</h6>
                  </div>
                  <div className="col-md-4 offset-md-8">
                    <InputGroup className="mb-3" size="sm">
                      <InputGroup.Text>$</InputGroup.Text>
                      <Form.Control
                        aria-label="Amount (to the nearest dollar)"
                        placeholder={total["total"]}
                        disabled
                      ></Form.Control>
                      <InputGroup.Text>.00</InputGroup.Text>
                    </InputGroup>
                  </div>
                </div>

                {/* Submit Button */}
                <div className="row">
                  {/* two buttons in center next to each other */}
                  <div className="col-md-6 offset-md-4">
                    <Button
                      variant="dark"
                      size="sm"
                      type="submit"
                      // onClick={() => navigate("/quotationpreview")}
                      onClick={onSubmitHandler}
                    >
                      Submit
                    </Button>{" "}
                    <Button variant="dark" size="sm">
                      Save as Draft
                    </Button>{" "}
                  </div>
                </div>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
