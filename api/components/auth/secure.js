const auth = require('../../../auth');

module.exports = function checkAuth(action){
  function middelware(req,res,next){
    if(action === 'logged'){
      auth.check.logged(req);
      next();}
      else{
        next();
      }
  }
  return middelware;
}