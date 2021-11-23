const express = require('express');
const session = require('express-session');

const config =require('../config.js');
const user = require('./components/user/network');
const auth = require('./components/auth/network');
const product = require('./components/product/network');
const orders = require('./components/order/network');

const app = express();

app.use(express.json());
app.use(session({
  secret: "987f4bd6d4315c20b2ec70a46ae846d19d0ce563450c02c5b1bc71d5d580060b",
  saveUninitialized: true,
  resave: true,
}));

app.use('/api/user',user);
app.use('/api/session',auth);
app.use('/api/product',product);
app.use('/api/orders',orders);

app.listen(config.api.port,()=>{
  console.log('Api escuchando en el puerto', config.api.port);
})