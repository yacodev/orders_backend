const TABLE = 'user';

module.exports = function(injectedStore){
  let store = injectedStore;
  
  async function list(){
    return store.list(TABLE)
  }

  async function create(body){
    console.log("[BODY]",body)

    const user = {
      email: body.email,
      first_name:body.first_name,
      last_name:body.last_name,
    }

    return store.create(TABLE, user)
  }

  return{
    create,
    list,
  }
}