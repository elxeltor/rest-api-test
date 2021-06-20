
exports.up = function(knex, Promise) {

  return knex.schema
    .createTable('users', (table) => {
      table.increments();
      table.string('firstname').notNullable();
      table.string('lastname').notNullable();
      table.string('email').unique().notNullable();
      table.string('password').notNullable();
      table.timestamps(false, true);
    })
    .createTable('rooms', (table) => {
      table.increments();
      table.string('name').unique().notNullable();
      table.timestamps(false, true);
    })
    .createTable('reservations', (table) => {
      table.increments();
      table.integer('user_id').unsigned();
      table.foreign('user_id').references('users.id').onDelete('CASCADE');
      table.integer('room_id').unsigned();
      table.foreign('room_id').references('rooms.id').onDelete('SET NULL');
      table.integer('nb_persons').notNullable();
      table.timestamp('from').notNullable();
      table.timestamp('to').notNullable();
      table.timestamps(false, true);
    });
};

exports.down = function(knex, Promise) {
  return knex.schema
    .dropTableIfExists('reservations')
    .dropTableIfExists('users')
    .dropTableIfExists('rooms');
};
