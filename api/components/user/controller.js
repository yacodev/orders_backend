const TABLE = 'user';

module.exports = function(injectedStore){
  let store = injectedStore;
  
  function list(){
    return store.list(TABLE)
  }

  async function create(body){
    console.log("[BODY]",body)

    let userId = 0
    userId+=1
    const user = {
      id:userId,
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