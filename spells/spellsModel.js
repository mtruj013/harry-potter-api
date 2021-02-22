const db = require("../data/dbConfig");

module.exports = {
    findAllSpells,
    findSpellById,
    findSpellByName,
    addSpell,
    updateSpell,
    deleteSpell
}

function findAllSpells(){
    return db("spells")
}

function findSpellById(id){
    return db("spells")
        .where("id", id)
        .first()
}

function findSpellByName(spell) {
    return db("spells")
        .select("*")
        .where("spell_name", "ilike", `%${spell}%`)
        .first()
}

function addSpell(spell) {
    return db("spells")
        .insert(spell, "id")
}

function updateSpell(changes, id){
    return db("spells")
        .where({id}, id)
        .update(changes) 
        .then(ids => {
            return findSpellById(id[0])
        })
}

function deleteSpell(id) {
    return db("spells")
        .where({ id })
        .del()
}