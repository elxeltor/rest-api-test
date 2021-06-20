import { NextFunction, Request, Response } from "express";
import { db } from '../db';
import { BadRequestError } from "../errors/BadRequestError";
import { UnauthorizedError } from "../errors/UnauthorizedError";
import logger from "../utils/logger";

const TABLE_NAME = 'users';

export const register = async (req: Request, res: Response, next: NextFunction) => {
  const { firstName, lastName, email, password } = req.body;

  try {
    await db(TABLE_NAME).insert({
      firstname: firstName,
      lastname: lastName,
      email,
      password,
    });
    res.status(200).send({message: 'User registered and logged-in'});
  } catch (error) {
    logger.error('Could not insert user', req.body, '\nwith error:', error);
    next(new BadRequestError({ message: `Invalid user information, ${req.body}`}))
  }
}

export const login = async (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;
  try {
    const results = await db(TABLE_NAME).select().where({
      email,
      password,
    });
    if (!results || !results.length) {
      next(new UnauthorizedError({ message: 'Invalid Email or Password'}));
    } else {
      res.status(200).send({message: 'User logged-in'});
    }
  } catch (error) {
    logger.error('Could not search for user', req.body, '\nwith error:', error);
    next(new BadRequestError({ message: 'Invalid User'}));
  }
}