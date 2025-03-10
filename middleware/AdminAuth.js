import jwt from 'jsonwebtoken';
import dotenv from "dotenv"
dotenv.config()

const AdminToken = (req,res,next)=>{
    const authHeader = req.headers["authorization"]

    if(!authHeader || !authHeader.startsWith('Bearer')){
        return res.status(403).send({error:"no token provided"})
    }

    const token = authHeader.split(' ')[1]

    jwt.verify(token, process.env.Admin_Access_Token_Secret,(err,decoded)=> {
        if(err){
            return res.status(401).json({error:"unauthorised"})
        }
        req.email = decoded.email
        next()
    })
}

export default AdminToken;