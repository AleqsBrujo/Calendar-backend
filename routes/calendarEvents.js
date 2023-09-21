
const { Router } = require('express')
const { check } = require('express-validator')
const {isDate} = require('../helpers/isDate')
const { fieldValidator } = require('../middlewares/field-validators')
const {JWTvalidator} = require('../middlewares/JWT-validator')
const {createEvent, deleteEvent, getEvents, updateEvent} = require('../controllers/calendarEvents')

const router = Router()

//Aplicando el midelware de JWTvalidator para todas las rutas 
router.use(JWTvalidator)

//Rutas (Ya protegidas por el JWTValidator)...

router.get('/', getEvents)

router.post('/',
    [
      check('title', 'El titulo es Obligatorio').not().isEmpty(),
      check('start', 'Fecha de inicio es obligatoria').custom( isDate ),
      check('end', 'Fecha de termino es obligatoria').custom( isDate ),
      fieldValidator
    ], createEvent)

router.put('/:id', [check('title', 'El titulo es Obligatorio').not().isEmpty(),
                    check('start', 'Fecha de inicio es obligatoria').custom( isDate ),
                    check('end', 'Fecha de termino es obligatoria').custom( isDate ),
                     fieldValidator], updateEvent)

router.delete('/:id', deleteEvent)

module.exports = router