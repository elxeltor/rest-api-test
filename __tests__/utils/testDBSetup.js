require('../../src/config');
const {db} = require('../../src/db');

// to isolate tests fron api DB
process.env.SQLITE_FILENAME = ':memory:';
process.env.SEEDS_DIRECTORY = '../../db/seeds';
process.env.MIGRATIONS_FOLDER = '../../db/migrations';

db.migrate.latest();

exports.resetSeeds = async () => {
  await db.seed.run();
}