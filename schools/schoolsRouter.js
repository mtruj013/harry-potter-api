const express = require("express");

const router = express.Router()

const Schools = require("../schools/schoolsModal.js")

// get all schools
router.get("/", (req,res) => {
    Schools.findAllSchools()
    .then(schools => {
        res.json(schools)
    })
    .catch(er => {
        res.status(500)
        .json(er)
    })
})

// get school by id
router.get("/:id", (req, res) => {
    const { id } = req.params;

    Schools.findSchoolById(id)
        .then(schools => {
            if (schools) {
                res.json(schools)
            } else {
                res.status(400)
                .json({ message: "Unable to find school by that id" })
            }
        })
        .catch(err => {
            res.status(500)
            console.log(err)
                .json({ message: "Error getting schools"})
        })
})

//get school by name
router.get("/:school/school", (req,res) => {
    const school = req.params.school
    console.log(school)

    Schools.findSchoolByName(school)
        .then(schools => {
            if (schools) {
                res.json(schools)
            } else {
                res.status(404)
                .json({ message: "Unable to find school by that name" })
            }
        })
        .catch(err => {
            res.status(500)
            console.log(err)
                .json({ message: "Error getting schools" })
        })
}) 


// get school houses 
router.get("/:id/school_houses", (req,res) => {
    const { id } = req.params;

    Schools.findSchoolHouses(id)
        .then(houses => {
            if (houses.length) {
                res.json(houses)
            } else {
                res.status(404)
                .json({ message: "This school has no known houses" })
            }
        })
        .catch(err => {
            res.status(500)
            .json({ message: "Error getting schools houses" })
        })
})

// add a new school
router.post("/add-school", (req,res) => {
    const { school_name, location, headmaster } = req.body;
    
    if(!school_name){
        res.status(403)
            .json({ message: "Please provide a name (required), location and headmaster (optional)" })
    } else {
        Schools.addSchool({ school_name, location, headmaster })
            .then(school => {
                res.status(200)
                    .json({ message: "Added School", school_name: school_name })
            })
            .catch(err => {
                console.log(err)
                res.status(500)
                    .json({ message: "Unable to add school" })
            })
    }
})

// update school
router.put("/:id/update", (req,res) => {
    const changes = req.body; 

    const school_id = req.params.id;

    Schools.findSchoolById(school_id)
    .then(school => {
        if(school){
            Schools.updateSchool(changes, school_id)
            .then(updated => {
                res.json(updated)
            })
            .catch(err => {
                console.log(err.message)
            })   
        } else {
            res.status(404)
            .json({ message: "Unable to find school by that id" })
        }
    })
    .catch(err => {
        console.log(err)
        res.status(500)
        .json({ message: "Unable to update item" })
    })
})

// delete school
router.delete("/:id/delete", (req,res) => {
    const { id } = req.params;

    Schools.deleteSchool(id)
        .then(deleted => {
            if(deleted){
                res.json({removed: deleted})
            } else {
                res.status(404)
                .json({message: "Unable to access school by that id"})
            }
        })
        .catch(err => {
            console.log(err)
            res.status(500)
            .json({ message: "Unable to delete school" })
        })
})

module.exports = router;