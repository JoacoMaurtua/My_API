//UTILIZAR LOS SHEMAS PARA HACER LAS FUNCIONALIDADES DEL CRUD

const User = require('../models/user.models'); //importando Users

const findUser = (req, res) => {
    User.find({})
        .then(result => res.json({data:result})) //trae un arreglo de objetos
        .catch(error => {
            res.json({error: error, message: "Users not founded"});
            res.sendStatus(404); //error http
        })
}

module.exports = {findUser}; //exportar todas las funcionalidades

