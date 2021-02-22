const request = require("supertest")
const server = require("../api/server")
const db = require("../data/dbConfig")

beforeEach(() => {
    return db.migrate
        .rollback()
        .then(() => db.migrate.latest())
        .then(() => db.seed.run())
})

test("GET all spells success", async() => {
    const res = await request(server)
        .get("/api/spells")
    expect(res.status).toBe(200)
})

test("GET spell by id success", async() => {
    const res = await request(server)
        .get("/api/spells/1")
    expect(res.status).toBe(200)
})

test("GET spell by id that doesn't exist", async() => {
    const res = await request(server)
        .get("/api/spells/8")
    expect(res.status).toBe(404)
})

test("GET school by name success", async() => {
    const res = await request(server)
        .get("/api/spells/accio/spell")
    expect(res.status).toBe(200)
})

test("GET school by name that doesn't exist", async() => {
    const res = await request(server)
        .get("/api/spells/test/spell")
    expect(res.status).toBe(404)
})

test("POST new spell success", async() => {
    const res = await request(server)
        .post("/api/spells/add_spell")
        .send({spell_name: "test name", description: "test description"})
    expect(res.status).toBe(200)
})

test("POST new spell missing notnullable", async() => {
    const res = await request(server)
        .post("/api/spells/add_spell")
        .send({ type: "test" })
    expect(res.status).toBe(403)
})

test("PUT update on spell success", async() => {
    const res = await request(server)
        .put("/api/spells/1/update")
        .send({spell_name: "changed"})
    expect(res.status).toBe(200)
})

test("PUT update on spell that doesn't exist", async() => {
    const res = await request(server)
        .put("/api/spells/8/update")
        .send({type: "test"})
    expect(res.status).toBe(404)
})

test("DELETE spell success", async() => {
    const res = await request(server)
        .delete("/api/spells/2/delete")
    expect(res.status).toBe(200)
})

test("DELETE spell that doesn't exist", async() => {
    const res = await request(server)
        .delete("/api/spells/8/delete")
    expect(res.status).toBe(404)
})