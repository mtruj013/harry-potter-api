const express = require("express");

const router = express.Router()

const Houses = require("../houses/housesModel.js")

// get all houses
router.get("/", (req,res) => {
    Houses.findAllHouses()
    .then(houses => {
        res.json(houses)
    })
    .catch(err => {
        res.status(500)
        .json({ message: "Unable to find houses" })
    })
})

// get house by id
router.get("/:id", (req, res) => {
    const {id} = req.params;

    Houses.findHouseById(id)
        .then(houses => {
            if (houses) {
                res.json(houses)
            } else {
                res.status(404)
                .json({ message: "Unable to find house by that id" })
            }
        })
        .catch(err => {
            res.status(500)
            console.log(err)
                .json({ message: "Error getting houses" })
        })
})

// get house by name
router.get("/:house/house", (req,res) => {
    const house = req.params.house

    Houses.findHouseByName(house)
        .then(houses => {
            if(houses) {
                res.json(houses)
            } else {
                console.log(house)
                res.status(404)
                .json({ message: "Unable to find house by that name" })
            }
        })
        .catch(err => {
            res.status(500)
            console.log(err)
                .json({ message: "Error getting houses" })
        })
})

// add house
router.post("/add_house", (req,res) => {
    const { school_id, house_name, founder, common_room, traits, house_ghost, house_colors, house_element } = req.body;

    if(!school_id || !house_name || !founder){
        res.status(403)
            .json({ message: " Please provide house name, founder and valid school id" })
    } else {
        Houses.addHouse({ school_id, house_name, founder, common_room, traits, house_ghost, house_colors, house_element })
            .then(house => {
                res.status(200)
                    .json({ message: "Added house", house_name: house_name })
            })
            .catch(err => {
                console.log(err)
                res.status(500)
                    .json({ message: "Unable to add house" })
            })
    }
})

// update house
router.put("/:id/update", (req,res) => {
    const changes = req.body;

    const house_id = req.params.id;

    Houses.findHouseById(house_id)
    .then(house => {
        if(house){
            Houses.updateHouse(changes, house_id)
            .then(updated => {
                res.json(updated)
            })
            .catch(err => {
                console.log(err.message)
            })
        } else {
            res.status(404)
                .json({ message: "Unable to find house by that id" })
        }
    })
    .catch(err => {
        console.log(err)
        res.status(500)
            .json({ message: "Unable to update house" })
    })
})

// delete house 
router.delete("/:id/delete", (req,res) => {
    const {id} = req.params;

    Houses.deleteHouse(id)
        .then(deleted => {
            if(deleted){
                res.json({removed: deleted})
            } else {
                res.status(404)
                    .json({ message: "Unable to find house by that id" })
            }
        })
        .catch(err => {
            console.log(err)
            res.status(500)
                .json({ message: "Unable to delete house" })
        })
})

module.exports = router;