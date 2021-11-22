const jwt = require('jsonwebtoken');
const config = require('../config');

const secret = config.jwt.secret;

function sign(data){
  return jwt.sign(data,secret)
}

function verify(token){
  return jwt.verify(token,secret)
}

const check = {
  own: function(req,owner){
    const decoded = decodeHeader(req);
    if(decoded.id !== owner){
      //throw error('No puedes editar',401);
      throw new Error('No puedes editar');
    }
  },
  logged: function(req){
    const decode = decodeHeader(req);
    if(!decode.id){
      throw new Error('No puedes editar');
    }
  }
}

function getToken(auth){
  if (!auth){
    //throw error('No viene token',401);
    throw new Error('No viene token');
  }
  if(auth.indexOf('Bearer ')===-1){
    //throw error('Formato invalido',401);
    throw new Error('Formato invalido');
  }
  let token = auth.replace('Bearer ','');
  return token
}

function decodeHeader(req){
  const authorization = req.headers.authorization || '';
  const token = getToken(authorization);
  const decoded = verify(token);
  return decoded;
}

module.exports = {
  sign,
  check,
}