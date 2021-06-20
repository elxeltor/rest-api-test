import express from 'express';

import v1Router from './v1';
import publicRouter from './public';


const router = express.Router();

router.use('/v1', v1Router);
router.use('/public', publicRouter);

export default router;