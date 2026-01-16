const tokens = new Set()

export const tokenGenerator = (userId) => {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
    let result = `token-${userId}`

    for (let i = 0; i < 5; i ++){
        result += characters.charAt(Math.floor(Math.random() * characters.length))
    }
    return result
}

export function verifyToken(token){
    if(!token) return null
    if(!token.startsWith("token-")) return null

    return tokens.has(token)
}