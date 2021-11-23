const TABLE = 'orders';


module.exports = function(injectedStore){
  let store = injectedStore;
  if(!store){
    throw new Error('problem connected with store');
  }

  async function list(req){
    verifySession(req);
    return store.list(TABLE);
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
      throw new Error('You are not logged in');
    }
  }

  return{
    create,
    list,
    remove,
  }

}