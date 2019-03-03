exports.seed = function (knex, Promise) {
  return knex('contributors').del()
    .then(function () {
      return Promise.all([
        // Inserts seed entries
        knex('contributors').insert({
          id: 1,
          user_id: 7,
          map_id: 1,
          point_id: 1
        }),
        knex('contributors').insert({
          id: 2,
          user_id: 7,
          map_id: 1,
          point_id: 2
        }),
        knex('contributors').insert({
          id: 3,
          user_id: 7,
          map_id: 1,
          point_id: 3
        }),
        knex('contributors').insert({
          id: 4,
          user_id: 7,
          map_id: 1,
          point_id: 4
        }),
        knex('contributors').insert({
          id: 5,
          user_id: 33,
          map_id: 1,
          point_id: 5
        }),
        knex('contributors').insert({
          id: 6,
          user_id: 33,
          map_id: 1,
          point_id: 6
        }),
        knex('contributors').insert({
          id: 7,
          user_id: 33,
          map_id: 1,
          point_id: 7
        }),
        knex('contributors').insert({
          id: 8,
          user_id: 64,
          map_id: 3,
          point_id: 8
        }),
        knex('contributors').insert({
          id: 9,
          user_id: 64,
          map_id: 3,
          point_id: 9
        }),
        knex('contributors').insert({
          id: 10,
          user_id: 55,
          map_id: 3,
          point_id: 10
        }),
        knex('contributors').insert({
          id: 11,
          user_id: 55,
          map_id: 8,
          point_id: 11
        }),
        knex('contributors').insert({
          id: 12,
          user_id: 55,
          map_id: 8,
          point_id: 12
        }),
        knex('contributors').insert({
          id: 13,
          user_id: 34,
          map_id: 8,
          point_id: 13
        }),
        knex('contributors').insert({
          id: 14,
          user_id: 78,
          map_id: 8,
          point_id: 14
        }),
        knex('contributors').insert({
          id: 15,
          user_id: 78,
          map_id: 8,
          point_id: 15
        }),
        knex('contributors').insert({
          id: 16,
          user_id: 78,
          map_id: 8,
          point_id: 16
        }),
        knex('contributors').insert({
          id: 17,
          user_id: 78,
          map_id: 8,
          point_id: 17
        }),
        knex('contributors').insert({
          id: 18,
          user_id: 24,
          map_id: 8,
          point_id: 18
        }),
        knex('contributors').insert({
          id: 19,
          user_id: 33,
          map_id: 8,
          point_id: 19
        }),
        knex('contributors').insert({
          id: 20,
          user_id: 44,
          map_id: 8,
          point_id: 20
        }),
        knex('contributors').insert({
          id: 21,
          user_id: 22,
          map_id: 8,
          point_id: 21
        }),
        knex('contributors').insert({
          id: 22,
          user_id: 22,
          map_id: 8,
          point_id: 22
        }),
        knex('contributors').insert({
          id: 23,
          user_id: 22,
          map_id: 8,
          point_id: 23
        })
    ]);
  });
};