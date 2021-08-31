// Conectar mongodb con mongoose

const mongoose = require('mongoose');

const dataBase = 'mongodb://localhost/users';

const connectDB = async() =>{
  try{
    await mongoose.connect(dataBase,{
      //midlewares para subir info a la base de datos
      useNewUrlParser:true,         
      useUnifiedTopology:true 
    });
    console.log(`2: established connection to the db`)

  }catch(error){
    console.log(error);
  }
};

module.exports = connectDB;