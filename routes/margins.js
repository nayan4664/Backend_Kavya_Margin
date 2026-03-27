const express = require('express');
const router = express.Router();
const marginController = require('../controllers/marginController');

router.get('/', marginController.getAllMargins);
router.post('/', marginController.createMargin);
router.put('/:id', marginController.updateMargin);
router.delete('/:id', marginController.deleteMargin);

module.exports = router;
