
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('houses')//.del()
    .then(function () {
      // Inserts seed entries
      return knex('houses').insert([
        {
          school_id : 1,
          name: "Gryffindor",
          founder: "Godric Gryffiindor",
          common_room: "Gryffindor Tower",
          traits: "Courage, Bravery, Determination, Daring, Nerve, Chivalry",
          house_ghost: "Nearly Headless Nick",
          house_colors: "Scarlet, Gold",
          house_element: "Fire",
        },
        {
          school_id : 1,
          name: "Ravenclaw",
          founder: "Rowena Ravenclaw",
          common_room: "Ravenclaw Tower",
          traits: "Wit, Learning, Wisdom, Acceptance, Intelligence, Creativity",
          house_ghost: "Grey Lady",
          house_colors: "Blue, Bronze",
          house_element: "Air",
          
        },
        {
          school_id : 2,
          name: "Thunderbird",
          founder: "Chadwick Boot",
          traits: "Soul, Adventure",
          house_element: "Soul",
        }
      ]);
    });
};
