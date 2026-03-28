const express = require('express');
const router = express.Router();
const rateConfigController = require('../controllers/rateConfigController');

router.get('/', rateConfigController.getRateConfigs);
router.post('/', rateConfigController.createRateConfig);
router.put('/:id', rateConfigController.updateRateConfig);
router.delete('/:id', rateConfigController.deleteRateConfig);

module.exports = router;
