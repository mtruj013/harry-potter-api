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


function findSchoolByName(name) {
    return db("schools")
    .where({ name }, name)
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
        .insert(school, "id")
}


function updateSchool(changes, id) {
    return db("schools")
        .where({id}, id)
        .update(changes)
        .then(ids => {
            return findSchoolById(id[0])
        })
}


function deleteSchool(id) {
    return db("schools")
        .where({ id })
        .del()
}

