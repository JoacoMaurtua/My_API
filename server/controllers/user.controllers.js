//UTILIZAR LOS SHEMAS PARA HACER LAS FUNCIONALIDADES DEL CRUD

const User = require('../models/user.models'); //importando Users

//Devolver todos los usuarios de la bd
const findUser = (req, res) => {
    User.find({})
        .then(result => res.json({data:result})) //trae un arreglo de objetos
        .catch(error => {
            res.json({error: error, message: "Users not founded"});
            res.sendStatus(404); //error http
        })
}

//Crear un nuevo usuario
const createUser = (req,res) =>{
    User.create(req.body) //objeto que encapsula todas las propiedades de la entidad -> {key:value}
        .then(result => res.json({data:result})) //result se carga con el objeto que se esta creando
        .catch(error => {
            res.json({error: error, message: "Could not create user"});
            res.sendStatus(500); //error http
        })
}

module.exports = {findUser,createUser}; //exportar todas las funcionalidades

