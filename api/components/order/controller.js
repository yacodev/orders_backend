const TABLE = 'orders';


module.exports = function(injectedStore){
  let store = injectedStore;
  if(!store){
    throw new Error('problem connected with store');
  }

  function list(){
    return store.list(TABLE);
  }


  async function create(body){
    const order = {
      date:body.date,
      product_id:body.product_id,
      user_id:body.user_id,
    }

    const responseProduct = await store.create(TABLE,order);
    
    return (responseProduct.affectedRows === 1);
  }

  async function remove(id){
    const foundId = await store.searchId(TABLE,id);
    if (foundId === parseInt(id)){
      const responseProduct = await store.deleteId(TABLE,id);
      return (responseProduct.affectedRows === 1);
    }else{
      return false;
    }
  }

  return{
    create,
    list,
    remove,
  }

}