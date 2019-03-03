exports.seed = function (knex, Promise) {
  return knex('points').del()
    .then(function () {
      return knex.raw('ALTER SEQUENCE points_id_seq RESTART WITH 101')
    .then(function () {
      return Promise.all([
        // Inserts seed entries
        knex('points').insert({
          id: 1,
          map_id: 1,
          name: 'Central Station',
          image: 'https://torontoist.com/wp-content/uploads/2016/12/2016_12_08lowebay-oldtrain-640x261-640x261.jpg',
          details: 'Underground attack at \'Central\' subway station',
          latitude: 43.6701511,
          longitude: -79.3928834,
          location: 'Lower Bay Station'
        }),
        knex('points').insert({
          id: 2,
          map_id: 1,
          name: 'Helicopter crash',
          image: 'https://torontoist.com/wp-content/uploads/2016/12/2016_12_08helicrash-Harbour60-640x260-640x260.jpg',
          details: 'Our heroes’ helicopter crashes',
          latitude: 43.6425954,
          longitude: -79.3776355,
          location: 'Harbour 60'
        }),
        knex('points').insert({
          id: 3,
          map_id: 1,
          name: 'Plane crash',
          image: 'https://torontoist.com/wp-content/uploads/2016/12/2016_12_08helicrash-dundassq-640x260-640x260.jpg',
          details: 'Plane crash scene',
          latitude: 43.6560811,
          longitude: -79.3801714,
          location: 'Yonge & Dundas Square'
        }),
        knex('points').insert({
          id: 4,
          map_id: 1,
          name: 'Ostrander Federal Building',
          image: 'https://torontoist.com/wp-content/uploads/2016/12/2016_12_08ostrander2-640x265-640x265.jpg',
          details: 'Battle scenes ',
          latitude: 43.660048,
          longitude: -79.3898123,
          location: 'Mars complex'
        }),
        knex('points').insert({
          id: 5,
          map_id: 1,
          name: 'Another Helicopter Crash!',
          image: 'https://torontoist.com/wp-content/uploads/2016/12/2016_12_08helicrash-rbc-640x264-640x264.jpg',
          details: 'Helicopter crash scene',
          latitude: 43.6473608,
          longitude: -79.3796377,
          location: 'Royal Bank Plaza'
        }),
        knex('points').insert({
          id: 6,
          map_id: 1,
          name: 'Power Walking',
          image: 'https://torontoist.com/wp-content/uploads/2016/12/2016_12_08heroshot-640x259-640x259.jpg',
          details: 'Suicide Squad slow-mo, power-walking shot',
          latitude: 43.669047,
          longitude: -79.3926166,
          location: 'Gucci on Bloor St'
        }),
        knex('points').insert({
          id: 7,
          map_id: 1,
          name: 'Final Scene',
          image: 'https://torontoist.com/wp-content/uploads/2016/12/2016_12_08Union-Ext-sorta-fix.jpg',
          details: 'End of the explosive final scene',
          latitude: 43.6452073,
          longitude: -79.3827771,
          location: 'Union Station'
        }),
        knex('points').insert({
          id: 8,
          map_id: 3,
          name: 'Harold & Kumar\'s Place',
          image: 'http://torontoist.com/attachments/toronto_davidf/2008_06_17_mayfair1.jpg',
          details: 'The apartment the boys live in',
          latitude: 43.683259,
          longitude: -79.399813,
          location: 'Mayfair Mansions'
        }),
        knex('points').insert({
          id: 9,
          map_id: 3,
          name: 'Princeton',
          image: 'http://torontoist.com/attachments/toronto_davidf/2008_06_17_knox.jpg',
          details: 'Pit stop at Princeton to buy marijuana from one of the students',
          latitude: 43.6611288,
          longitude: -79.3969408,
          location: 'Knox College'
        }),
        knex('points').insert({
          id: 10,
          map_id: 3,
          name: 'Burger Shack',
          image: 'http://torontoist.com/attachments/toronto_davidf/2008_06_17_burgershack.jpg',
          details: 'The boys’ first stop in pursuit of the perfect burger',
          latitude: 43.62831,
          longitude: -79.532433,
          location: 'Baker\'s Dozen on Kipling'
        }),
        knex('points').insert({
          id: 11,
          map_id: 8,
          name: 'Boston Globe Newsroom',
          image: 'https://torontoist.com/wp-content/uploads/2016/01/2016_01_20_newsroom-640x3331-640x333.jpg',
          details: 'Boston Globe newsroom interior set',
          latitude: 43.7126242,
          longitude: -79.5541335,
          location: 'Old Sears facility'
        }),
        knex('points').insert({
          id: 12,
          map_id: 8,
          name: 'Police Station',
          image: 'https://torontoist.com/wp-content/uploads/2016/01/2016_01_20_policestation2-640x2651-640x265.jpg',
          details: 'Opening scene set in police station',
          latitude: 43.6644345,
          longitude: -79.4654999,
          location: 'Old 11 Division'
        }),
        knex('points').insert({
          id: 13,
          map_id: 8,
          name: 'Diner',
          image: 'https://torontoist.com/wp-content/uploads/2016/01/2016_01_20_goldendiner-640x335-640x335.jpg',
          details: 'Mark Ruffalo & Stanley Tucci\'s characters have dinner',
          latitude: 43.6622232,
          longitude: -79.3775612,
          location: 'Golden Diner'
        }),
        knex('points').insert({
          id: 14,
          map_id: 8,
          name: 'Catholic Charities Gala',
          image: 'https://torontoist.com/wp-content/uploads/2016/01/2016_01_20_galaballroom-royalyork-640x3321-640x332.jpg',
          details: 'The reporters attend a Catholic Charities Gala',
          latitude: 43.6459054,
          longitude: -79.3836526,
          location: 'Royal York Ballroom'
        }),
        knex('points').insert({
          id: 15,
          map_id: 8,
          name: 'Meeting',
          image: 'https://torontoist.com/wp-content/uploads/2016/01/2016_01_20_dbar-fourseasons-640x336-640x336.jpg',
          details: 'Michael Keaton meets with the Catholic Charities president',
          latitude: 43.6691486,
          longitude: -79.3971529,
          location: 'Park Hyatt Lounge'
        }),
        knex('points').insert({
          id: 16,
          map_id: 8,
          name: 'Meeting',
          image: 'https://torontoist.com/wp-content/uploads/2016/01/2016_01_20_ProvidenceResto-Trump-640x3321-640x332.jpg',
          details: 'Michael Keaton meets with former schoolmate',
          latitude: 43.6502226,
          longitude: -79.380995,
          location: 'Bay Street Mercatto'
        }),
        knex('points').insert({
          id: 17,
          map_id: 8,
          name: 'Meeting',
          image: 'https://torontoist.com/wp-content/uploads/2016/01/2016_01_20_scarboroughgolfcoruse-640x337-640x337.jpg',
          details: 'Michael Keaton meets with lawyer pal',
          latitude: 43.7549389,
          longitude: -79.2098667,
          location: 'Scarboro Golf and Country Club'
        }),
        knex('points').insert({
          id: 18,
          map_id: 8,
          name: '9/11 Cover Story',
          image: 'https://torontoist.com/wp-content/uploads/2016/01/2016_01_20_pickeringcomfortinn-640x3321.jpg',
          details: 'Mark Ruffalo’s character is sent down to Miami to cover a 9/11 story',
          latitude: 43.813225,
          longitude: -79.1244206,
          location: 'Pickering Comfort Inn.'
        }),
        knex('points').insert({
          id: 19,
          map_id: 8,
          name: 'Looking for Court Records',
          image: 'https://torontoist.com/wp-content/uploads/2016/01/2016_01_20_oldcityhall-640x3381-640x338.jpg',
          details: 'Ruffalo and Rachel McAdams go hunting for court records',
          latitude: 43.6526301,
          longitude: -79.3817017,
          location: 'Old City Hall'
        }),
        knex('points').insert({
          id: 20,
          map_id: 8,
          name: 'Courtroom Scenes',
          image: 'https://torontoist.com/wp-content/uploads/2016/01/2016_01_20_sopinkacourthouse-640x3351-640x335.jpg',
          details: 'Several courtroom scenes',
          latitude: 43.2551406,
          longitude: -79.8697588,
          location: 'John Sopinka Courthouse'
        }),
        knex('points').insert({
          id: 21,
          map_id: 8,
          name: 'Lawyer\'s Office',
          image: 'https://torontoist.com/wp-content/uploads/2016/01/2016_01_20_bayadelaide2-640x3321-640x332.jpg',
          details: 'Billy Crudup’s character\'s lawyer\'s office',
          latitude: 43.6504356,
          longitude: -79.3826472,
          location: 'Bay Adelaide Centre'
        }),
        knex('points').insert({
          id: 22,
          map_id: 8,
          name: 'Children\'s Choir',
          image: 'https://torontoist.com/wp-content/uploads/2016/01/2016_01_20_stbasils-640x334-640x334.jpg',
          details: 'Mark Ruffalo watches a children’s choir',
          latitude: 43.6663622,
          longitude: -79.3911107,
          location: 'St. Basil\'s'
        }),
        knex('points').insert({
          id: 23,
          map_id: 8,
          name: 'Church Scene',
          image: 'https://torontoist.com/wp-content/uploads/2016/01/2016_01_20_church-stpaulsrunnymede-640x3361-640x336.jpg',
          details: 'McAdams goes to church with her mom',
          latitude: 43.6663618,
          longitude: -79.3976768,
          location: 'St. Pauls'
        })
      ]);
    });
    });
};