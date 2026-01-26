import { login, register } from "./auth.services.js"

export function loginController(req, res){
    try{
        console.log('REQ BODY: ', req.body)
        const { username, password } = req.body
        
        if(!username || !password){
            return res.status(400).json({
                success: false,
                error: "Username and Password can't be empty"
            })
        }
        const result = login(username, password)
        
        return res.status(200).json({
            success: true,
            data: result
        })
    } catch( err ){
        return res.status(401).json({
            success: false,
            error: err.message
        })
    }
}

export function registerController(req, res){
    try{
        const { username, password } = req.body

        if(!username || !password){
            return res.status(400).json({
                success: false,
                error: "Username and Password can't be empty"
            })
        }

        const result = register(username, password)

        return res.status(201).json({
            success: true,
            data: result
        })
    } catch(err) {
        return res.status(400).json({
            success: false,
            error: err.message
        })
    }
}