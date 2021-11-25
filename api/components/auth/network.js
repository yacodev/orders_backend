const express = require('express');

const secure = require('./secure');
const response = require('../../../network/response');
const controller = require('./index');

const router = express.Router();

router.post('/', loginUser);
router.delete('/',secure('logged'), logoutUser);

function loginUser(req,res,next){
  controller.login(req.body.email, req.body.password)
    .then((data)=>{
      req.session.email = req.body.email;
      response.success(req,res,data,200);
    })
    .catch(next);
}

function logoutUser(req,res,next){
  controller.logout()
    .then((isLogout)=>{
      if(isLogout){
        req.session.destroy();
        response.success(req,res,'',200);
      }else{
        response.success(req,res,'Internal error',500);
      }
    })
    .catch(next);
}

module.exports = router;