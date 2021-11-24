const auth = require('../../../auth');

module.exports = function checkAuth(action){
  function middelware(req,res,next){
    switch(action){
      case 'logged':
          const decode = auth.check.logged(req);
          console.log("DECODE MIDE", decode);
          req.body.id = decode.id;
          next();
          break;
      default:
        next();
    }
  }
  return middelware;
}