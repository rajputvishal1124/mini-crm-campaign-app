const express = require("express");
const router = express.Router();
const Customer = require("../models/customerModel");
const Audience = require("../models/Audience");

// Create Customer API
router.post("/customers", async (req, res) => {
  try {
    const customer = new Customer(req.body);
    await customer.save();
    res.status(201).json(customer);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get Customers API
router.get("/customers", async (req, res) => {
  try {
    const customers = await Customer.find();
    console.log(customers);

    res.status(200).json(customers);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Calculate Audience Size API
router.post("/calculate-audience", async (req, res) => {
  try {
    const { conditions } = req.body;
    const query = buildQueryFromConditions(conditions);
    const size = await Customer.find(query).countDocuments();
    res.status(200).json({ size });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Save Audience API
router.post("/save-audience", async (req, res) => {
  try {
    const { name, conditions } = req.body;
    const query = buildQueryFromConditions(conditions);
    const size = await Customer.find(query).countDocuments();
    const audience = new Audience({ name, conditions, size });
    await audience.save();
    res.status(201).json(audience);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Helper function to build MongoDB query from conditions
function buildQueryFromConditions(conditions) {
  return conditions.reduce((query, condition) => {
    let value;
    switch (condition.field) {
      case "totalSpending":
      case "visits":
        value = Number(condition.value);
        break;
      case "lastVisit":
        value = new Date(condition.value);
        break;
      default:
        value = condition.value;
    }

    if (condition.operator === "eq") {
      query[condition.field] = value;
    } else {
      query[condition.field] = { [`$${condition.operator}`]: value };
    }

    return query;
  }, {});
}

module.exports = router;
