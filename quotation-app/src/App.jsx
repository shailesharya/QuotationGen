import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { Routes, Route } from "react-router-dom";
// import Header from './components/header/Header'
// import Home from './components/home/Home'
// import About from './components/about/About'
import Login from "./components/login/Login";
import Sidebar from "./components/sidebar/Sidebar";
import AddQuotation from "./components/addquotation/AddQuotation";
import Companies from "./components/companies/Companies";
import Client from "./components/client/Client";
import AddCompany from "./components/companies/AddCompany";
import AddCompanyPg2 from "./components/companies/AddCompanyPg2";
import AddClient from "./components/client/AddClient";
import QuotationPreview from "./components/addquotation/QuotationPreview";

import Users from "./components/users/Users";
import CompanySettings from "./components/companies/CompanySettings";
import ClientProjects from "./components/client/ClientProjects";
import EditQuotation from "./components/addquotation/EditQuotation";
import ViewQuotation from "./components/addquotation/ViewQuotation";
function App() {
  const [count, setCount] = useState(0);
  let companies = {
    Rech: {
      name: "Rech",
      logo: "logo.png",
      client: ["RechClient1", "RechClient2", "RechClient3"],
    },
    Technicolor: {
      name: "Technicolor",
      logo: "logo.png",
      client: ["TechClient1", "TechhClient2", "TechClient3"],
    },
    Oracle: {
      name: "Oracle",
      logo: "logo.png",
      client: ["OracleClient1", "OracleClient2", "OracleClient3"],
    },
    ARM: {
      name: "Arm",
      logo: "logo.png",
      client: ["ArmClient1", "ArmClient2", "ArmClient3"],
    },
  };
  return (
    <div className="App">
      {/* <Header/>
      <Home/>
      <About/> */}
      {/* <Login /> */}
      {/* <Sidebar /> */}
      {/* <AddQuotation /> */}
      {/* <Companies /> */}
      {/* <Client /> */}
      {/* <AddCompany /> */}
      {/* <AddCompanyPg2 /> */}
      {/* <AddClient /> */}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="sidebar" element={<Sidebar />} />

        <Route path="companies" element={<Companies companies={companies} />} />
        <Route path="addcompany" element={<AddCompany />} />
        <Route
          path="addcompanypg2"
          element={<AddCompanyPg2 companies={companies} />}
        />
        <Route
          path="companysettings/:companyname"
          element={<CompanySettings />}
        />

        <Route path="client" element={<Client companies={companies} />} />
        <Route path="addclient" element={<AddClient />} />

        <Route path="addquotation/:client" element={<AddQuotation />} />
        <Route path="viewquotation/:project" element={<ViewQuotation />} />
        <Route path="editquotation/:project" element={<EditQuotation />} />
        <Route
          path="quotationpreview/:client/:project"
          element={<QuotationPreview />}
        />
        <Route path="clientprojects/:client" element={<ClientProjects />} />

        <Route path="users" element={<Users />} />
      </Routes>
    </div>
  );
}

export default App;
