import request from "supertest"
import app from "../../app.js"

describe("POST CRUD Level 1", () => {
    let createdPost

    // positive case start here
    it("Create Post - Success", async () => {
        const payload = {
                title: "Article 1",
                author: "Penulis 1",
                content: "Isi artikel 1"
        }

        const res = await request(app)
            .post("/posts")
            .send(payload)

        expect(res.statusCode).toBe(201)
        expect(res.body).toHaveProperty("id")

        createdPostId = res.body.id
    })

    it("Get All Posts", async () => {
        const res = await request(app)
            .get("/posts")
        
        expect(res.statusCode).toBe(200)
        expect(Array.isArray(res.body)).toBe(true)
    })

    it("Get post by ID", async () => {
        const res = await request(app)
            .get(`/posts/${createdPostId}`)

        expect(res.statusCode).toBe(200)
        expect(res.body.id).toBe(createdPostId)
    })

    it("Update post by ID", async () => {
        const payload = {
                title: "ganti judul"
        }

        const res = await request(app)
            .patch(`/posts/${createdPostId}`)
            .send(payload)

        expect(res.statusCode).toBe(200)
        expect(res.body.title).toBe(payload.title)
    })

    it("Delete post by ID", async () => {
        const res = await request(app)
            .delete(`/posts/${createdPostId}`)

        expect(res.statusCode).toBe(200)
        expect(res.body.message).toBeDefined()
    })


    // negative case starts here
    it("POST /posts - title is missing", async () => {
        const res = await request(app)
            .post("/posts")
            .send({
                content: "isi",
                author: "penulis"
            })

        expect(res.statusCode).toBe(404)
        expect(res.body.message).toBeDefined()
    })

    it("GET /posts/:id - post not found", async () =>{
        const res = await request(app)
            .get("/posts/9999")

        expect(res.statusCode).toBe(404)
        // /i agar case insensitive
        expect(res.body.message).toMatch(/tidak ditemukan/i)
    })

    it("PATCH /posts/:id - post not found", async () => {
        const res = await request(app)
            .patch("/posts/9999")
            .send({ title: "judul"})

        expect(res.statusCode).toBe(404)
        expect(res.body.message).toMatch(/tidak ditemukan/i)
    })

    it("DELETE /posts/:id - post not found", async () => {
        const res = await request(app)
            .delete("/posts/9999")

        expect(res.statusCode).toBe(404)
        expect(res.body.message).toMatch(/tidak ditemukan/i)
    })
})