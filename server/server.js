/* require('dotenv').config(); */ //Nos permite llamar a todas las variables del .env

const express = require('express');

const app = express(); //Accede a la funcionalidad de express

const PORT = 8000;

//Para la conexion con la base de datos:
const connectDB = require('./config/mongoDB.config');
connectDB();

//MIDLEWARES PARA PODER HACER CONSULTAS POST
app.use(express.json());
app.use(express.urlencoded({extended:true}));


//RUTAS
app.use('/api',require('./routes/user.routes')); // El inicio de la ruta



app.listen(PORT,()=>{ // Saber que el servidor express se esta ejecutando en el puerto
  console.log(`1 : server loading on port: ${PORT}`)
});