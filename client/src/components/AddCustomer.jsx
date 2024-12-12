import React, { useState } from "react";
import axios from "axios";

export default function AddCustomer() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [totalSpending, setTotalSpending] = useState("");
  const [visits, setVisits] = useState("");
  const [lastVisit, setLastVisit] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await axios.post("http://localhost:8080/api/customers", {
        name,
        email,
        totalSpending: parseFloat(totalSpending),
        visits: parseInt(visits),
        lastVisit: new Date(lastVisit),
      });
      setMessage("Customer added successfully!");
      resetForm();
    } catch (error) {
      console.error("Error adding customer:", error);
      setMessage("Error adding customer. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setName("");
    setEmail("");
    setTotalSpending("");
    setVisits("");
    setLastVisit("");
  };

  return (
    <div className="add-customer">
      <h2>Add New Customer</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="totalSpending">Total Spending</label>
          <input
            id="totalSpending"
            type="number"
            value={totalSpending}
            onChange={(e) => setTotalSpending(e.target.value)}
            required
            min="0"
            step="0.01"
          />
        </div>
        <div className="form-group">
          <label htmlFor="visits">Visits</label>
          <input
            id="visits"
            type="number"
            value={visits}
            onChange={(e) => setVisits(e.target.value)}
            required
            min="0"
          />
        </div>
        <div className="form-group">
          <label htmlFor="lastVisit">Last Visit</label>
          <input
            id="lastVisit"
            type="date"
            value={lastVisit}
            onChange={(e) => setLastVisit(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn" disabled={isLoading}>
          {isLoading ? "Adding Customer..." : "Add Customer"}
        </button>
      </form>
      {message && (
        <p
          className={`message ${
            message.includes("successfully") ? "success" : "error"
          }`}
        >
          {message}
        </p>
      )}
    </div>
  );
}
