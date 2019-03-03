exports.seed = function(knex, Promise) {
  return knex('maps').del()
    .then(function () {
      return Promise.all([
        // Inserts seed entries
        knex('maps').insert({
          id: 1,
          location: 'Toronto',
          name: 'Suicide Squad',
          creator_id: 7,
          latitude: 43.6529,
          longitude: -79.3849
        }),
        knex('maps').insert({
          id: 2,
          location: 'Chicago',
          name: 'Ferris Bueller\'s Day Off',
          creator_id: 35,
          latitude: 41.8756,
          longitude: -87.6244
        }),
        knex('maps').insert({
          id: 3,
          location: 'Toronto',
          name: 'Harold & Kumar',
          creator_id: 73,
          latitude: 43.6529,
          longitude: -79.3849
        }),
        knex('maps').insert({
          id: 4,
          location: 'New York',
          name: 'The Wolf Of Wall Street ',
          creator_id: 34,
          latitude: 40.7648,
          longitude: -73.9808
        }),
        knex('maps').insert({
          id: 5,
          location: 'Toronto',
          name: 'IT',
          creator_id: 13,
          latitude: 43.6529,
          longitude: -79.3849
        }),
        knex('maps').insert({
          id: 6,
          location: 'Hawaii',
          name: 'Jurassic Park',
          creator_id: 75,
          latitude: 21.31139,
          longitude: -157.79639
        }),
        knex('maps').insert({
          id: 7,
          location: 'Boston',
          name: 'Good Will Hunting',
          creator_id: 84,
          latitude: 42.3605,
          longitude: -71.0596
        }),
        knex('maps').insert({
          id: 8,
          location: 'Toronto',
          name: 'Spotlight',
          creator_id: 38,
          latitude: 43.6529,
          longitude: -79.3849
        }),
        knex('maps').insert({
          id: 9,
          location: 'Vancouver',
          name: 'Deadpool',
          creator_id: 55,
          latitude: 49.2609,
          longitude: -123.1139
        }),
        knex('maps').insert({
          id: 10,
          location: 'Las Vegas',
          name: 'Ocean\'s Eleven',
          creator_id: 92,
          latitude: 36.1663,
          longitude: -115.1492
        })
      ]);
    });
};
