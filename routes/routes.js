/*******************************************************
 * Define some constants and variables
 ********************************************************/
const express = require('express');
const controller = require('../controller/controller');
const router = express.Router();

/*******************************************************
 * Create GET router
 ********************************************************/
router.get('/', controller.control_index);
router.get('/producten', controller.control_listview);
router.get('/producten/:barcode', controller.control_detailview);
router.get('/barcode', controller.control_barcode);
router.get('/offline', controller.control_offline);

/*******************************************************
 * Create POST router
 ********************************************************/
router.post('/', () => {});
router.post('/producten', () => {});
router.post('/producten/:barcode', () => {});
router.post('/barcode', () => {});

/*******************************************************
 * Export router
 ********************************************************/
module.exports = router;
