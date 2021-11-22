const TABLA = 'auth';

module.exports = function(injectedStore){
  let store =injectedStore

  async function create(data){
    const authData = {
      id:data.id,
    }
    if (data.email){
      authData.email = data.email;
    }
    if(data.password){
      authData.password = data.password;
    }
    return store.create(TABLA,authData);
  }

  return {
    create,
  }
}