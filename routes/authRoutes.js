const express = require('express');
const { body } = require('express-validator');
const authController = require('../controllers/authController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/register', authMiddleware.isGuest, authController.registerView);
router.post('/register', [
  body('name').notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Valid email is required'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
], authMiddleware.isGuest, authController.registerUser);

router.get('/login', authMiddleware.isGuest, authController.loginView);
router.post('/login', authMiddleware.isGuest, authController.loginUser);


router.get('/dashboard', authMiddleware.isAuth, authController.dashboardView);
router.get('/logout', authMiddleware.isAuth, authController.logoutUser);

module.exports = router;