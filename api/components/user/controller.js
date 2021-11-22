const auth = require('../auth');
const TABLE = 'user';


module.exports = function(injectedStore){
  let store = injectedStore;
  
  async function list(){
    return store.list(TABLE)
  }

  async function create(body){

    const user = {
      email: body.email,
      first_name:body.first_name,
      last_name:body.last_name,
    }

    await store.create(TABLE, user);
    let [{'LAST_INSERT_ID()': userId}] = await store.lastId();
    console.log('[userId]',userId);
    if(body.email || body.password){
      await auth.create({
        id:userId,
        email: user.email,
        password: body.password,
      })
    }
    let data = {
      id:userId,
      email:user.email,
      password:user.password
    }
    let token = await auth.getToken(data);
    return {
      token:token,
    }
  }

  async function remote(id){
    let responseAuth = await store.deleteId('auth',id);
    let responseUser = await store.deleteId(TABLE,id)
    return (responseAuth.affectedRows == 1 && responseUser.affectedRows == 1)
  }

  return{
    create,
    list,
    remote,
  }
}