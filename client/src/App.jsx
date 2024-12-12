import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import AudienceCreation from "./components/AudienceCreation";
import CampaignHistory from "./components/CampaignHistory";
import AddCustomer from "./components/AddCustomer";
import "./App.css";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-brand">CRM & Campaign Management</div>
      <ul className="navbar-menu">
        <li>
          <Link to="/">Audience Creation</Link>
        </li>
        <li>
          <Link to="/customers">Add Customer</Link>
        </li>
        <li>
          <Link to="/campaigns">Campaign History</Link>
        </li>
      </ul>
    </nav>
  );
}

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <h1 className="heading">CRM & Campaign Management System</h1>
        <Routes>
          <Route path="/" element={<AudienceCreation />} />
          <Route path="/customers" element={<AddCustomer />} />
          <Route path="/campaigns" element={<CampaignHistory />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
