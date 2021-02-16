
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('members')
    .then(function () {
      // Inserts seed entries
      return knex('members').insert([
        {
          member_name:"Harry Potter",
          blood_status:"half-blood",
          wand: "11', Holly, phoenix feather",
          nationality: "British",
          species: "human",
          titles: "The Boy Who Live, The Chosen One, Master of Death, Undesirable no. 1, Lightning, Potty Wee, Parry Otter",
          patronus: "stag",
          bogart: "dementor",
          house_id: 1
        },
        {
          member_name:"Luna Lovegood",
          blood_status:"half-blood",
          nationality: "British",
          species: "human",
          titles: "Hogwarts Quidditch Commentator",
          patronus: "hare",
          house_id: 2
        }
      ]);
    });
};
