const request = require("supertest")
const server = require("../api/server")
const db = require("../data/dbConfig")

beforeEach(() => {
    return db.migrate
        .rollback()
        .then(() => db.migrate.latest())
        .then(() => db.seed.run())
})

test("GET all members success", async () => {
    const res = await request(server)
        .get("/api/members/")
    expect(res.status).toBe(200)
})

test("GET member by house success", async () => {
    const res = await request(server)
        .get("/api/members/1/house_members")
    expect(res.status).toBe(200)
})

test("GET member by house that doesn't exist", async() => {
    const res = await request(server)
        .get("/api/members/8/house_members")
    expect(res.status).toBe(404)
})

test("GET member by id success", async() => {
    const res = await request(server)
        .get("/api/members/1")
    expect(res.status).toBe(200)
})

test("GET member by id that doesn't exist", async() => {
    const res = await request(server)
        .get("/api/members/7")
    expect(res.status).toBe(400)
})

test("GET member by name success", async() => {
    const res = await request(server)
        .get("/api/members/harry/member")
    expect(res.status).toBe(200)
})

test("GET member by name that doesn't exist", async() => {
    const res = await request(server)
        .get("/api/members/test/member")
    expect(res.status).toBe(404)
})

test("POST add member success", async() => {
    const res = await request(server)
        .post("/api/members/add_member")
        .send({ member_name: "test", blood_status: "test_status", house_id: 1 })
    expect(res.status).toBe(200)
})

test("POST add member failure", async() => {
    const res = await request(server)
        .post("/api/members/add_member")
        .send({ member_name: "test" })
    expect(res.status).toBe(403)
})

test("PUT update member success", async() => {
    const res = await request(server)
        .put("/api/members/1/update")
        .send({ blood_status: "test" })
    expect(res.status).toBe(200)
})

test("PUT update member that doesn't exist", async() => {
    const res = await request(server)
        .put("/api/members/9/update")
        .send({ member_name: "test" })
    expect(res.status).toBe(404)
})

test("DELETE member success", async() => {
    const res = await request(server)
        .delete("/api/members/1/delete")
    expect(res.status).toBe(200)
})

test("DELETE member that doesn't exist", async() => {
    const res = await request(server)
        .delete("/api/members/8/delete")
    expect(res.status).toBe(404)
})