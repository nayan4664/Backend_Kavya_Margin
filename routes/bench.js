const express = require('express');
const router = express.Router();
const benchController = require('../controllers/benchController');

router.get('/', benchController.getAllBenchResources);
router.post('/', benchController.createBenchResource);
router.get('/:id', benchController.getBenchResourceById);
router.put('/:id', benchController.updateBenchResource);
router.delete('/:id', benchController.deleteBenchResource);

module.exports = router;
