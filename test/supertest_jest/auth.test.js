import request from "supertest";
import app from "../../app.js"

let token
let postId
let invalidToken

describe("Auth Test - Negative", () => {
    beforeAll(async() => {
        const payload = {
            username: "admin",
            password: "admin123"
        }
        const res = await request(app)
            .post("/login")
            .send(payload)
        invalidToken = `${res.body.token}_abc`
    })

    it("Login - Field is empty", async () => {
        const res = await request(app)
            .post("/login")
            .send({
                username: "admin"
            })
        expect(res.statusCode).toBe(400)
        expect(res.body.message).toMatch(/harus diisi/i)
    })

    it("Posts - without token", async () => {
        const payload = {
            title: "judul post",
            content: "isi post",
            author: "penulis" 
        }
        const res = await request(app)
            .post("/posts")
            .send(payload)
        expect(res.statusCode).toBe(401)
        expect(res.body.message).toMatch(/Authorization|token/i)
    })

    it("Posts - invalid token", async () => {
        const payload = {
            title: "judul post",
            content: "isi post",
            author: "penulis" 
        }
        const res = await request(app)
            .post("/posts")
            .set("Authorization", `Bearer ${invalidToken}`)
            .send(payload)
        
        expect(res.statusCode).toBe(401)
    })
})

describe("Auth test - Positive", () => {
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
        expect(res.body.content).toBe(payload.content)
        
        postId = res.body.id
    })
    
    
    it("Get Post by ID - success", async () => {
        const res = await request(app)
            .get(`/posts/${postId}`)
            .set("Authorization", `Bearer ${token}`)

        expect(res.statusCode).toBe(200)
        expect(res.body.id).toBe(postId)
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