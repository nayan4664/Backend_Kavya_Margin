const mongoose = require('mongoose');

const forecastReportSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String, enum: ['Financial', 'Forecast', 'Efficiency', 'Strategy'], required: true },
  author: { type: String, required: true },
  date: { type: String, required: true },
  size: { type: String, required: true },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('ForecastReport', forecastReportSchema, 'ai_forecastreports');
