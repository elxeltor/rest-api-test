import express from 'express';
import { bookRoom, cancelReservation, updateReservation } from './resolvers';
const router = express.Router();

router.post('/book', bookRoom);
router.delete('/:reservationId', cancelReservation);
router.put('/:reservationId', updateReservation);

export default router;