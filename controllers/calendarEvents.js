const { response } = require('express')
const Events = require('../models/CalendarEvents')


const getEvents = async(req, res = response) => {
    
    const existEvent = await Events.find()
                                   .populate('user', 'name')

    res.json({
        ok: true,
        existEvent,
        
    })

}

const createEvent = async(req, res = response) => {

    const event =  new Events( req.body)
    console.log(req)

    try {
        event.user = req.uid
        await event.save()
        console.log('Evento creado correctamente')
        res.json({
            ok: true,
            event
        })
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'No se pudro crear el evento, contacte a soporte.'
        })
    }   
   
}
 

const updateEvent = async(req, res = response) => {
    const eventId = req.params.id
    
    try {
        const event = await Events.findById( eventId )
        console.log(event)

        if(!event) {
            return res.status(404).json({
                ok: false,
                msg: 'Evento no existe por ese ID'
            })
        }
        if( event.user.toString() !== req.uid){
            return res.status(401).json({
                ok: false,
                msg: 'No tienes los permisos para editar este evento'
            })
        }

        const newEvent = {
            ...req.body,
            user: req.uid
        }

        const updatedEvent = await Events.findByIdAndUpdate( eventId, newEvent, {new: true})
        res.json({
            ok: true,
            event: updatedEvent
        })

    } catch (error) {
        console.log(error)
        res.json({
            ok: false,
            msg: 'Hubo un error, contacte a soporte'
        })
    }
}

 
const deleteEvent = async(req, res = response) => {
    const eventId = req.params.id
    
    try {
        const event = await Events.findById( eventId )
        

        if(!event) {
            return res.status(404).json({
                ok: false,
                msg: 'Evento no existe por ese ID'
            })
        }
        if( event.user.toString() !== req.uid){
            return res.status(401).json({
                ok: false,
                msg: 'No tienes los permisos para eliminar este evento'
            })
        }

       

         await Events.findByIdAndDelete(eventId)
        res.json({
            ok: true,
            msg: 'Evento Eliminado con Exito'
        })

    } catch (error) {
        console.log(error)
        res.json({
            ok: false,
            msg: 'Hubo un error, contacte a soporte'
        })
    }
}

module.exports = {
    getEvents,
    createEvent,
    updateEvent,
    deleteEvent
}