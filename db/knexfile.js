const dotenv = require('dotenv');
const path = require('path');
dotenv.config();

const dbName = process.env.SQLITE_FILENAME || 'hotel-reservation-db.sqlite3';
const dbFileName = path.join(__dirname, '..', dbName);

const knexConfig = {
  client: 'sqlite3',
  connection: () => ({
    filename: dbFileName,
  }),
  migrations: {
    directory: './migrations',
  },
  seeds: {
    directory: './seeds',
  },
  useNullAsDefault: true
};

module.exports = {
  development: knexConfig,
  staging: knexConfig,
  production: knexConfig,
};