import express from 'express';
import { getAllRooms } from './resolvers';
const router = express.Router();

router.get('/list', getAllRooms);

export default router;