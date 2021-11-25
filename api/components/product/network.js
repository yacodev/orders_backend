const express = require('express');

const secure = require('./secure');
const controller = require('./index');
const response = require('../../../network/response');
const router = express.Router();

router.post('/',createProduct);
router.get('/',secure('logged'),listProducts);
router.get('/:id',showProduct);
router.delete('/:id',deleteProduct);


function createProduct(req,res,next){
  controller.create(req)
      .then ((isCreated)=>{
          if(isCreated){
              response.success(req,res,'product create',201)
          }else{
              response.success(req,res,'server error',401);
          }
      })
      .catch(next);
}

function listProducts(req,res,next){
  controller.list()
    .then((list)=>{
      response.success(req,res, list, 200);
    })
    .catch(next);
}

function showProduct(req,res,next){
  controller.show(req)
    .then((product)=>{
      response.success(req,res, product, 200);
    })
    .catch(next);
}

function deleteProduct(req,res,next){
  controller.remove(req)
      .then ((isDeleted)=>{
          if(isDeleted){
              response.success(req,res,'product delete',200)
          }else{
              response.success(req,res,'internal server error',500);
          }
      })
      .catch(next);
}

module.exports = router;