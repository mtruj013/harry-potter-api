
exports.up = function(knex) {
    return knex.schema
    .createTable("schools", tbl => {
        tbl.increments(); // for primary key
        tbl.string("name")
            .notNullable()
            .unique();
        tbl.string("location")
        tbl.string("headmaster")
    })

    .createTable("houses", tbl => {
        tbl.increments();
        tbl.string("name")
            .notNullable()
            .unique();
        tbl.string("founder")
            .notNullable()
        tbl.string("house_head")
            .unique();
        tbl.string("common_room")
            .unique()
        tbl.string("traits")
        tbl.string("house_ghost")
        tbl.string("house_colors")
        tbl.string("house_element")
        tbl.integer("school_id") // foriegn key
            .unsigned()
            .notNullable()
            .references("id")
            .inTable("schools")
            .onUpdate("CASCADE")
            .onDelete("CASCADE")
    })

    .createTable("members", tbl => {
        tbl.increments();
        tbl.string("name")
            .notNullable()
            .unique();
        tbl.string("blood_status")
            .notNullable();
        tbl.string("wand")
        tbl.string("nationality")
        tbl.string("species")
        tbl.string("titles")
        tbl.string("patronus")
        tbl.string("bogart")
        tbl.integer("house_id") // foreign key
            .unsigned()
            .notNullable()
            .references("id")
            .inTable("houses")
            .onUpdate("CASCADE")
            .onDelete("CASCADE");
    })

    .createTable("spells", tbl => {
        tbl.increments();
        tbl.string("name")
            .notNullable()
            .unique();
        tbl.string("type")
        tbl.string("description")
            .notNullable();
    })

    .createTable("member_spells", tbl => {
        tbl.increments();
        tbl.integer("member_id") // foreign key
            .unsigned()
            .notNullable()
            .references("id")
            .inTable("members")
            .onUpdate("CASCADE")
            .onDelete("CASCADE")
        tbl.integer("spell_id") // foreign key
            .unsigned()
            .notNullable()
            .references("id")
            .inTable("spells")
            .onUpdate("CASCADE")
            .onDelete("CASCADE")
    })
};

exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists("member_spells")
    .dropTableIfExists("spells")
    .dropTableIfExists("members")
    .dropTableIfExists("houses")
    .dropTableIfExists("schools");
};
