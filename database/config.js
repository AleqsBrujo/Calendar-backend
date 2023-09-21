const mongoose = require('mongoose')

const dbConnection = async() => {
    try {
       await mongoose.connect( process.env.DB_CNN);

       console.log('Conectado correctamente a la DB')

    } catch (error) {

        console.log(error)
        throw new Error('No se pudo conectar a la DB')
    }
}

module.exports = {
    dbConnection
}