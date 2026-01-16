import express from "express"
import { loginController } from "./src/auth/auth.controllers.js"
import {
    createPostController,
    getPostsController,
    getPostController,
    updatePostController,
    deletePostController
} from "./src/controllers/posts.controllers.js"
import { authMiddleware } from "./src/auth/auth.middleware.js"

const app = express()
app.use(express.json())

app.post("/login", loginController)

app.get("/posts/", getPostsController)
app.get("/posts/:id", getPostController)
app.post("/posts", authMiddleware, createPostController)
app.patch("/posts/:id", authMiddleware, updatePostController)
app.delete("/posts/:id", authMiddleware, deletePostController)

export default app