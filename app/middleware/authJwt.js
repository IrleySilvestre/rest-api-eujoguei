const jwt = require('jsonwebtoken')
const config = require('../config/auth.config')

const {JsonWebTokenError} = jwt

const catchErro = (err, res)=>{
    if (err instanceof JsonWebTokenError) {
        return res.status(401).send({message: "Unauthorized!!, Access Token was expired!" })
    }
    return res.status(401).send ({message: "Unauthorized!"})
}

const verifyToken = (req, res, next)=>{
    let token = req.headers['x-access-token']
    if(!token){
        return res.status(403).send({nessage:"No token providede!"})
    }
    jwt.verifyToken(token, config.secret, (err, decoded)=>{
        if(err){
            return catchErro(err, res)
        }
        req.userId = decoded.id
        next()
    })
}