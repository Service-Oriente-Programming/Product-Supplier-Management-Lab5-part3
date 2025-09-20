const User = require('../models/User');
const { validationResult } = require('express-validator');
const passport = require('passport');
const crypto = require('crypto');

// Display login form
exports.login_get = (req, res) => {
  res.render('login', { 
    title: 'Login',
    errors: null,
    oldInput: null
  });
};

// Handle login
exports.login_post = (req, res, next) => {
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/auth/login',
    failureFlash: true
  })(req, res, next);
};

// Display register form
exports.register_get = (req, res) => {
  res.render('register', { 
    title: 'Register',
    errors: null,
    oldInput: null
  });
};

// Handle registration
exports.register_post = async (req, res, next) => {
  const errors = validationResult(req);
  
  if (!errors.isEmpty()) {
    return res.render('register', {
      title: 'Register',
      errors: errors.array(),
      oldInput: req.body
    });
  }
  
  try {
    const { username, email, password, phone } = req.body;
    
    // Check if user already exists
    const existingUser = await User.findOne({
      $or: [
        { username: username },
        { email: email }
      ]
    });
    
    if (existingUser) {
      if (existingUser.username === username) {
        return res.render('register', {
          title: 'Register',
          errors: [{ msg: 'Username already exists' }],
          oldInput: req.body
        });
      }
      if (existingUser.email === email) {
        return res.render('register', {
          title: 'Register',
          errors: [{ msg: 'Email already exists' }],
          oldInput: req.body
        });
      }
    }
    
    // Create new user
    const user = new User({
      username,
      email,
      password,
      phone
    });
    
    await user.save();
    
    req.flash('success', 'Registration successful! Please login.');
    res.redirect('/auth/login');
    
  } catch (err) {
    next(err);
  }
};

// Display forgot password form
exports.forgot_get = (req, res) => {
  res.render('forgot', { 
    title: 'Forgot Password',
    errors: null,
    oldInput: null
  });
};

// Handle forgot password
exports.forgot_post = async (req, res, next) => {
  const errors = validationResult(req);
  
  if (!errors.isEmpty()) {
    return res.render('forgot', {
      title: 'Forgot Password',
      errors: errors.array(),
      oldInput: req.body
    });
  }
  
  try {
    const { email } = req.body;
    
    const user = await User.findOne({ email: email });
    
    if (!user) {
      // Don't reveal if email exists or not
      req.flash('info', 'If an account with that email exists, a password reset link has been sent.');
      return res.redirect('/auth/forgot');
    }
    
    // Generate reset token
    const resetToken = crypto.randomBytes(32).toString('hex');
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
    await user.save();
    
    // In a real application, you would send an email here
    // For now, we'll just show a message
    req.flash('info', `Password reset token: ${resetToken} (This would be sent via email in production)`);
    res.redirect('/auth/forgot');
    
  } catch (err) {
    next(err);
  }
};

// Handle logout
exports.logout = (req, res) => {
  req.logout((err) => {
    if (err) {
      console.error('Logout error:', err);
    }
    req.flash('success', 'You have been logged out');
    res.redirect('/');
  });
};

// Display profile
exports.profile_get = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      req.flash('error', 'User not found');
      return res.redirect('/');
    }
    
    res.render('profile', {
      title: 'User Profile',
      user: user
    });
  } catch (err) {
    next(err);
  }
};

// Update profile
exports.profile_update = async (req, res, next) => {
  const errors = validationResult(req);
  
  if (!errors.isEmpty()) {
    const user = await User.findById(req.user._id);
    return res.render('profile', {
      title: 'User Profile',
      user: user,
      errors: errors.array()
    });
  }
  
  try {
    const { email, phone } = req.body;
    
    const user = await User.findById(req.user._id);
    if (!user) {
      req.flash('error', 'User not found');
      return res.redirect('/');
    }
    
    // Check if email is already taken by another user
    if (email !== user.email) {
      const existingUser = await User.findOne({ 
        email: email, 
        _id: { $ne: user._id } 
      });
      if (existingUser) {
        return res.render('profile', {
          title: 'User Profile',
          user: user,
          errors: [{ msg: 'Email already exists' }]
        });
      }
    }
    
    user.email = email;
    user.phone = phone;
    await user.save();
    
    req.flash('success', 'Profile updated successfully');
    res.redirect('/auth/profile');
    
  } catch (err) {
    next(err);
  }
};
