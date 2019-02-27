
exports.up = function (knex, Promise) {
  return knex.schema.createTable('contributors', function (table) {
    table.increments();
    table.integer('user_id');
    table.foreign('user_id').references('users.id').onDelete('CASCADE');
    table.integer('map_id');
    table.foreign('map_id').references('maps.id').onDelete('CASCADE');
    table.integer('point_id');
    table.foreign('point_id').references('points.id').onDelete('CASCADE');
  });
};

exports.down = function (knex, Promise) {
  return knex.schema.dropTable('contributors');
};
