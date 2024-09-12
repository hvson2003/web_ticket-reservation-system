/**
 * @license Apache-2.0
*/
'use strict';

/**
 * node modules
 */
const router = require('express').Router();

/**
 * custom modules
 */
const { addTicket } = require('../controllers/ticket_controller');

// PUT route: add ticket
router.post('/add-to-cart/:ticketId', addTicket);

module.exports = router;
