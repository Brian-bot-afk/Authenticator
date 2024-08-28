const express = require('express');
const router = express.Router();

// GET /login
router.get('/login', (req, res) => {
    res.send('Login page');
});

// POST /login
router.post('/login', (req, res) => {
    res.send('Login attempt');
});

// GET /register
router.get('/register', (req, res) => {
    res.send('Register page');
});

// POST /register
router.post('/register', (req, res) => {
    res.send('Register attempt');
});

module.exports = router;