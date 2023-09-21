const { response } = require('express')
const jwt = require('jsonwebtoken')

const JWTvalidator = ( req, resp = response, next) => {

    //Recibiremos x-token por el header
    const token = req.header('x-token')
    if(!token){
        return resp.status(401).json({
            ok: false,
            msg: 'No hay token en la petición'
        })
    }

    try {
      const {uid, name} = jwt.verify(token, process.env.SECRET_KEY_JWT)
      
      req.uid = uid
      req.name = name


    } catch (error) {
        resp.status(401).json({
            ok: false,
            msg: 'Token invalido'
        })
        
    }

    next()

}

module.exports = {
    JWTvalidator
}