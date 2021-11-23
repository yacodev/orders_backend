const express = require('express');
const response = require('../../../network/response');
const controller = require('./index');

const router = express.Router();

router.get('/', listUser);
router.post('/',createUser);
router.delete('/:id',deleteUser);

function listUser (req,res,next){
  controller.list(req)
    .then((list)=>{
      response.success(req,res, list, 200);
    })
    .catch(next);
}

function createUser (req,res,next){
  controller.create(req)
    .then((token)=>{
      response.success(req,res,token,201)
    })
    .catch(next);
}

function deleteUser(req,res,next){
  controller.remove(req)
    .then ((isDeleted)=>{
      if(isDeleted){
          response.success(req,res,'user deleted',200);
      }else{
          response.success(req,res,'internal server error',500);
      }
    })
    .catch(next);
}

module.exports = router;