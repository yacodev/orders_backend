const express = require('express');

const secure = require('./secure');
const response = require('../../../network/response');
const controller = require('./index');
const router = express.Router();

router.post('/',secure('create'),createOrder);
router.get('/',secure('logged'),listOrders);
router.delete('/:id',secure('logged'),deleteOrder);

function createOrder(req,res,next){
  controller.create(req)
      .then ((isCreated)=>{
          if(isCreated){
              response.success(req,res,'order create',201)
          }else{
              response.success(req,res,'server error',500);
          }
      })
      .catch(next);
}

function listOrders(req,res,next){
  controller.list(req)
    .then((list)=>{
      response.success(req,res, list, 200);
    })
    .catch(next);
}

function deleteOrder(req,res,next){
  controller.remove(req)
      .then ((isDeleted)=>{
          if(isDeleted){
              response.success(req,res,'order delete',200)
          }else{
              response.success(req,res,'internal server error',500);
          }
      })
      .catch(next);
}

module.exports = router;