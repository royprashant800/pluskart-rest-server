const express = require('express');
const { signup, signin } = require('../controller/auth');
const {
  validateSignupRequest,
  isRequestValidated,
  validateSigninRequest
} = require('../validators/auth');

const router = express.Router();

// ✅ Add full CORS headers for OPTIONS response
router.options('/signin', (req, res) => {
  res.header('Access-Control-Allow-Origin', 'https://pluskart-admin-app.vercel.app');
  res.header('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.sendStatus(200);
});

// ✅ Signup and Signin routes
router.post('/signup', validateSignupRequest, isRequestValidated, signup);
router.post('/signin', validateSigninRequest, isRequestValidated, signin);

module.exports = router;
