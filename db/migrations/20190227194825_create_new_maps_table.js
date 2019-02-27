
exports.up = function (knex, Promise) {
  return knex.schema.createTable('maps', function (table) {
    table.increments();
    table.string('location');
    table.string('name');
    table.integer('creator_id');
    table.foreign('creator_id').references('users.id').onDelete('CASCADE');
  });
};

exports.down = function (knex, Promise) {
  return knex.schema.dropTable('maps');
};
