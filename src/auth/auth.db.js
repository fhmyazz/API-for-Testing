const users = [
    { "id": 1, "username": "admin", "password": "admin123"}
]

let userId = 2
export function createUser(username, password){
    const user = { id: userId++, username, password}
    users.push(user)
    return user
}

export function findUser(username, password){
    return users.find(
        u => u.username === username && u.password === password
    )
}

export function findUserByUsername(username){
    return users.find(
        u => u.username === username
    )
}