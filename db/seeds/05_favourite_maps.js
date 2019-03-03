exports.seed = function (knex, Promise) {
  return knex('favourite_maps').del()
    .then(function () {
      return knex.raw('ALTER SEQUENCE favourite_maps_id_seq RESTART WITH 101')
    .then(function () {
      return Promise.all([
        knex('favourite_maps').insert({
          id: 1,
          user_id: 7,
          map_id: 1
        }),
        knex('favourite_maps').insert({
          id: 2,
          user_id: 7,
          map_id: 2
        }),
        knex('favourite_maps').insert({
          id: 3,
          user_id: 7,
          map_id: 3
        }),
        knex('favourite_maps').insert({
          id: 4,
          user_id: 7,
          map_id: 4
        }),
        knex('favourite_maps').insert({
          id: 5,
          user_id: 33,
          map_id: 1
        }),
        knex('favourite_maps').insert({
          id: 6,
          user_id: 33,
          map_id: 6
        }),
        knex('favourite_maps').insert({
          id: 7,
          user_id: 33,
          map_id: 4
        }),
        knex('favourite_maps').insert({
          id: 8,
          user_id: 64,
          map_id: 3
        }),
        knex('favourite_maps').insert({
          id: 9,
          user_id: 64,
          map_id: 4
        }),
        knex('favourite_maps').insert({
          id: 10,
          user_id: 55,
          map_id: 3
        }),
        knex('favourite_maps').insert({
          id: 11,
          user_id: 55,
          map_id: 8
        }),
        knex('favourite_maps').insert({
          id: 12,
          user_id: 55,
          map_id: 7
        }),
        knex('favourite_maps').insert({
          id: 13,
          user_id: 34,
          map_id: 8
        }),
        knex('favourite_maps').insert({
          id: 14,
          user_id: 78,
          map_id: 8
        }),
        knex('favourite_maps').insert({
          id: 15,
          user_id: 78,
          map_id: 6
        }),
        knex('favourite_maps').insert({
          id: 16,
          user_id: 78,
          map_id: 4
        }),
        knex('favourite_maps').insert({
          id: 17,
          user_id: 78,
          map_id: 2
        }),
        knex('favourite_maps').insert({
          id: 18,
          user_id: 24,
          map_id: 8
        }),
        knex('favourite_maps').insert({
          id: 19,
          user_id: 33,
          map_id: 8
        }),
        knex('favourite_maps').insert({
          id: 20,
          user_id: 44,
          map_id: 8
        }),
        knex('favourite_maps').insert({
          id: 21,
          user_id: 22,
          map_id: 8
        }),
        knex('favourite_maps').insert({
          id: 22,
          user_id: 22,
          map_id: 3
        }),
        knex('favourite_maps').insert({
          id: 23,
          user_id: 22,
          map_id: 2
        }),
        knex('favourite_maps').insert({
          id: 24,
          user_id: 7,
          map_id: 8
        }),
        knex('favourite_maps').insert({
          id: 25,
          user_id: 7,
          map_id: 6
        }),
        knex('favourite_maps').insert({
          id: 26,
          user_id: 7,
          map_id: 9
        }),
        knex('favourite_maps').insert({
          id: 27,
          user_id: 22,
          map_id: 10
        }),
        knex('favourite_maps').insert({
          id: 28,
          user_id: 64,
          map_id: 10
        }),
        knex('favourite_maps').insert({
          id: 29,
          user_id: 24,
          map_id: 1
        })
      ]);
    });
    });
};