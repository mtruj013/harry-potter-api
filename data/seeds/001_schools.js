
exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('schools')//.del()
    .then(function () {
      // Inserts seed entries
      return knex('schools').insert([
        {
          school_name: "Hogwarts School of Witchcraft and Wizadry",
          location: "Hogwarts Castle, HIghlands, Scotland, Great Britain",
          headmaster: "Minerva McGonagall"
        },
        {
          school_name: "Ilvermony School of Wicthcraft and Wizardry",
          location: "Mount Greylock, Massachusetts, United States of America, North America",
          headmaster: "Agilbert Fontaine"
        },
        {
          school_name: "Beauxbatons Academy of Magic",
          location: "French Pyrenees",
          headmaster: "Olympe Maxime"
        }
      ]);
    });
};
