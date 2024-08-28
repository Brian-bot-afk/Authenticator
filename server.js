const express = require('express');
const session = require('express-session');
const SQLiteStore = require('connect-sqlite3')(session);
const path = require('path');
const authRoutes = require('./routes/authRoutes');
require('dotenv').config();

const app = express();

// View engine setup
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Session configuration
app.use(session({
    store: new SQLiteStore({
        db: 'sessions.sqlite',
        dir: './config'
    }),
    secret: process.env.SESSION_SECRET || 'fallback_secret',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false } // set to true if using https
}));

// Routes
app.use('/', authRoutes);

// Server startup
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));