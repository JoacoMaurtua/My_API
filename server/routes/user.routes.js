//Probar las consultas de los metodos definidos en los controladores

const express = require('express');

const router = express();

const {findUser} = require('../controllers/user.controllers');

router.get('/users',findUser); //http://localhost:8000/api/users

module.exports = router;