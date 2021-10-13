//UTILIZAR LOS SHEMAS PARA HACER LAS FUNCIONALIDADES DEL CRUD

const User = require('../models/user.models'); //importando Users

const bcrypt = require('bcrypt') //hashear las passwords

const jwt = require('jsonwebtoken');

const {secret} = require('../config/JWT.config');

//Devolver todos los usuarios de la bd
const findUser = (req, res) => {
    User.find({})
        .then(result => res.json({data:result})) //trae un arreglo de objetos
        .catch(error => {
            res.json({error: error, message: "Users not founded"});
            res.sendStatus(404); //error http
        })
}

//Devolver un solo usuario en la bd
const findSingleUser = (req,res) => {
    User.findOne({email:req.params.email})
        .then(result => res.json({data:result}))
        .catch(error=>{
            res.json({error: error,message:"User not found"});
            res.sendStatus(404);
        })
}

//Crear un nuevo usuario
const createUser = (req,res) =>{ //Register
    User.create(req.body) //objeto que encapsula todas las propiedades de la entidad -> {key:value}
        .then(result => res.json({data:result})) //result se carga con el objeto que se esta creando
        .catch(error => {
            res.json({error: error, message: "Could not create user"});
            res.sendStatus(500); //error http
        })
}


//Acualizando un usuario
const updateUser = (req,res) =>{
    User.findOneAndUpdate({_id:req.params.id}, req.body, {new:true})       //1r arg-> hacer el match, 1do arg->objeto nuevo, 3r arg -> sobrescribe el objeto anterior
    .then(result => res.json({data:result})) //result se carga con el objeto que se esta creando
    .catch(error => {
        res.json({error: error, message: "Could not update user"});
        res.sendStatus(500); //error http
    })
}

//Eliminar un usuario
const deleteUser = (req,res) =>{
    User.deleteOne({_id:req.params.id})
    .then(result => res.json({data:result})) //result se carga con el objeto que se esta creando
    .catch(error => {
        res.json({error: error, message: "Could not delete user"});
        res.sendStatus(202); //error http
    })
};

//Login
const login = (req,res) =>{
    User.findOne({email:req.body.email})//correo que escribe el usuario
        .then(result => {
            if(result === null){ //no esta el objeto registrado en la db
                res.json({error:true, msg:"Invalid login attemp"});
            }
            else{ //lo referente a la contraseña
                bcrypt.compare(req.body.password, result.password) //comparamos el password ingresado con el password almacenado en la db
                    .then(passwordIsValid =>{
                        //Si el password coincide con el de la db(hasheado)
                        if(passwordIsValid){
                            const payload = { //palabra estandarizada
                                _id:result._id,
                                nickName:result.nickName,
                                fullName:result.fullName,
                                email:result.email
                            }
                            const jsonWebToken = jwt.sign(payload,secret) //convertirlo a una cookie
                            res.cookie('usertoken', jsonWebToken, secret, {httpOnly:true}).json({
                                message: 'Success',
                                data: payload
                            })
                        }else{
                            res.json({error:true, msg:'Invalid passwords'});
                        }
                    })
                    .catch(err => res.json({error:err, msg:"Invalid login attemp"}));
            }
        })
        .catch(err => res.json({error:err, msg:"Invalid login attemp"}))
}




module.exports = {findUser,findSingleUser,createUser,updateUser,deleteUser,login}; //exportar todas las funcionalidades

