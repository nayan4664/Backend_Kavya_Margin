const mongoose = require('mongoose');
const BillingModel = require('../models/billingModel');

// Get all billing models
exports.getBillingModels = async (req, res) => {
  try {
    const models = await BillingModel.find();
    res.json(models);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Create a new billing model
exports.createBillingModel = async (req, res) => {
  const model = new BillingModel(req.body);
  try {
    const newModel = await model.save();
    console.log(`✅ Saved BillingModel to Atlas: ${newModel._id} in DB: ${mongoose.connection.db.databaseName}`);
    res.status(201).json(newModel);
  } catch (err) {
    console.error(`❌ Failed to save BillingModel to Atlas:`, err);
    res.status(400).json({ message: err.message });
  }
};

// Update a billing model
exports.updateBillingModel = async (req, res) => {
  try {
    const updatedModel = await BillingModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedModel);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Delete a billing model
exports.deleteBillingModel = async (req, res) => {
  try {
    await BillingModel.findByIdAndDelete(req.params.id);
    res.json({ message: 'Billing model deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
