const request = require("supertest")
const server = require("../api/server")
const db = require("../data/dbConfig")

beforeEach(() => {
    return db.migrate
        .rollback()
        .then(() => db.migrate.latest())
        .then(() => db.seed.run())
})

test("GET all houses success", async () => {
    const res = await request(server)
        .get("/api/houses/")
    expect(res.status).toBe(200)
})

test("GET house by id success", async () => {
    const res = await request(server)
        .get("/api/houses/1")
    expect(res.status).toBe(200)
})

test("GET house by id that doesn't exist", async () => {
    const res = await request(server)
        .get("/api/houses/6")
    expect(res.status).toBe(404)
})

test("GET house by house name success", async () => {
    const res = await request(server)
        .get("/api/houses/Ravenclaw/house")
    expect(res.status).toBe(200)
})

test("GET house by house name that doesn't exist", async () => {
    const res = await request(server)
        .get("/api/houses/test/house")
    expect(res.status).toBe(404)
})

test("POST add house success", async() => {
    const res = await request(server)
        .post("/api/houses/add_house")
        .send({ house_name: "test", founder: "test", school_id: 1 })
    expect(res.status).toBe(200)
})

test("POST add house missing house name", async() => {
    const res = await request(server)
        .post("/api/houses/add_house")
        .send({  founder: "test", school_id: 1 })
    expect(res.status).toBe(403)
})

test("PUT update a house success", async () => {
    const res = await request(server)
        .put("/api/houses/1/update")
        .send({ house_ghost: "test" })
    expect(res.status).toBe(200)
})

test("PUT update a house that doesn't exist", async () => {
    const res = await request(server)
        .put("/api/houses/7/update")
        .send({ house_ghost: "test" })
    expect(res.status).toBe(404)
})

test("DELETE house success", async () => {
    const res = await request(server)
        .delete("/api/houses/3/delete")
    expect(res.status).toBe(200)
})

test("DELETE house that doesn't exist", async () => {
    const res = await request(server)
        .delete("/api/houses/6/delete")
    expect(res.status).toBe(404)
})