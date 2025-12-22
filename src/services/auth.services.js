import {
    findUser
} from "../db/auth.db.js"

export function login(username, password){
    if (!username || !password) throw new Error("Username dan Password harus diisi")

    const user = findUser(username, password)
    if (!user) throw new Error("User tidak ditemukan")

    return {
        userId: user.id,
        token: `dummy-token-${user.id}`,
        username: user.username
    }
}

// const activeToken = new Map()

// export function register(username, password){
//     if (!username || !password) throw new Error("Username dan Password tidak boleh kosong")

//     return createUser(username, password)
// }

// export function login(username, password){
//     const user = findUser(username, password)
//     if (!user) throw new Error("Invalid Credentials")

//     const token = `token-${user.id}`
//     activeToken.set(token, user.id)

//     return activeToken.get(token)
// }