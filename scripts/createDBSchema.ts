import sqlite3 from 'sqlite3';
import dotenv from 'dotenv';
import knex from 'knex';
dotenv.config();

// make sure the DB file is created
const db = new (sqlite3.verbose()).Database(process.env.SQLITE_FILENAME);
db.close();

const dbKnex = knex({
  client: 'sqlite3',
  connection: () => ({
    filename: process.env.SQLITE_FILENAME,
  }),
})
