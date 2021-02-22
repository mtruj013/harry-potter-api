const express = require("express");

const router = express.Router()

const Spells = require("../spells/spellsModel.js")

// get all spells
router.get("/", (req,res) => {
    Spells.findAllSpells()
    .then(spells => {
        res.json(spells)
    })
    .catch(err => {
        res.status(500)
        res.json({ message: "Unable to find spells." })
    })
})

// get spell by id
router.get("/:id", (req,res) => {
    const {id} = req.params;

    Spells.findSpellById(id)
        .then(spell => {
            if (spell){
                res.json(spell)
            } else {
                res.status(404)
                .json({ message: "Unable to find spell by that id" })
            }
        })
        .catch( err => {
            res.status(500)
            console.log(err)
                .json({ message: "Error getting spells." })
        })
})

// get spell by name
router.get("/:spell/spell", (req,res) => {
    const spell = req.params.spell;

    Spells.findSpellByName(spell)
        .then(spell => {
            if( spell) {
                res.json(spell)
            } else {
                res.status(404)
                .json({ message: "Unable to find spell by that name" })
            }
        })
        .catch( err => {
            res.status(500)
            console.log(err)
                res.json( {message: "Error getting spells."} )
        })
})

// add spell
router.post("/add_spell", (req,res) => {
    const { spell_name, type, description } = req.body;

    if(!spell_name || !description) {
        res.status(403)
            .json({ message: "Please provide a spell name and description." })
    } else {
        Spells.addSpell({spell_name, type, description})
        .then(spells => {
            res.status(200)
                .json({ message: "Added spell", spell_name: spell_name })
        })
        .catch(err => {
            res.status(500)
            console.log(err)
                res.json({ message: "Error adding spell." })
        })
    }
})

// update spell
router.put("/:id/update", (req,res) => {
    const changes = req.body;

    const spell_id = req.params.id;

    Spells.findSpellById(spell_id)
        .then(spell => {
            if (spell) {
                Spells.updateSpell(changes, spell_id)
                    .then(updated => {
                        res.json(updated)
                    })
                    .catch(err => {
                        console.log(err.message)
                    })
            } else {
                res.status(404)
                    .json({ message: "Unable to find spell by that id." })
            }
        })
        .catch(err => {
            console.log(err)
            res.status(500)
                .json({ message: "Error updating spell" })
        })
})

// delete spell
router.delete("/:id/delete", (req,res) => {
    const {id} = req.params;

    Spells.deleteSpell(id)
        .then(deleted => {
            if(deleted) {
                res.json({ removed: deleted })
            } else {
                res.status(404)
                    .json({ message: "Unable to find spell by that id" })
            }
        })
        .catch(err => {
            console.log(err)
            res.status(500)
                .json({ message: "Error deleting spell" })
        })
})

module.exports = router;