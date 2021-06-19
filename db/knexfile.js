const dotenv = require('dotenv');
dotenv.config();

const dbFileName = 'hotel-reservation-db.sqlite3';

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