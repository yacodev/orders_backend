function success(req,res,message,status){
  let codeStatus = status || 200;
  let textMessage = message || '';

  res.status(codeStatus).send({
    error:false,
    status:codeStatus,
    body: textMessage,
  })
}

function error(req,res,message,status){
  let codeStatus = status || 500;
  let textMessage = message || 'Internal error';
  res.status(codeStatus).send({
    error: true,
    status:codeStatus,
    body:textMessage,
  })
}

module.exports = {
  success,
  error,
}