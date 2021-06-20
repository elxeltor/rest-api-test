const dotenv = require('dotenv');
const path = require('path');
dotenv.config();

const dbName = process.env.SQLITE_FILENAME || 'hotel-reservation-db.sqlite3';
const dbFileName = path.join(__dirname, '..', dbName);
const migrationFolderName = process.env.MIGRATIONS_FOLDER || './migrations';
const migrationFolderPath = path.join(__dirname, migrationFolderName);
const seedFolderName = process.env.SEEDS_DIRECTORY || './seeds';
const seedFolderPath = path.join(__dirname, seedFolderName);

const knexConfig = {
  client: 'sqlite3',
  connection: () => ({
    filename: dbFileName,
  }),
  migrations: {
    directory: migrationFolderPath,
  },
  seeds: {
    directory: seedFolderPath,
  },
  useNullAsDefault: true
};

module.exports = {
  development: knexConfig,
  staging: knexConfig,
  production: knexConfig,
};