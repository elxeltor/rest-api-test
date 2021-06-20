import express from 'express';
import { bookRoom, cancelReservation, listReservations, updateReservation } from './resolvers';
const router = express.Router();

router.post('/book', bookRoom);
router.delete('/:reservationId', cancelReservation);
router.put('/:reservationId', updateReservation);
router.get('/', listReservations);

export default router;