const express = require('express');

const secure = require('./secure');
const response = require('../../../network/response');
const controller = require('./index');
const router = express.Router();

router.post('/',secure('create'),createOrder);
router.get('/',secure('logged'),listOrders);
router.delete('/:id',secure('logged'),deleteOrder);

function createOrder(req,res){
  controller.create(req.body)
      .then ((isCreated)=>{
          if(isCreated){
              response.success(req,res,'order create',201)
          }else{
              response.success(req,res,'server error',401);
          }
      })
      .catch((err)=>{
        response.error(req,res,err.message,500)
      })
}

function listOrders(req,res){
  controller.list()
    .then((list)=>{
      response.success(req,res, list, 200);
    })
    .catch((err)=>{
      response.error(req,res,err.message,500)
    })
}

function deleteOrder(req,res){
  controller.remove(req.params.id)
      .then ((isDeleted)=>{
          if(isDeleted){
              response.success(req,res,'order delete',200)
          }else{
              response.success(req,res,'internal server error',500);
          }
      })
      .catch((err)=>{
        response.error(req,res,err.message,500)
      })
}

module.exports = router;