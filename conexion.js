const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://DoraPulido:doris33@cluster0.ptlappd.mongodb.net/?retryWrites=true&w=majority');


const objetobd = mongoose.connection

objetobd.on('connected', ()=>{
    console.log('conexion correcta a MongoDB')
})

objetobd.on('error', ()=>{
    console.log('Error conexion a MongoDB')
})

module.exports = mongoose