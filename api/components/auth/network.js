const express = require('express');


const response = require('../../../network/response');
const controller = require('./index');

const router = express.Router();

router.post('/', loginUser);
router.delete('/', logoutUser);

function loginUser(req,res){
  controller.login(req.body.email, req.body.password)
    .then(token=>{
      req.session.email = req.body.email;
      response.success(req,res,token,200);
    })
    .catch((err)=>{
      response.error(req,res,err.message,400)
    })
}

function logoutUser(req,res){
  controller.logout(req)
    .then((isLogout)=>{
      if(isLogout){
        req.session.destroy();
        response.success(req,res,'',200);
      }else{
        response.success(req,res,'internal server error',500);
      }
    })
    .catch((err)=>{
      response.error(req,res,err.message,400)
    })
}

module.exports = router;