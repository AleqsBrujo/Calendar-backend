
const {response} = require('express')
const bcrypt = require('bcryptjs')
const Users = require('../models/Users')
const { generateJWT } = require('../helpers/jwt')


const createUser = async (req, resp = response) => {
   
    const { email, password} = req.body
    
    try {
        const userExist = await Users.findOne({email})
        if(userExist){
            return resp.status(400).json({
                ok: false,
                msg: 'El email ya ha sido registrado, recupera tú contraseña'
            })
        } 

        const user = new Users(req.body)
        
        //Encriptar password
        const salt = bcrypt.genSaltSync()
        user.password = bcrypt.hashSync( password, salt)
    
        await user.save()

        //Generar JWT
        const token = await generateJWT(user.id, user.name)
       
        resp.status(201).json({
           ok: true,
           uid: user.id,
           name: user.name,
           token            
        })
        
    } catch (error) {
        console.log(error)
        resp.status(500).json({
            ok: false,
            msg: 'Error interno, favor de contactar a soporte'
        })
        
    }
}
   

    

const userLogin = async (req, resp = response) => {
    const { email,  password} = req.body

    try {
        const existEmail = await Users.findOne({email})
        
        if(!existEmail){
            return resp.status(400).json({
                ok: false,
                msg: 'El email ingresado no ha sido registrado, revise los campos ingresados'
            })
        }
        
        //Confirmas password hasheados
        const validPassword = bcrypt.compareSync( password, existEmail.password  )
        if(!validPassword){
            return resp.status(400).json({
                ok: false,
                msg: 'Contraseña incorrecta, revise los campos o recupera tú contraseña'
            })
        }

        //Generar JWT
        const token = await generateJWT( existEmail.id, existEmail.name)

        resp.json({
            ok: true,
            uid: existEmail.id,
            name: existEmail.name,
            token
        })
        
        } catch (error) {
            console.log(error)
            resp.status(500).json({
                ok: false,
                msg: 'Error interno, favor de contactar a soporte'
            })
        }  
   

}


const renewToken = async (req, resp = response) => {
    const {uid, name} = req

    const token = await generateJWT(uid, name)

    resp.json({
        ok: true,
        token
    })
}


module.exports = {
    createUser,
    userLogin,
    renewToken
    
}

