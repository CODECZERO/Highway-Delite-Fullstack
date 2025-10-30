import express from 'express';
import { createBooking, getBookingById } from '../controllers/bookingController';

const router = express.Router();

router.post('/', createBooking);
router.get('/:id', getBookingById);

export default router;
