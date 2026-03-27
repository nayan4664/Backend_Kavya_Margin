const express = require('express');
const router = express.Router();
const forecastController = require('../controllers/forecastController');

router.get('/revenue', forecastController.getAllRevenue);
router.get('/reports', forecastController.getAllForecastReports);
router.get('/margin-trends', forecastController.getAllMarginTrends);

module.exports = router;
