//Creamos nuestro esquema(campos)

const mongoose = require('mongoose');

//Creamos nuestro esquema

const UserSchema = new mongoose.Schema({
  nickName:{
    type: String,
    required:[true,'Nick Name required!']
  },

  fullName:{
    type: String,
    required:[true,'Full Name required!']
  },

  email:{
    type: String,
    required:[true,'Email required!'],
    validate:{
      validator:val => /^([\w-.]+@([\w-]+.)+[\w-]+)?$/.test(val), //formato correcto del correo --> https://regexr.com/95714
      message:'Please type a correct format for the email!'
    }
  },

  password:{
    type: String,
    required:[true,'Password required!'],
    minlength:[8,'The password must be great than 8 characters']
  },

},{timestamps:true}) //timestamps es para saber la fecha y hora en la que se crea un nuevo user

const User = mongoose.model('Users',UserSchema);

module.exports = User;


//NOTAS:

//Siempre _id nunca id