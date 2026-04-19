const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');

router.get('/', userController.usersList);

router.get('/:id', userController.getByID);

router.post('/', userController.processAdd);

router.post('/login', userController.login);

router.put('/:id', protect, userController.processEdit);

router.delete('/:id', protect, userController.performDelete);

module.exports = router;