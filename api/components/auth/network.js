const express = require('express');


const response = require('../../../network/response');
const controller = require('./index');

const router = express.Router();

router.post('/', loginUser);
router.delete('/', logoutUser);

function loginUser(req,res,next){
  controller.login(req.body.email, req.body.password)
    .then(token=>{
      req.session.email = req.body.email;
      response.success(req,res,token,200);
    })
    .catch(next);
}

function logoutUser(req,res,next){
  controller.logout(req)
    .then((isLogout)=>{
      if(isLogout){
        req.session.destroy();
        response.success(req,res,'',200);
      }else{
        response.success(req,res,'400',401);
      }
    })
    .catch(next);
}

module.exports = router;