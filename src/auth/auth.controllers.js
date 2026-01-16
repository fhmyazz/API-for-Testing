import { login } from "./auth.services.js"

export function loginController(req, res){
    console.log("REQ BODY: ", req.body)
    
    try{
        const { username, password } = req.body
        const result = login(username, password)

        return res.status(200).json(result)
    } catch( err ){
        return res.status(401).json({
            message: err.message
        })
    }
}