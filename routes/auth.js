/* 
    Rutas de Usuarios / Auth
    Host + /api/auth
*/

const { Router } = require('express');
const { check} = require('express-validator')
const { fieldValidator} = require('../middlewares/field-validators')
const { createUser, userLogin, renewToken } = require('../controllers/auth');
const { JWTvalidator} = require('../middlewares/JWT-validator')
const router = Router()

router.post('/createUser', [
    check('name', 'El nombre es obligatorio!').not().isEmpty(),
    check('email', 'El email es obligatorio!').isEmail(),
    check('password', 'El password debe tener al menos 6 caracterés!').isLength({min: 6}),
    fieldValidator
   
], createUser)


router.post('/', [
    check('email', 'El Email es Obligatorio!').isEmail(),
    check('password', 'El password es Obligatorio').isLength({min: 6}),
    fieldValidator
], userLogin)


router.get('/renew', JWTvalidator, renewToken)




module.exports = router;