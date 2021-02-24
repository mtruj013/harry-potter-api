const express = require("express")

const router = express.Router()

const Members = require("../members/membersModel.js")


// get all members
router.get("/", (req,res) => {
    Members.findAllMembers()
    .then(members => {
        res.json(members)
    })
    .catch(err => {
        res.status(500)
        .json({ message: "Unable to find members" })
    })
})

// get members by house
router.get("/:id/house_members",(req,res) => {
    const {id} = req.params;

    Members.findMembersByHouse(id)
        .then(members => {
            if (members.length){
                res.json(members)
            } else {
                res.status(404)
                .json({ message: "This house has no known members" })
            }
        })
        .catch( err => {
            res.json(500)
            console.log(err)
                .json({ message: "Error getting house members" })
        })
})

// get member by id
router.get("/:id", (req,res) => {
    const {id} = req.params;

    Members.findMemberById(id)
        .then(member => {
            if(member) {
                res.json(member)
            } else {
                res.status(400)
                .json({ message: "Unable to find member by that id" })
            }
        })
        .catch(err => {
                res.status(500)
                console.log(err)
                .json({ message: "Error getting members" })
            })
})

//find member by name 
router.get("/:member/member", (req,res) => {
    const member = req.params.member

    Members.findMemberByName(member)
        .then(members => {
            if(members) {
                res.json(members)
            } else {
                console.log(member)
                res.status(404)
                .json({ message: "Unable to find member by that name" })
            }
        })
        .catch( err => {
            res.status(500)
            console.log(err)
                .json({ message: "Error getting members" })
        })
})

// find member spells
router.get("/:id/spells", (req,res) => {
    const {id} = req.params;

    Members.findMemberSpells(id)
        .then(spells => {
            if(spells.length) {
                res.json(spells)
            } else {
                res.status(404)
                .json({ message: "Unable to find spells for that member" })
            }
        })
        .catch(err => {
            res.status(500)
            console.log(err)
                .json({message: "Error getting member spells"})
        })
})

//add member
router.post("/add_member", (req,res) => {
    const {member_name, blood_status, wand, nationality, species, titles, patronus, bogart, house_id} = req.body;

    if(!member_name || !blood_status || !house_id) {
        res.status(403)
            .json({ message: "Please provide name, blood status,a and house id" })
    } else {
        Members.addMember({member_name, blood_status, wand, nationality, species, titles, patronus, bogart, house_id})
        .then(member => {
            res.status(200)
                .json({ message: "Added member", member_name: member_name })
        })
        .catch( err => {
            console.log(err)
            res.status(500)
                .json({ message: "Unable to add member" })
        })
    }
})

// add member spell
router.post("/add_member_spell", (req,res) => {
    const {member_id, spell_id} = req.body;

    if(!member_id || !spell_id){
        res.status(403)
            .json({ message: "Please provide a member id and a spell id" })
    } else {
        Members.findMemberSpellById(spell_id, member_id)
        .then(spell => {
            console.log(spell)
            if(spell){
                res.status(409)
                    .json({ message: "That spell has already been added to this member" })
            } else {
                Members.addMemberSpell({ member_id, spell_id })
                .then(spell => {
                    res.status(200)
                        .json({message: "Added spell for member", member_id: member_id, spell_id:spell_id})
                })
                .catch(err => {
                    console.log(err.message)
                })
            }
        })
        .catch(err => {
            console.log(err)
            res.status(500)
                .json({ message: "Error adding member spell" })
        })
    }
})

// update member
router.put("/:id/update", (req,res) => {
    const changes = req.body;

    const member_id = req.params.id;

    Members.findMemberById(member_id)
        .then(member => {
            if(member){
                Members.updateMember(changes, member_id)
                    .then(updated => {
                        res.json(updated)
                    })
                    .catch(err => {
                        console.log(err.message)
                    })
            } else {
                res.status(404)
                    .json({ message: "Unable to find member by that id" })
            }
        })
        .catch(err => {
            console.log(err)
            res.status(500)
                .json({ message: "Error updating member" })
        })
})

// delete member
router.delete("/:id/delete", (req,res) => {
    const {id} = req.params;

    Members.deleteMember(id)
        .then(deleted => {
            if(deleted){
                res.json({removed: deleted})
            } else {
                res.status(404)
                    .json({ message: "Unable to find member by that id" })
            }
        })
        .catch(err => {
            console.log(err)
            res.status(500)
                .json({ message: "Error deleting member" })
        })
})


// delete member spell 
router.delete("/:id/spell_delete", (req,res) => {
    const {id} = req.params;

    Members.deleteMemberSpell(id)
    .then(deleted => {
        if(deleted){
            res.json({removed: deleted})
        } else {
            res.status(404)
                .json({ message: "Unable to find member spell by that id" })
        }
    })
    .catch(err => {
        console.log(err)
        res.status(500)
            .json({ message: "Error deleting member spell" })
    })
})
module.exports = router;