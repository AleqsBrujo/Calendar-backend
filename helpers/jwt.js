const jwt =  require('jsonwebtoken')

const generateJWT = (uid, name) => {

    return new Promise( (resolve, reject) => {
        const payload = {uid, name}
        jwt.sign(payload, process.env.SECRET_KEY_JWT, {
            expiresIn: '2d'
        }, (err, token) => {

            if(err){
                console.log(err)
                reject('No se pudo generar el token, contactar a soporte')
            }

            resolve(token)
        })


    })
    
    
}


module.exports = {
    generateJWT,
}