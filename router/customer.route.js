const express = require('express');
const router = express.Router();

const controller = require('../controller/customer.controller')
const requireLogin = require('../middleware/requireLogin')
const pagination = require('../middleware/pagination')
const filter = require("../middleware/filter")

router.get('/', requireLogin.requireLogin, filter.filter, pagination.page ,controller.index);
router.get('/listview', filter.filter,  pagination.page, controller.listView);
router.get('/filter', filter.filter, controller.listView)
router.get('/filterCard', filter.filter, pagination.page, controller.index)
router.post('/delete', controller.delete);

module.exports = router
