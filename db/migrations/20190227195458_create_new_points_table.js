
exports.up = function (knex, Promise) {
  return knex.schema.createTable('points', function (table) {
    table.increments();
    table.integer('map_id');
    table.foreign('map_id').references('maps.id').onDelete('CASCADE');
    table.string('name');
    table.string('image');
    table.string('details');
  });
};

exports.down = function (knex, Promise) {
  return knex.schema.dropTable('points');
};
