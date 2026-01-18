import { findUser, createUser } from "./auth.db.js"
import { tokenGenerator } from "./token.js"

export function login(username, password){
    if (!username || !password) throw new Error("Username dan Password harus diisi")

    let user = findUser(username, password)
    if (!user){ 
        user = createUser(username, password)
    }

    const token = tokenGenerator(user.id)
    return {
        token,
        user: {
            id: user.id,
            username: user.username
        }
    }
}