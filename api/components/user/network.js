const express = require('express');
const response = require('../../../network/response');
const controller = require('./index');

const router = express.Router();

router.get('/', listUser);
router.post('/',createUser);
router.delete('/:id',deleteUser);

function listUser (req,res){
  controller.list()
    .then((list)=>{
      response.success(req,res, list, 200);
    })
    .catch((err)=>{
      response.error(req,res,err.message,500)
    })
}

function createUser (req,res){
  controller.create(req.body)
    .then((token)=>{
      response.success(req,res,token,201)
    })
    .catch((err)=>{
      response.error(req,res,err.message,500)
    })
}

function deleteUser(req,res){
  controller.remote(req.params.id)
    .then ((isDeleted)=>{
      if(isDeleted){
          response.success(req,res,'user deleted',200);
      }else{
          response.success(req,res,'internal server error',500);
      }
    })
    .catch((err)=>{
      response.error(req,res,err.message,500)
    })
}

module.exports = router;