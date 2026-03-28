const mongoose = require('mongoose');

const rateConfigSchema = new mongoose.Schema({
  role: { type: String, required: true },
  offshore: { type: Number, required: true },
  onshore: { type: Number, required: true },
  currency: { type: String, default: 'INR' },
  status: { type: String, default: 'Active' }
});

module.exports = mongoose.model('RateConfig', rateConfigSchema, 'bill_rateconfigs');
