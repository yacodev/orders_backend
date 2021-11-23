const TABLE = 'orders';
const error = require('../../../utils/error');

module.exports = function(injectedStore){
  let store = injectedStore;
  if(!store){
    throw new Error('problem connected with store');
  }

  async function list(req){
    verifySession(req);
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
        console.log(result);
        dataAllOrders= [...dataAllOrders,...result];
      }
    }
    return dataAllOrders;
  }


  async function create(req){
    verifySession(req);
    const order = {
      date:req.body.date,
      product_id:req.body.product_id,
      user_id:req.body.user_id,
    }

    const responseProduct = await store.create(TABLE,order);
    
    return (responseProduct.affectedRows === 1);
  }

  async function remove(req){
    verifySession(req);
    const id = req.params.id;
    const foundId = await store.searchId(TABLE,id);
    if (foundId === parseInt(id)){
      const responseProduct = await store.deleteId(TABLE,id);
      return (responseProduct.affectedRows === 1);
    }else{
      return false;
    }
  }

  function verifySession(req){
    if(req.session.email){
      return true;
    }else{
      throw error('you are not logged in',400);
    }
  }

  return{
    create,
    list,
    remove,
  }

}