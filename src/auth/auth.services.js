import { findUser, createUser, findUserByUsername } from "./auth.db.js"
import { tokenGenerator } from "./token.js"

export function login(username, password){
    if (!username || !password) {
        throw new Error("Username and Password can't be empty")
    }

    let user = findUser(username, password)
    if (!user){ 
        throw new Error("User not found")
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

export function register(username, password){
    if(!username || !password) {
        throw new Error("Username and Password can't be empty")
    }

    if(password.length < 6){
        throw new Error("Password must be at least 6 characters")
    }

    const existingUser = findUserByUsername(username)
    if(existingUser){
        throw new Error("Username already exists")
    }

    const user = createUser(username, password)
    const token = tokenGenerator(user.id)
    
    return {
        token,
        user: {
            id: user.id,
            username: user.username
        }
    }
}