const mongoose = require('mongoose');

const revenueSchema = new mongoose.Schema({
  month: { type: String, required: true },
  year: { type: Number, required: true },
  confirmed: { type: Number, required: true },
  weighted: { type: Number, required: true },
  target: { type: Number, required: true }
});

module.exports = mongoose.model('Revenue', revenueSchema, 'rev_revenues');
