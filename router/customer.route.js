const express = require('express');
const router = express.Router();

const controller = require('../controller/customer.controller')
const requireLogin = require('../middleware/requireLogin')

router.get('/', requireLogin.requireLogin, controller.index);
router.get('/listview',  controller.listView);
router.post('/filter', controller.filture)
router.post('/delete', controller.delete);

module.exports = router
