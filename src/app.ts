import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';
import logger from './utils/logger';
import './config';
import './db';

import routes from './routes';
import { HttpError } from './errors/HttpError';

process.on('uncaughtException', (e) => {
  logger.error('Uncaught Exception', e);
  process.exit(1);
});

process.on('unhandledRejection', (e) => {
  logger.error('Unhandled Rejection', e);
  process.exit(1);
});

const app = express();

app.use(cors({ origin: true }));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/api', routes);

app.use((err: HttpError, req: Request, res: Response, next: NextFunction) => {
  res.status(err.code).end(err.message)
});

const port = process.env.API_PORT || 5000;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
})