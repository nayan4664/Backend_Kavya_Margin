const Revenue = require('../models/revenue');
const ForecastReport = require('../models/forecastReport');
const MarginTrend = require('../models/marginTrend');

// Revenue Forecast Dashboard Controllers
exports.getAllRevenue = async (req, res) => {
  try {
    const revenue = await Revenue.find().sort({ year: -1, month: -1 });
    res.json(revenue);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Forecast Report Controllers
exports.getAllForecastReports = async (req, res) => {
  try {
    const reports = await ForecastReport.find().sort({ date: -1 });
    res.json(reports);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Margin Trends Controllers
exports.getAllMarginTrends = async (req, res) => {
  try {
    const trends = await MarginTrend.find().sort({ year: 1, month: 1 });
    res.json(trends);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
