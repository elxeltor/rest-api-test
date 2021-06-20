import express from 'express';
import { bookRoom } from './resolvers';
const router = express.Router();

router.post('/book', bookRoom);

export default router;