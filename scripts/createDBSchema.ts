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

dbKnex.schema.createTableIfNotExists('users', (table) => {
  table.increments();
  table.string('name');
  table.string('password');
  table.timestamps();
});

dbKnex.schema.createTableIfNotExists('rooms', (table) => {
  table.increments();
  table.string('name');
  table.timestamps();
});

dbKnex.schema.createTableIfNotExists('reservations', (table) => {
  table.increments();
  table.integer('user_id').unsigned();
  table.foreign('user_id').references('users.id').onDelete('CASCADE');
  table.integer('room_id').unsigned();
  table.foreign('room_id').references('rooms.id').onDelete('SET NULL');
  table.timestamp('from').notNullable();
  table.timestamp('to').notNullable();
  table.timestamps();
});
