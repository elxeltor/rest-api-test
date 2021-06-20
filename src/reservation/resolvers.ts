import { NextFunction, Request, Response } from "express"
import moment from "moment";
import { db } from "../db";
import { BadRequestError } from "../errors/BadRequestError";
import { NotFoundError } from "../errors/NotFoundError";
import { ConflictError } from "../errors/ConflictError";
import logger from "../utils/logger";
import { ForbiddenError } from "../errors/ForbiddenError";

const RESERVATIONS_TABLE = 'reservations';

const isISODateFormat = (date: string) => {
  return moment.utc(date).toISOString() === date;
}

interface ReservationParams {
  roomId?: number;
  userId?: number;
  nbGuests: number;
  from: string;
  to: string;
}

const roomBookingDataIsValid = ({from, to, nbGuests}: ReservationParams) => {
  const errorMessages = [];

  if (!isISODateFormat(from) || !isISODateFormat(to)) {
    errorMessages.push(`Dates must be in ISO format, ie: ${new Date().toISOString()}`);
  }

  if (Math.abs(moment(to).diff(moment(from), "days")) > 3) {
    errorMessages.push('The reservation shouldn\'t last more than 3 days');
  }

  if (nbGuests < 1 || nbGuests > 3) {
    errorMessages.push('The total number of guests must be greater than 1 and up to 3.')
  }

  return errorMessages;
}

export const bookRoom = async (req: Request, res: Response, next: NextFunction) => {
  // check params
  const { roomId, userId, nbGuests, from, to }: ReservationParams = req.body;
  const errorMessages = roomBookingDataIsValid({from, to, nbGuests});

  if (errorMessages.length > 0) {
    return next(new BadRequestError({payload: errorMessages}))
  }

  try {
    // put everything in a transaction
    await db.transaction( async (trx) => {
      // check room availability
      const results = await trx(RESERVATIONS_TABLE).select()
        .whereBetween('from', [from, to])
        .orWhereBetween('to', [from, to]);
    
      if (results && results.length) {
        next(new NotFoundError({ message: 'The room isn\'t available for the dates you selected'}));
        return trx.rollback;
      }
    
      // create room reservation
      const booked = await trx(RESERVATIONS_TABLE).insert({
        user_id: userId,
        room_id: roomId,
        nb_persons: nbGuests,
        from,
        to,
      });
      res.status(200).send({reservationId: booked[0], message: 'The room was successfully booked!!'});
      return trx.commit;
    });
  } catch (error) {
    logger.error('Unexpected Error while creating a reservation', req.body, '\nwith error:', error);
    next(new ConflictError({message: 'Someone tried to make the a reservation with dates overlaping yours.'}));
  }
}

export const cancelReservation = async (req: Request, res: Response, next: NextFunction) => {
  // check params
  const { userId } = req.body;
  const { reservationId } = req.params;

  // delete reservation
  try {
    await db(RESERVATIONS_TABLE).delete().where({
      user_id: userId,
      id: reservationId,
    });
    res.status(200).send({ message: `The reservation with ID: ${reservationId} has been canceled`});
  } catch (error) {
    logger.error('Couldn\'t delete the reservation', req.body, req.params, '\nwith error:', error);
    next(new ForbiddenError({ message: 'This reservation has either not been created by you, or has already been canceled'}));
  }
}

export const updateReservation = async (req: Request, res: Response, next: NextFunction) => {
  const { reservationId } = req.params;
  const { userId, nbGuests, from, to } = req.body;
  const errorMessages = roomBookingDataIsValid({from, to, nbGuests});

  if (errorMessages.length) {
    return next(new BadRequestError({payload: errorMessages}))
  }

  try {
    // put everything in a transaction
    await db.transaction( async (trx) => {
      // retrieve reservation
      const reservations = await trx(RESERVATIONS_TABLE).select().where({
        id: reservationId,
        user_id: userId,
      })

      if (!reservations || !reservations.length) {
        next(new ForbiddenError({ message: 'This reservation has either not been created by you, or has been canceled'}));
        return trx.rollback;
      }

      const booked = await trx(RESERVATIONS_TABLE)
        .where('id', reservationId)
        .update({
          ...reservations[0],
          nb_persons: nbGuests,
          from,
          to,
        });
      res.status(200).send({updatedReservations: booked, message: 'The room was successfully booked!!'});
      return trx.commit;
    });
  } catch (error) {
    logger.error('Unexpected Error while updating a reservation', req.body, '\nwith error:', error);
    next(new ConflictError({message: 'You tried to update the reservation twice and at the same time.'}));
  }
}

export const listReservations = async (req: Request, res: Response, next: NextFunction) => {
  const { userId } = req.body;
  const query = db(RESERVATIONS_TABLE).select();
  if (userId){
    query.where('user_id', userId);
  }

  const reservations = await query;
  res.status(200).send(reservations);
}