
exports.up = function (knex, Promise) {
  return knex.schema.table('points', function (table) {
    table.string('location').notNull().defaultTo('0');
  });
};

exports.down = function (knex, Promise) {
  return knex.schema.table('points', function (table) {
    table.dropColumn('location');
  });
};
