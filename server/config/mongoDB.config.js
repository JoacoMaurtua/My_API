// Conectar mongodb con mongoose

const mongoose = require('mongoose');

const dataBase = 'mongodb://localhost/users';


const connectDB = async() =>{
  try{
    await mongoose.connect(dataBase,{
      //midlewares para subir informacion a la bd:
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('2: Connection established whit the db');

  }catch(error){
    console.log(error);
  }
};

module.exports = connectDB;