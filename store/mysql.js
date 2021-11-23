const mysql = require('mysql');

const config = require('../config');

const dbconfig = {
  host: config.mysql.host,
  user: config.mysql.user,
  password: config.mysql.password,
  database: config.mysql.database,
}

let connection;

function handleConnection(){
  connection = mysql.createConnection(dbconfig);
  connection.connect((err)=>{
    if(err){
      console.log('[db err]',err);
      setTimeout(handleConnection,2000);
    }else{
      console.log('Db connected');
    }
  })

  connection.on('error',err=>{
    console.log('[db err]',err);
    if(err.code==='PROTOCOL_CONNECTION_LOST'){
      handleConnection();
    }else{
      throw err;
    }
  })
}

handleConnection();

function list(table){
  return new Promise((resolve, reject)=>{
    connection.query(`SELECT * FROM ${table}`,(err,data)=>{
      if(err) return reject(err);
      resolve(data)
    })
  })
}

function create(table,data){
  return new Promise((resolve,reject)=>{
    connection.query(`INSERT INTO ${table} SET ?`,data,(err,result)=>{
      if(err) return reject(err);
      resolve(result);
    })
  })
}

function get(table,id){
  return new Promise ((resolve,reject)=>{
    connection.query(`SELECT * FROM ${table} WHERE id='${id}'`,(err,data)=>{
      if(err) return reject(err);
      resolve(data);
    })
  })
}

function query(table,q){

  return new Promise((resolve,reject)=>{
    connection.query(`SELECT * FROM ${table} WHERE ${table}.?`,q,(err, res)=>{
      if(err){
      return reject(err);
      }
      if(res.length>0){
        let output ={
          id:res[0].id,
          username:res[0].username,
          password:res[0].password,
        }
        resolve(output || null);
      } else{
        const error ={message: 'data incorrect', statuscode: 400};
        return reject(error);
      }
    })
  })
}

function lastId(){
  return new Promise((resolve,reject)=>{
      connection.query(`SELECT LAST_INSERT_ID();`,(err,result)=>{
          if(err) return reject(err);
          resolve(result);
      })
  })
}

function deleteId(table,id){
  return new Promise((resolve,reject)=>{
    connection.query(`DELETE  FROM ${table} WHERE id=${id}`,(err,result)=>{
        if(err) return reject(err);
        resolve(result);
    })
})
}

function searchId(table,id){
  return new Promise((resolve,reject)=>{
      connection.query(`SELECT * FROM ${table} WHERE id=${id}`,(err,result)=>{
          if(err) return reject(err);
          if(result.length == 0 ){
              resolve(null);
          }else{
              resolve(result[0].id);
          }
      })
  })
}

module.exports = {
  list,
  get,
  create,
  query,
  lastId,
  searchId,
  deleteId
}