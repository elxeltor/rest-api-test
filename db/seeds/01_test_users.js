
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {firstname: 'user', lastname: 'one', email:'one.user@email.com', password: 'user1'},
        {firstname: 'user', lastname: 'two', email:'two.user@email.com', password: 'user2'},
        {firstname: 'user', lastname: 'three', email:'three.user@email.com', password: 'user3'},
      ]);
    });
};
