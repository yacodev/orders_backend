const jwt = require('jsonwebtoken');
const config = require('../config');
const error =require('../utils/error');

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
      throw error('You are not authorized',401);
    }
  },
  logged: function(req){
    const decode = decodeHeader(req);
    if(!decode.id){
      throw error('You are not authorized',401);
    }
    return decode;
  }
}

function getToken(auth){
  if (!auth){
    throw error('You are not authorized',401);
  }
  if(auth.indexOf('Bearer ')===-1){
    throw error('Format invalided',400);
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