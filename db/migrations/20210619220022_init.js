
exports.up = function(knex, Promise) {

  return knex.schema
    .createTable('users', (table) => {
      table.increments();
      table.string('name');
      table.string('password');
      table.timestamps();
    })
    .createTable('rooms', (table) => {
      table.increments();
      table.string('name');
      table.timestamps();
    })
    .createTable('reservations', (table) => {
      table.increments();
      table.integer('user_id').unsigned();
      table.foreign('user_id').references('users.id').onDelete('CASCADE');
      table.integer('room_id').unsigned();
      table.foreign('room_id').references('rooms.id').onDelete('SET NULL');
      table.timestamp('from').notNullable();
      table.timestamp('to').notNullable();
      table.timestamps();
    });
};

exports.down = function(knex, Promise) {
  return knex.schema
    .dropTableIfExists('reservations')
    .dropTableIfExists('users')
    .dropTableIfExists('rooms');
};
