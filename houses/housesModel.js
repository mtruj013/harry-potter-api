const db = require("../data/dbConfig");

module.exports = {
    findAllHouses,
    findHouseById,
    findHouseByName,
    addHouse,
    updateHouse,
    deleteHouse
}

function findAllHouses(){
    return db("houses")
}

function findHouseById(id){
    return db("houses")
        .where("id", id)
        .first()
}

function findHouseByName(house) {
    return db("houses")
        .select("*")
        .where("house_name", "ilike", `%${house}`)
        .first()
}

function addHouse(house, school_id) {
    return db("houses")
        .insert(house, school_id)
}

function updateHouse(changes, id) {
    return db("houses")
        .where({id})
        .update(changes, "*")
        .then(([house]) => house)
}

function deleteHouse(id) {
    return db("houses")
        .where({id})
        .del()
}