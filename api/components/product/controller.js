const TABLE = 'products';
const error = require('../../../utils/error');

module.exports = function(injectedStore){
  let store = injectedStore;
  if(!store){
    throw new Error('problem connected with store');
  }

  function list(req){
    verifySession(req);
    return store.list(TABLE);
  }

  function show(req){
    verifySession(req);
    const id = req.params.id
    return store.get(TABLE,id);
  }

  async function create(req){
    verifyUserAdmin(req);
    const product = {
      name:req.body.name,
      description:req.body.description,
      image:req.body.image,
      price:req.body.price
    }

    const responseProduct = await store.create(TABLE,product);
    
    return (responseProduct.affectedRows === 1);
  }

  async function remove(req){
    verifyUserAdmin(req);
    const id = req.params.id
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

  function verifySession(req){
    if(req.session.email){
      return true;
    }else{
      throw error('you are not logged in',400);
    }
  }

  return{
    create,
    show,
    list,
    remove
  }

}