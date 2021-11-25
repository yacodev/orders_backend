const auth = require('../auth');
const error = require('../../../utils/error');
const TABLE = 'user';

module.exports = function(injectedStore){
  let store = injectedStore;
  
  if(!store){
    throw new Error('problem connected with store');
  }

  async function list(req){
    verifyUserAdmin(req);
    return store.list(TABLE)
  }

  async function create(req){
    const body = req.body;

    const user = {
      email: body.email,
      first_name:body.first_name,
      last_name:body.last_name,
    }

    await store.create(TABLE, user);
    let [{'LAST_INSERT_ID()': userId}] = await store.lastId();
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
    req.session.email = user.email;
    return {
      token:token,
      id:userId,
    }
  }

  async function remove(req){
    verifyUserAdmin(req);
    const id = req.params.id;
    const foundId = await store.searchId(TABLE,id);
    if(foundId === parseInt(id)){
      const responseAuth = await store.deleteId('auth',id);
      const responseUser = await store.deleteId(TABLE,id);
      return (responseAuth.affectedRows == 1 && responseUser.affectedRows == 1);
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