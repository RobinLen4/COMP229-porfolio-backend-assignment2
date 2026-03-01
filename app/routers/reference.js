const express = require('express');
const router = express.Router();
const referenceController = require('../controllers/referenceController');

router.get('/', referenceController.referencesList);

router.get('/:id', referenceController.getByID);

router.post('/', referenceController.processAdd);

router.put('/:id', referenceController.processEdit);

router.delete('/:id', referenceController.performDelete);

module.exports = router;