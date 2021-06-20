import { NextFunction, Request, Response } from "express";
import { db } from '../db';
import { NotFoundError } from "../errors/NotFoundError";

const TABLE_NAME = 'rooms';

export const getAllRooms = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const allRooms = await db(TABLE_NAME).select();

    console.log({allRooms});
  
    if (allRooms.length) {
      res.status(200).send(allRooms);
    } else {
      next(new NotFoundError({ message: 'The list of rooms is empty.'}));
    }
  } catch (error) {
    next(new NotFoundError({ message: 'Unexpected Error while getting the list of rooms'}));
  }
}