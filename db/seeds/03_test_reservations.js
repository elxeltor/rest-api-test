
exports.seed = function(knex) {
  // Deletes ALL existing entries
  const dateNow = new Date();
  const dateIn3Days = new Date();
  dateIn3Days.setHours(dateNow.getHours() + 3)
  return knex('reservations').del()
    .then(function () {
      // Inserts seed entries
      return knex('reservations').insert([
        {user_id: 1, room_id: 1, nb_persons: 3, from: dateNow.toISOString(), to: dateIn3Days.toISOString()},
      ]);
    });
};
