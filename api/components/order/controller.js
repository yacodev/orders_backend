const TABLE = 'orders';
const error = require('../../../utils/error');

module.exports = function(injectedStore){
  let store = injectedStore;
  if(!store){
    throw new Error('problem connected with store');
  }

  async function list(req){
    verifyUserAdmin(req);
    const userId = req.body.id;
    const ownOrders = await store.getProductId(TABLE,userId);
    let productsIdOrdered = [];
    let dataAllOrders= [];
    if(ownOrders){
      ownOrders.forEach(async (order)=>{
        const productId = order.product_id;
        productsIdOrdered.push(productId);
      })
      for(let i = 0; i<productsIdOrdered.length; i++){
        const result= await store.get('products',productsIdOrdered[i])
        dataAllOrders= [...dataAllOrders,...result];
      }
    }
    return dataAllOrders;
  }


  async function create(req){
    const listProductsId = req.body.product_ids;
    let verifyOpertaions = 0; 
    for (let i=0; i< listProductsId.length; i++){
      const order = {
        date:req.body.date,
        product_id:listProductsId[i],
        user_id:req.body.user_id,
      };
      const responseProduct = await store.create(TABLE,order);
      if (responseProduct.affectedRows === 1) verifyOpertaions+=1;
    }
    
    return (verifyOpertaions === listProductsId.length);
  }

  async function remove(req){
    verifyUserAdmin(req);
    const id = req.params.id;
    const foundId = await store.searchId(TABLE,id);
    if (foundId === parseInt(id)){
      const responseProduct = await store.deleteId(TABLE,id);
      return (responseProduct.affectedRows === 1);
    }else{
      return false;
    }
  }

  function verifyUserAdmin(req){
    if(req.session.email == "cyaco33@gmail.com"){
      return true;
    }else{
      throw error('you are not authorizate',401);
    }
  }

  return{
    create,
    list,
    remove,
  }

}