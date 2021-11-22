const TABLE = 'products';


module.exports = function(injectedStore){
  let store = injectedStore;
  if(!store){
    throw new Error('problem connected with store');
  }

  function list(){
    return store.list(TABLE);
  }

  function show(id){
    return store.get(TABLE,id);
  }

  async function create(body){
    const product = {
      name:body.name,
      description:body.description,
      image:body.image,
      price:body.price
    }

    const responseProduct = await store.create(TABLE,product);
    
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
    show,
    list,
    remove
  }

}