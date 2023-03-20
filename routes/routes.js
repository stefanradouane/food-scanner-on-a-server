/*******************************************************
 * Define some constants and variables
 ********************************************************/
const express = require('express');
const router = express.Router();

const controller = require('../controller/controller');


router.get('/', controller.control_index);

module.exports = router;