const express = require('express');
const router = express.Router();

const controller = require('../controller/customer.controller')

router.get('/', controller.index);
router.get('/login', controller.login);
router.get('/listview', controller.listView);
router.post('/delete', controller.delete);

module.exports = router
