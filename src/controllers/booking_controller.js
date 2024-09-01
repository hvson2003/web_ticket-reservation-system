/**
 * @license Apache-2.0
*/

'use strict';

/**
 * custom modules
 */
const Booking = require('../models/booking_model');
const Ticket = require('../models/ticket_model');
const getPagination = require('../utils/get_pagination_utils');

/**
 * Render the booking page
 * @param {object} req - The request object.
 * @param {object} res - The response object.
 */
const renderBooking = async (req, res) => {
    try {
        const totalBookings = await Booking.countDocuments();
        const pagination = getPagination('/', req.params, 15, totalBookings);  

        const allBookings = await Booking.find({ user_id: req.session.user.user_id })
            .populate('ticket_id')
            .limit(pagination.limit)
            .skip(pagination.skip);
        
        res.render('./pages/booking', {
            sessionUser: req.session.user,
            allBookings,
            pagination
        }); 
    } catch (error) {
        console.error('Error rendering home page: ', error.message);
        throw error;
    }

}

/**
 * Delete booking
 * @param {object} req - The request object.
 * @param {object} res - The response object.
 */
const removeBooking = async (req, res) => {
    try {
        const { id } = req.params;
        await Booking.findByIdAndDelete(id);
        res.json({ success: true });
    } catch (error) {
        console.error('Error removing booking:', error);
        res.status(500).json({ success: false, error: 'An error occurred while removing the booking.' });
    }
};


/**
 * Update quantity booking
 * @param {object} req - The request object.
 * @param {object} res - The response object.
 */
const updateBookingQuantity = async (req, res) => {    
    const { bookingId } = req.params;
    const { quantity } = req.body;

    try {
        const booking = await Booking.findById(bookingId);
        if (!booking) {
            return res.status(404).json({ error: 'Booking not found' });
        }

        booking.quantity = quantity;
        await booking.save();

        res.json({ success: true });
    } catch (error) {
        console.error('Error updating booking quantity:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = {
    renderBooking,
    removeBooking,
    updateBookingQuantity
} 