const express = require("express");
const registerUser = require("../controllers/registerUser");
const checkEmail = require("../controllers/checkEmail");
const checkPassword = require("../controllers/checkPassword");
const userDetails = require("../controllers/userDetails");
const logout = require("../controllers/logout");
const updateUserDetails = require("../controllers/updateUserDetails");
const router = express.Router()

//create user api
router.post('/register', registerUser);
router.post('/verify-email',checkEmail);
router.post('/verify-password',checkPassword);
router.get('/user-details',userDetails);
router.get('/logout',logout);
router.post('/update-user',updateUserDetails);

module.exports = router;