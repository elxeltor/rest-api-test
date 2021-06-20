import { NextFunction, Request, Response } from "express"
import moment from "moment";
import { db } from "../db";
import { BadRequestError } from "../errors/BadRequestError";
import { NotFoundError } from "../errors/NotFoundError";
import { ServerError } from "../errors/ServerError";
import logger from "../utils/logger";

const RESERVATIONS_TABLE = 'reservations';

const checkDateFormatIsISO = (date: string) => {
  console.log(moment.utc(date).toISOString());
  return moment.utc(date).toISOString() === date;
}

export const bookRoom = async (req: Request, res: Response, next: NextFunction) => {
  // check params
  const { roomId, userId, nbGuests, from, to } = req.body;

  console.log(req.body);

  if (!checkDateFormatIsISO(from) || !checkDateFormatIsISO(to)) {
    return next(new BadRequestError(`Dates must be in ISO format, ie: ${new Date().toISOString()}`));
  }

  if (nbGuests < 1 || nbGuests > 3) {
    return next(new BadRequestError('The total number of guests must be greater than 1 and up to 3.'))
  }

  try {
    // put everything in a transaction
    const result = await db.transaction( async (trx) => {
      // check room availability
      const results = await trx(RESERVATIONS_TABLE).select()
        .whereBetween('from', [from, to])
        .orWhereBetween('to', [from, to]);
    
      if (results && results.length > 0) {
        next(new NotFoundError('The room isn\'t available for the dates you selected'));
        return trx.rollback;
      }
    
      // create room reservation
      return await trx(RESERVATIONS_TABLE).insert({
        user_id: userId,
        room_id: roomId,
        nb_persons: nbGuests,
        from,
        to,
      });
    });
    res.status(200).send({reservationId: result});
  } catch (error) {
    logger.error(error);
    next(new ServerError('Your reservation couldn\'t be created, please contact customer service'));
  }
}

export const cancelReservation = async (req: Request, res: Response, next: NextFunction) => {
  // check params

  // delete reservation
}