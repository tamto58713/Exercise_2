const express = require('express');
const router = express.Router();


const controller = require("../controller/auth.controller");
const valid = require('../Validate/login.validate')

router.get('/login', controller.login)
router.post('/login', controller.postLogin)
router.get('/logout', controller.logout)

module.exports = router