
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('member_spells').del()
    .then(function () {
      // Inserts seed entries
      return knex('member_spells').insert([
       {
         member_id: 1,
         spell_id: 1
       },
       {
         member_id: 1,
         spell_id: 2
       }
      ]);
    });
};
