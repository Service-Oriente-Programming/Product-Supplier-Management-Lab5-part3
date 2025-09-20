const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const methodOverride = require('method-override');
const morgan = require('morgan');
const flash = require('connect-flash');
const session = require('express-session');
const sessionConfig = require('./config/session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('./models/User');
require('dotenv').config();

// Import routes
const indexRoutes = require('./routes/index');
const authRoutes = require('./routes/auth');
const supplierRoutes = require('./routes/suppliers');
const productRoutes = require('./routes/products');
const apiRoutes = require('./routes/api');

// Import middleware
const { setUserLocals } = require('./middleware/auth');

const app = express();
const PORT = process.env.PORT || 3001;

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/product-supplier-auth-db', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => {
    console.log('✅ Connected to MongoDB');
})
.catch((err) => {
    console.error('❌ MongoDB connection error:', err);
    process.exit(1);
});

// View engine setup
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware
app.use(morgan('combined')); // Logging
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies
app.use(express.json()); // Parse JSON bodies
app.use(methodOverride('_method')); // For PUT/DELETE forms
app.use(express.static(path.join(__dirname, 'public'))); // Static files

// Session middleware
app.use(session(sessionConfig));

// Flash messages
app.use(flash());

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Passport configuration
passport.use(new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password'
}, async (username, password, done) => {
    try {
        const user = await User.findOne({
            $or: [{ username: username }, { email: username }]
        });
        
        if (!user) {
            return done(null, false, { message: 'Invalid username or email' });
        }
        
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return done(null, false, { message: 'Invalid password' });
        }
        
        return done(null, user);
    } catch (error) {
        return done(error);
    }
}));

passport.serializeUser((user, done) => {
    done(null, user._id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findById(id);
        done(null, user);
    } catch (error) {
        done(error);
    }
});

// Set user locals for all views
app.use(setUserLocals);

// Routes
app.use('/', indexRoutes);
app.use('/auth', authRoutes);
app.use('/suppliers', supplierRoutes);
app.use('/products', productRoutes);
app.use('/api', apiRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    
    // Mongoose validation error
    if (err.name === 'ValidationError') {
        const errors = Object.values(err.errors).map(e => e.message);
        return res.status(400).render('error', {
            title: 'Validation Error',
            error: 'Validation Error',
            message: errors.join(', ')
        });
    }
    
    // Mongoose duplicate key error
    if (err.code === 11000) {
        const field = Object.keys(err.keyValue)[0];
        return res.status(400).render('error', {
            title: 'Duplicate Error',
            error: 'Duplicate Error',
            message: `${field} already exists`
        });
    }
    
    // Default error
    res.status(err.status || 500).render('error', {
        title: 'Error',
        error: err.message || 'Something went wrong!',
        message: process.env.NODE_ENV === 'development' ? err.stack : 'An error occurred'
    });
});

// 404 handler
app.use('*', (req, res) => {
    res.status(404).render('error', {
        title: 'Page Not Found',
        error: '404 - Page Not Found',
        message: `The page ${req.originalUrl} does not exist`
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
    console.log(`📊 Environment: ${process.env.NODE_ENV || 'development'}`);
    console.log(`🗄️  Database: ${process.env.MONGO_URI || 'mongodb://localhost:27017/product-supplier-auth-db'}`);
    console.log(`🔐 Authentication: Enabled with sessions`);
});
