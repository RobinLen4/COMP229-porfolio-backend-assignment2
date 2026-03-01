const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.get('/', userController.usersList);

router.get('/:id', userController.getByID);

router.post('/', userController.processAdd);

router.put('/:id', userController.processEdit);

router.delete('/:id', userController.performDelete);

module.exports = router;