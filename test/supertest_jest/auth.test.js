import request from "supertest";
import app from "../../app.js"

let token
let postId

describe("Auth Test - Login", () => {
    it("Login - Success", async () => {
        const res = await request(app)
            .post("/login")
            .send({
                username: "admin",
                password: "admin123"
            })
        expect(res.statusCode).toBe(200)
        expect(res.body.token).toBeDefined()
    })

    it("Login - Field is empty", async () => {
        const res = await request(app)
            .post("/login")
            .send({
                username: "admin"
            })
        expect(res.statusCode).toBe(401)
    })
})

describe("Auth test - Manage Post", () => {
    beforeAll(async () => {
        const res = await request(app)
        .post("/login")
        .send({
            username: "admin",
            password: "admin123"
            })
        token = res.body.token
    })
    
    it("Posts - Success", async () => {
        const payload = {
            title: "judul post",
            content: "isi post",
            author: "penulis" 
        }
        const res = await request(app)
            .post("/posts")
            .set("Authorization", `Bearer ${token}`)
            .send(payload)

        expect(res.statusCode).toBe(201)
        
        postId = res.body.id
    })
    
    it("Posts - without token", async () => {
        const res = await request(app)
        .post("/posts")
        .send({
            title: "judul post",
            content: "isi post",
            author: "penulis" 
        })
        expect(res.statusCode).toBe(401)
    })
    
    it("Get Post by ID - success", async () => {
        const res = await request(app)
            .get(`/posts/${postId}`)

        expect(res.statusCode).toBe(200)
    })

    it("Update Post by ID - success", async () => {
        const payload = {
            title: "ganti judul"
        }
        const res = await request(app)
            .patch(`/posts/${postId}`)
            .set("Authorization", `Bearer ${token}`)
            .send(payload)
        
        expect(res.statusCode).toBe(200)
        expect(res.body.title).toBe(payload.title)
    })

    it("Delete Post by ID - success", async () => {
        const res = await request(app)
            .delete(`/posts/${postId}`)
            .set("Authorization", `Bearer ${token}`)

        expect(res.statusCode).toBe(200)
    })
})