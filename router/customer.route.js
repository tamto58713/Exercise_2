const express = require('express');
const router = express.Router();
const validLogin = require('../middleware/customer.login')
const controller = require('../controller/customer.controller')

router.get('/', controller.index);
router.get('/login', controller.login);
router.get('/listview', controller.listView);
router.post('/filter', controller.filture)
router.post('/delete', controller.delete);
router.post('/login', validLogin.validLogin, controller.postLogin)

module.exports = router
