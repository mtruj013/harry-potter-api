const db = require("../data/dbConfig")

module.exports = {
    findAllMembers,
    findMembersByHouse,
    findMemberById,
    findMemberByName,
    addMember,
    updateMember,
    deleteMember
}

function findAllMembers() {
    return db("members")
}


function findMembersByHouse(id) {
    return db("members")
        .join("houses", "members.house_id", "houses.id")
        .select("members.id","houses.house_name", "members.member_name", "members.blood_status", "members.wand", "members.nationality", "members.species", "members.titles", "members.patronus", "members.bogart")
        .where("houses.id", id)
}

function findMemberById(id) {
    return db("members")
        .where("id", id)
        .first()
}

function findMemberByName(member) {
    return db("members")
        .select("*")
        .where("member_name", "ilike", `%${member}%`)
        .first()
}

function addMember(member) {
    return db("members")
        .insert(member, "id")
}

function updateMember(changes, id) {
    return db("members")
        .where({id}, id)
        .update(changes)
        .then(ids => {
            return findMemberById(id[0])
        })
}

function deleteMember(id){
    return db("members")
        .where({id})
        .del()
}