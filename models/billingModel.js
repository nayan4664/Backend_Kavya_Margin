const mongoose = require('mongoose');

const billingModelSchema = new mongoose.Schema({
  modelName: { type: String, required: true },
  description: { type: String },
  rate: { type: Number, required: true },
  type: { type: String, enum: ['Fixed', 'Variable'], required: true },
});

module.exports = mongoose.model('BillingModel', billingModelSchema, 'org_billingmodels');