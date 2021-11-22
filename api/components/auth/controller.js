const bcrypt = require('bcrypt');
const auth = require('../../../auth');

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
      authData.password = await bcrypt.hash(data.password,5)
    }
    return store.create(TABLA,authData);
  }

  async function getToken(data){
    return auth.sign(data)
  }
  return {
    create,
    getToken,
  }
}