const auth = require('../../../auth');

module.exports = function checkAuth(action){
  function middelware(req,res,next){
    if (action === 'logged'){
      const decode = auth.check.logged(req);
      req.body.id = decode.id;
      next();}
    else{
        next();
      }
  }
  return middelware;
}