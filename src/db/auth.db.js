const tokenGenerator = (length) => {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
    let result = ""

    for (let i = 0; i < length; i ++){
        result += characters.charAt(Math.floor(Math.random() * characters.length))
    }
    return result
}
const users = [
    { "id": `id-${tokenGenerator(5)}`, "username": "admin", "password": "admin123"}
]


// const tokens = new Map()

export function createUser(username, password){
    const user = { id: `id-${tokenGenerator(5)}`, username, password}
    users.push(user)
    return user
}

export function findUser(username, password){
    return users.find(
        u => u.username === username && u.password === password
    )
}