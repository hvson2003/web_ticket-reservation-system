/**
 * @license Apache-2.0
 */

'use strict';

/**
 * node modules
 */
const router = require('express').Router();

/**
 * custome modules
 */
const { renderBooking, removeBooking } = require('../controllers/booking_controller');

// Route để render trang booking
router.get('/', renderBooking);

// Route để xóa booking
router.delete('/remove/:id', removeBooking);

module.exports = router;
