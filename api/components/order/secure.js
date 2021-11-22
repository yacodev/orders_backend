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
          auth.check.logged(req);
          next();
          break;
      default:
        next();
    }
  }
  return middelware;
}