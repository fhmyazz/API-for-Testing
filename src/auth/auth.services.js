import { findUser, createUser } from "./auth.db.js"
import { tokenGenerator } from "./token.js"

export function login(username, password){
    console.log("LOGIN USER: ", username, password)

    if (!username || !password) throw new Error("Username dan Password harus diisi")

    let user = findUser(username, password)
    console.log("FIND USER: ", user)

    if (!user){ 
        user = createUser(username, password)
        console.log("CREATE USER: ", username, password)
    }

    const token = tokenGenerator(user.id)
    console.log("TOKEN GENERATOR: ", token)

    return {
        token,
        user: {
            id: user.id,
            username: user.username
        }
    }
}