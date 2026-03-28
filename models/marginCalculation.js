const mongoose = require('mongoose');

const marginCalculationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  billingRate: { type: Number, required: true },
  resourceCost: { type: Number, required: true },
  utilization: { type: Number, required: true },
  overhead: { type: Number, required: true },
  hours: { type: Number, required: true },
  revenue: { type: Number, required: true },
  cost: { type: Number, required: true },
  margin: { type: Number, required: true },
  marginPercent: { type: Number, required: true },
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('MarginCalculation', marginCalculationSchema, 'bill_margincalculations');
