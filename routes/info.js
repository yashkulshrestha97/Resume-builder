const express = require('express');
const router = require('express').Router();
const infoController = require('../controllers/infoController');
const verify = require('./verifyToken');

router.get('/info/add', verify, infoController.add_info);
router.get('/info/update', verify, infoController.edit_info);
router.post('/info',verify,infoController.post_info);
router.get('/info/education', verify, infoController.add_education);
router.get('/info/education/update', verify, infoController.edit_education);
router.post('/info/education',verify,infoController.post_education);
router.get('/info/experience', verify, infoController.add_experience);
router.get('/info/experience/update', verify, infoController.edit_experience);
router.post('/info/experience',verify,infoController.post_experience);
router.get('/info/skills', verify, infoController.add_skills);
router.get('/info/skills/update', verify, infoController.edit_skills);
router.post('/info/skills',verify,infoController.post_skills);
router.get('/get-info',verify,infoController.get_details);

module.exports = router;