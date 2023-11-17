//Configuramos Express
//NOTA IMPORTANTE EL SERVIDOR ESTA CORRIENDO DESDE RENDER.COM
const cors = require('cors')
const express = require('express')

//Habilitando variables de entorno
require('dotenv').config()
const {dbConnection} = require('./database/config')


//Crear el servidor de express
const app = express()

//Aplicando el cors (capa de seguridad leve)
app.use(cors())

//coneccion Base de datos
dbConnection()


//Driectiorio Público
app.use( express.static('public') );

//lectura y Parseo del Body
app.use( express.json())

//Rutas
app.use('/api/auth', require('./routes/auth'))
app.use('/api/events', require('./routes/calendarEvents'))

//Comodin para corregir error en 'Cannot get route auth/login'
app.get('*', (req, res) => {
    res.sendFile( __dirname + '/public/index.html' )

})


//TODO: CRUD: Eventos (delete, put, get, post, etc...)

// app.get('/', (req, resp) => {
//     resp.json({
//         'ok' : 'true'
//     })
// })

//Escuchár Peticiones!
app.listen( process.env.PORT, () => {
    console.log(`Servidor corriendo desde el puerto ${ process.env.PORT }`)
})
