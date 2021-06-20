import express from 'express';

import roomRouter from '../room/route';
import reservationRouter from '../reservation/route';

const routes = express.Router();

routes.use('/room', roomRouter);
// routes.use('/user');
routes.use('/reservation', reservationRouter);

export default routes;