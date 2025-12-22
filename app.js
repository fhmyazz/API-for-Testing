import express from "express"
import { loginController } from "./src/controllers/auth.controllers.js"
import {
    createPostController,
    getPostsController,
    getPostController,
    updatePostController,
    deletePostController
} from "./src/controllers/posts.controllers.js"

const app = express()
app.use(express.json())

app.post("/login", loginController)

app.post("/posts", createPostController)
app.get("/posts/", getPostsController)
app.get("/posts/:id", getPostController)
app.patch("/posts/:id", updatePostController)
app.delete("/posts/:id", deletePostController)

app.listen(3000, () => {
    console.log("API is running on http://localhost:3000")
})