//Creamos nuestro esquema(campos)

const mongoose = require('mongoose');

const bcrypt = require('bcrypt'); //Biblioteca para hashear passwords

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

  password:{                         //NOTA: Virtual mongoose son campos que no queremos guardar en la db
    type: String,
    required:[true,'Password required!'],
    minlength:[8,'The password must be great than 8 characters']
    
  },


},{timestamps:true}) //timestamps es para saber la fecha y hora en la que se crea un nuevo user

//Comprueba que el password es igual al confirm password
UserSchema.virtual('confirmPassword') // --> SOLO PARA REGISTER
  .get(() => this._confirmPassword)
  .set( value => this._confirmPassword = value);

//Midleware para agregar otra validacion
UserSchema.pre('validate', function(next){
  if(this.password !== this.confirmPassword){
    this.invalidate('confirmPassword', 'Password must match confirm password')
  };
  next(); //ejecuta el siguiente midleware
});

//Proceso de hasheo(encriptacion)
UserSchema.pre('save', function(next){
  bcrypt.hash(this.password, 10)
      .then(hash=>{
        this.password = hash;
        next();
      });
});

//NOTA: pre se ejecuta antes de que se ejecute otro metodo en otros archivos

const User = mongoose.model('Users',UserSchema);

module.exports = User;


//NOTAS:

//Siempre _id nunca id