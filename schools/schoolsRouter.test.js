// const { expect } = require("helmet");
const { expectCt } = require("helmet");
const request = require("supertest")
const server = require("../api/server")
const db = require("../data/dbConfig")

beforeEach(() => {
    return db.migrate
        .rollback()
        .then(() => db.migrate.latest())
        .then(() => db.seed.run())
});

test("GET /api/schools/ ", async () => {
    const res = await request(server)
        .get("/api/schools/")
    expect(res.status).toBe(200);
})

test("GET api/schools/:id", async () => {
    const res = await request(server)
        .get("/api/schools/1")
    expect(res.status).toBe(200)
})

test("GET api/schools/:school/school", async () => {
    const res = await request(server)
        .get("/api/schools/Hogwarts/school")
    expect(res.status).toBe(200)
})

test("GET api/schools/:id/school_houses", async () => {
    const res = await request(server)
        .get("/api/schools/1/school_houses")
    expect(res.status).toBe(200)
})

test("POST api/schools/add-school", async () => {
    const res = await request(server)
        .post("/api/schools/add-school")
        .send({ school_name: "test_name", location: "test_location", headmaster: "test_headmaster"})
    expect(res.status).toBe(200)
})

test("PUT api/schools/:id/update", async () =>{
    const res = await request(server)
        .put("/api/schools/1/update")
        .send({ location: "test_name"})
    expect(res.status).toBe(200)
})

test("DELETE api/schools/:id/delete", async () => {
    const res = await request(server)
        .delete("/api/schools/2/delete")
    expect(res.status).toBe(200)
})