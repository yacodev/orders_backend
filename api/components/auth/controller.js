const bcrypt = require('bcrypt');
const auth = require('../../../auth');

const TABLA = 'auth';

module.exports = function(injectedStore){
  let store =injectedStore

  if(!store){
    throw new Error('problem connected with store');
  }

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

  async function login(email,password){
    const data = await store.query(TABLA,{email: email});
    return bcrypt.compare(password,data.password)
      .then(isEqual=>{
        if(isEqual===true){
          return auth.sign(data)
        }else {
          throw new Error ('Information invalide')
        }
      })
  }

  async function getToken(data){
    return auth.sign(data)
  }
  return {
    create,
    login,
    getToken,
  }
}