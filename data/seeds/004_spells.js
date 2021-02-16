
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('spells')
    .then(function () {
      // Inserts seed entries
      return knex('spells').insert([
        {
          spell_name: "Stunning Spell",
          type: "Charm",
          description: "Knocks out target"
        },
        {
          spell_name: "Accio",
          type: "Charm",
          description: "Sommons an object"
        }
      ]);
    });
};
