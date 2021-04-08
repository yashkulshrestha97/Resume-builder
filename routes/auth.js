const express = require('express');
const router = require('express').Router();
const authController = require('../controllers/authController');
const verify = require('./verifyToken');

// REGISTER USER    
router.get('/register',authController.register_form);
router.post('/register/post', authController.register_user);
// LOGIN USER
router.get('/login',authController.login_form);
router.post('/login/post', authController.login_user);
// UPDATE USER
router.get('/update', verify, authController.update_form)
router.put('/update/put', verify, authController.user_update);
// DELETE USER 
router.delete('/delete', verify, authController.user_delete);
// LOGOUT USER
router.get('/logout',verify,authController.user_logout);
module.exports = router;