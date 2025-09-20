// Authentication middleware

// Check if user is authenticated
const isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  } else {
    req.flash('error', 'Please login to access this page');
    return res.redirect('/auth/login');
  }
};

// Check if user is admin
const isAdmin = (req, res, next) => {
  if (req.isAuthenticated() && req.user && req.user.role === 'admin') {
    return next();
  } else {
    req.flash('error', 'Access denied. Admin privileges required.');
    return res.redirect('/');
  }
};

// Check if user is not authenticated (for login/register pages)
const isNotAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return res.redirect('/');
  } else {
    return next();
  }
};

// Set user info in locals for all views
const setUserLocals = (req, res, next) => {
  if (req.isAuthenticated()) {
    res.locals.user = {
      id: req.user._id,
      username: req.user.username,
      email: req.user.email,
      role: req.user.role,
      isAuthenticated: true,
      isAdmin: req.user.role === 'admin'
    };
  } else {
    res.locals.user = {
      isAuthenticated: false,
      isAdmin: false
    };
  }
  
  // Set flash messages
  res.locals.success = req.flash('success');
  res.locals.error = req.flash('error');
  res.locals.info = req.flash('info');
  
  next();
};

// Optional authentication (doesn't redirect, just sets user info)
const optionalAuth = (req, res, next) => {
  if (req.isAuthenticated()) {
    res.locals.user = {
      id: req.user._id,
      username: req.user.username,
      email: req.user.email,
      role: req.user.role,
      isAuthenticated: true,
      isAdmin: req.user.role === 'admin'
    };
  } else {
    res.locals.user = {
      isAuthenticated: false,
      isAdmin: false
    };
  }
  next();
};

module.exports = {
  isAuthenticated,
  isAdmin,
  isNotAuthenticated,
  setUserLocals,
  optionalAuth
};
