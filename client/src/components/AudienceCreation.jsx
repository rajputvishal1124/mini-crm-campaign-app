"use client";

import { useState, useEffect } from "react";
import axios from "axios";

export default function AudienceCreation() {
  const [name, setName] = useState("");
  const [conditions, setConditions] = useState([
    { field: "", operator: "", value: "" },
  ]);
  const [audienceSize, setAudienceSize] = useState(0);
  const [error, setError] = useState("");
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/customers");
      setCustomers(response.data);
    } catch (error) {
      console.error("Error fetching customers:", error);
      setError("Failed to fetch customers. Please try again.");
    }
  };

  const addCondition = () => {
    setConditions([...conditions, { field: "", operator: "", value: "" }]);
  };

  const updateCondition = (index, field, value) => {
    const updatedConditions = [...conditions];
    updatedConditions[index][field] = value;
    setConditions(updatedConditions);
  };

  const calculateAudienceSize = async () => {
    try {
      setError("");
      const response = await axios.post(
        "http://localhost:8080/api/calculate-audience",
        { conditions }
      );
      setAudienceSize(response.data.size);
    } catch (error) {
      console.error("Error calculating audience size:", error);
      setError("Failed to calculate audience size. Please try again.");
    }
  };

  const saveAudience = async () => {
    try {
      setError("");
      const response = await axios.post(
        "http://localhost:8080/api/save-audience",
        { name, conditions }
      );
      alert(`Audience saved successfully! Size: ${response.data.size}`);
      setName("");
      setConditions([{ field: "", operator: "", value: "" }]);
      setAudienceSize(0);
    } catch (error) {
      console.error("Error saving audience:", error);
      setError("Failed to save audience. Please try again.");
    }
  };

  return (
    <div className="audience-creation">
      <h2>Create Audience Segment</h2>
      {error && <p className="error">{error}</p>}
      <div className="form-group">
        <label htmlFor="name">Audience Name</label>
        <input
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Audience Name"
        />
      </div>
      {conditions.map((condition, index) => (
        <div key={index} className="condition">
          <select
            value={condition.field}
            onChange={(e) => updateCondition(index, "field", e.target.value)}
          >
            <option value="">Select Field</option>
            <option value="totalSpending">Total Spending</option>
            <option value="visits">Visits</option>
            <option value="lastVisit">Last Visit</option>
          </select>
          <select
            value={condition.operator}
            onChange={(e) => updateCondition(index, "operator", e.target.value)}
          >
            <option value="">Select Operator</option>
            <option value="gt">&gt;</option>
            <option value="lt">&lt;</option>
            <option value="eq">=</option>
          </select>
          <input
            value={condition.value}
            onChange={(e) => updateCondition(index, "value", e.target.value)}
            placeholder="Value"
          />
        </div>
      ))}
      <button onClick={addCondition} className="btn">
        Add Condition
      </button>
      <button onClick={calculateAudienceSize} className="btn">
        Calculate Audience Size
      </button>
      <p>Audience Size: {audienceSize}</p>
      <button
        onClick={saveAudience}
        disabled={!name || conditions.length === 0}
        className="btn btn-primary"
      >
        Save Audience
      </button>
      <div className="customers-section">
        <h3>Customers</h3>
        <button onClick={fetchCustomers} className="btn">
          Refresh Customers
        </button>
        <ul className="customer-list">
          {customers.map((customer) => (
            <li key={customer._id} className="customer-item">
              {customer.name} - Spending: ${customer.totalSpending}, Visits:{" "}
              {customer.visits}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
