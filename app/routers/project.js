const express = require('express');
const router = express.Router();
const projectController = require('../controllers/projectController');

router.get('/', projectController.projectsList);

router.get('/:id', projectController.getByID);

router.post('/', projectController.processAdd);

router.put('/:id', projectController.processEdit);

router.delete('/:id', projectController.performDelete);

module.exports = router;