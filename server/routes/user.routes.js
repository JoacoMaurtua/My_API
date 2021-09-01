//Probar las consultas de los metodos definidos en los controladores

const express = require('express');

const router = express();

const {findUser,createUser} = require('../controllers/user.controllers');

//ruta para obtener el listado de usuarios
router.get('/users',findUser); //http://localhost:8000/api/users

//ruta para crear un usuario
router.post('/users/new',createUser)

module.exports = router;