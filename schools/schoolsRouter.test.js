const { default: expectCt } = require("helmet/dist/middlewares/expect-ct");
const request = require("supertest")
const server = require("../api/server")
const db = require("../data/dbConfig")

beforeEach(() => {
    return db.migrate
        .rollback()
        .then(() => db.migrate.latest())
        .then(() => db.seed.run())
});


test(" GET all schools success", async () => {
    const res = await request(server)
        .get("/api/schools/")
    expect(res.status).toBe(200);
})


test("GET schools by id success", async () => {
    const res = await request(server)
        .get("/api/schools/1")
    expect(res.status).toBe(200)
})


test("GET school by id that doesn't exist", async () => {
    const res = await request(server)
        .get("/api/schools/5")
    expect(res.status).toBe(400)
})


test("GET school by school name success", async () => {
    const res = await request(server)
        .get("/api/schools/Hogwarts/school")
    expect(res.status).toBe(200)
})


test("GET school by name that does not exist", async () => {
    const res = await request(server)
        .get("/api/schools/test/school")
    expect(res.status).toBe(404)
})


test("GET school's houses by school id success", async () => {
    const res = await request(server)
        .get("/api/schools/1/school_houses")
    expect(res.status).toBe(200)
})


test("GET houses for school that doesn't exist", async  () => {
    const res = await request(server)
        .get("/api/schools/5/school_houses")
    expect(res.status).toBe(404)
})


test("POST add school success", async () => {
    const res = await request(server)
        .post("/api/schools/add-school")
        .send({ school_name: "test_name", location: "test_location", headmaster: "test_headmaster"})
    expect(res.status).toBe(200)
})


test("POST add school when missing school name", async () => {
    const res = await request(server)
        .post("/api/schools/add-school")
        .send({name: "test_name"})
    expect(res.status).toBe(403)
})


test("PUT update a school success", async () =>{
    const res = await request(server)
        .put("/api/schools/1/update")
        .send({ location: "test_name"})
    expect(res.status).toBe(200)
})

test("PUT update a school with id that does not exist", async () => {
    const res = await request(server)
        .put("/api/schools/6/update")
        .send({location: "test_name"})
    expect(res.status).toBe(404)
})


test("DELETE school success", async () => {
    const res = await request(server)
        .delete("/api/schools/2/delete")
    expect(res.status).toBe(200)
})

test("DELETE school that does not exist", async () => {
    const res = await request(server)
        .delete("/api/schools/6/delete")
    expect(res.status).toBe(404)
})