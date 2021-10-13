//MIddleware para almacenar el secreto del JWT 

const jwt = require('jsonwebtoken');

//firma digital o secret:
const secret = 'This is my fucking secret homie';

//Login necesita esta funcion
const authenticate =(req,res,next)=>{
  jwt.verify(req.cookies.usertoken, secret, (err,payload)=>{ //acceder al token mediante la cookie
    if(err){
      res.status(401).json({verified:false}) //devolver un error HTTP y respues en json
    }else{
      next();
    }
  }); 
}

