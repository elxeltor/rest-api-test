import express from 'express';

import roomRouter from '../room/route';

const routes = express.Router();

routes.use('/room', roomRouter);
// routes.use('/user');
// routes.use('/reservation');

export default routes;