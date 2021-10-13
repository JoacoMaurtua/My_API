//Probar las consultas de los metodos definidos en los controladores

const express = require('express');

const router = express();

const {authenticate} = require('../config/JWT.config'); //Lo mas importante

const {findUser,createUser, findSingleUser, updateUser, deleteUser, login} = require('../controllers/user.controllers');

//ruta para obtener el listado de usuarios
router.get('/users',findUser,authenticate); //http://localhost:8000/api/users

//ruta para encontrar un solo usuario 
router.get('/user/:email',findSingleUser,authenticate); //:(el atributo)

//ruta para crear un usuario
router.post('/users/new',createUser)

//ruta para actualizar un usuario
router.put('/users/update/:id',updateUser,authenticate)

//ruta para eliminar un usuario
router.delete('/users/delete/:id',deleteUser,authenticate)

//ruta para loguear:
router.post('/users/login',login)

module.exports = router;