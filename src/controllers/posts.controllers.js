import { PostService } from "../services/posts.services.js";

export function createPostController(req, res){
    try{
        const post = PostService.create(req.body)
        res.status(201).json(post)
    } catch (err){
        res.status(404).json({ message: err.message })
    }
}

// express selalu memanggil (req, res) walaupun tidak dieksekusi
export function getPostsController(req, res){
    res.status(200).json(PostService.getAll())
}

export function getPostController(req, res){
    try {
        const post = PostService.getOne(req.params.id)
        res.status(200).json(post)
    } catch (err) {
        res.status(404).json({ message: err.message})
    }
}

export function updatePostController(req, res){
    try{
        const post = PostService.update(req.params.id, req.body)
        res.status(200).json(post)
    }catch(err){
        res.status(404).json({ message: err.message})
    }
}

export function deletePostController(req, res){
    try{
        const post = PostService.delete(req.params.id)
        res.status(200).json(post)
    }catch(err){
        res.status(404).json({ message: err.message })
    }
}