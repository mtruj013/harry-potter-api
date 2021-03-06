const db = require("../data/dbConfig");

module.exports = {
    findAllSchools,
    findSchoolHouses,
    findSchoolByName,
    findSchoolById,
    addSchool,
    updateSchool,
    deleteSchool
};


function findAllSchools() {
    return db("schools")
}


function findSchoolById(id) {
    return db("schools")
        .where("id", id)
        .first()
}


function findSchoolByName(school) {
    return db("schools")
        .select("*")
        .where( "school_name", "ilike", `%${school}%`)
        .first()
}


function findSchoolHouses(id) {
    return db("houses")
        .join("schools", "houses.school_id", "schools.id")
        .select("houses.id", "houses.house_name", "schools.school_name")
        .where("schools.id", id)
}


function addSchool(school) {
    return db("schools")
        .insert(school, "*")
}


function updateSchool(changes, id) {
    return db("schools")
        .where({id})
        .update(changes, "*")
        .then(([school]) => school)
}


function deleteSchool(id) {
    return db("schools")
        .where({ id })
        .del()
}

