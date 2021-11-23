const auth = require('../../../auth');

module.exports = function checkAuth(action){
  function middelware(req,res,next){
    switch(action){
      case 'create':
        const owner = req.body.user_id;
        auth.check.own(req,owner);
        next();
        break;
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