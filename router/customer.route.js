const express = require('express');
const router = express.Router();

const controller = require('../controller/customer.controller')
const requireLogin = require('../middleware/requireLogin')
const pagination = require('../middleware/pagination')

router.get('/', requireLogin.requireLogin, controller.index);
router.get('/listview',  controller.listView);
router.get('/filter', controller.filter)
router.get('/filterCard', controller.filterCard)
router.post('/delete', controller.delete);

module.exports = router
