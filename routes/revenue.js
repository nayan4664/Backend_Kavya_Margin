const express = require('express');
const router = express.Router();
const revenueController = require('../controllers/revenueController');

router.get('/', revenueController.getAllRevenue);
router.post('/', revenueController.createRevenue);
router.get('/:id', revenueController.getRevenueById);
router.put('/:id', revenueController.updateRevenue);
router.delete('/:id', revenueController.deleteRevenue);

module.exports = router;
