const express = require('express');
const router = express.Router();
const serviceController = require('../controllers/serviceController');

router.get('/', serviceController.servicesList);

router.get('/:id', serviceController.getByID);

router.post('/', serviceController.processAdd);

router.put('/:id', serviceController.processEdit);

router.delete('/:id', serviceController.performDelete);

module.exports = router;