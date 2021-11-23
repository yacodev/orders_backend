const response = require('./response');

function error (err,req,res,next){
  const message = err.message|| 'error internal';
  const status = err.statuscode || 500;

  response.error(req,res,message,status);
}

module.exports = error;