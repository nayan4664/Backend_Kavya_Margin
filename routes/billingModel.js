const express = require('express');
const router = express.Router();
const billingModelController = require('../controllers/billingModelController');

router.get('/', billingModelController.getBillingModels);
router.post('/', billingModelController.createBillingModel);
router.put('/:id', billingModelController.updateBillingModel);
router.delete('/:id', billingModelController.deleteBillingModel);

module.exports = router;