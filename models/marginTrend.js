const mongoose = require('mongoose');

const marginTrendSchema = new mongoose.Schema({
  month: { type: String, required: true },
  year: { type: Number, required: true },
  gross: { type: Number, required: true },
  net: { type: Number, required: true },
  target: { type: Number, required: true },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('MarginTrend', marginTrendSchema, 'margin_trends');
