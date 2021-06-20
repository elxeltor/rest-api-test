import knex from 'knex';

const knexConfig = require('../../db/knexfile.js')
const env = process.env.ENVIRONENT || 'development';


export const db = (() => {
  // Fake singleton, makes sure this is only executes the first time is loaded
  return knex(knexConfig[env]);
})();