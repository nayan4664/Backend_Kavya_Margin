const express = require('express');
const router = express.Router();
const marginCalculationController = require('../controllers/marginCalculationController');

router.get('/', marginCalculationController.getCalculations);
router.post('/', marginCalculationController.createCalculation);
router.delete('/:id', marginCalculationController.deleteCalculation);

module.exports = router;
