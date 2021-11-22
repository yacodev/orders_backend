const express = require('express');
const controller = require('./index');
const response = require('../../../network/response');
const router = express.Router();

router.post('/',createProduct);
router.get('/',listProducts);
router.get('/:id',showProduct);
router.delete('/:id',deleteProduct);


function createProduct(req,res){
  controller.create(req.body)
      .then ((isCreated)=>{
          if(isCreated){
              response.success(req,res,'product create',201)
          }else{
              response.success(req,res,'server error',401);
          }
      })
      .catch((err)=>{
        response.error(req,res,err.message,500)
      })
}

function listProducts(req,res){
  controller.list()
    .then((list)=>{
      response.success(req,res, list, 200);
    })
    .catch((err)=>{
      response.error(req,res,err.message,500)
    })
}

function showProduct(req,res){
  controller.show(req.params.id)
    .then((product)=>{
      response.success(req,res, product, 200);
    })
    .catch((err)=>{
      response.error(req,res,err.message,500)
    })
}

function deleteProduct(req,res){
  controller.remove(req.params.id)
      .then ((isDeleted)=>{
          if(isDeleted){
              response.success(req,res,'product delete',200)
          }else{
              response.success(req,res,'internal server error',500);
          }
      })
      .catch((err)=>{
        response.error(req,res,err.message,500)
      })
}

module.exports = router;