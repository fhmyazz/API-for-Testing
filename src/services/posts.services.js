import * as db from "../db/posts.db.js"

export class PostService{
    static create(data){
        if (!data.title) throw new Error("Title wajib diisi")
        if (!data.content) throw new Error("Content wajib diisi")
        if (!data.author) throw new Error("Author wajib diisi")

        return db.createPost(data)
    }

    static getAll(){
        return db.getAllPosts()
    }

    static getOne(id){
        const post = db.getPostById(id)
        if (!post) throw new Error("Post tidak ditemukan")
        
        return post
    }

    static update(id, data){
        const post = db.updatePost(id, data)
        if (!post) throw new Error("Post tidak ditemukan")
        
        return post
    }

    static delete(id){
        const post = db.deletePost(id)
        if (!post) throw new Error("Post tidak ditemukan")

        return { message: "Post berhasil dihapus"}
    }
}