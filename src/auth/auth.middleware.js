import { verifyToken } from "./token.js";

export function authMiddleware(req, res, next){
    const authHeader = req.headers["authorization"]

    if(!authHeader){
        return res.status(401).json({
            message: "Authorization header is missing"
        })
    }

    const token = authHeader.replace("Bearer ", "")
    console.log("EXTRACTED TOKEN: ", token)

    const isValid = verifyToken(token)
    console.log("VERIFY RESULT: ", isValid)

    if(!isValid){
        return res.status(401).json({
            message: "Invalid Token"
        })
    }

    next()
}