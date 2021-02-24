const db = require("../data/dbConfig")

module.exports = {
    findAllMembers,
    findMembersByHouse,
    findMemberById,
    findMemberByName,
    findMemberSpells,
    findMemberSpellById,
    addMember,
    addMemberSpell,
    updateMember,
    deleteMember,
    deleteMemberSpell
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

function findMemberSpells(id) {
    return db("member_spells")
        .join("members", "members.id", "member_spells.member_id")
        .join("spells", "member_spells.spell_id", "spells.id")
        .select("member_spells.id as member_spell_id","spells.spell_name", "spells.description","spells.type","members.member_name")
        .where("members.id", id)
}

function findMemberSpellById(spell_id,member_id) {
    return db("member_spells")
        .select("*")
        .where({spell_id: spell_id, member_id: member_id})
        .first()
}

function addMember(member) {
    return db("members")
        .insert(member, "id")
}

function addMemberSpell(member_spell) {
    return db("member_spells")
        .insert(member_spell)
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

function deleteMemberSpell(id) {
    return db("member_spells")
        .where({id})
        .del()
}