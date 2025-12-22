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