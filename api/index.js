const express = require('express');
const session = require('express-session');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');


const config =require('../config.js');
const user = require('./components/user/network');
const auth = require('./components/auth/network');
const product = require('./components/product/network');
const orders = require('./components/order/network');
const error = require('../network/error');

const app = express();
app.use(express.json());
const swaggerDoc = require('./swagger.json');

app.use(cors());
app.options('*', cors());

app.use(session({
  secret: config.session_data.secret,
  saveUninitialized: true,
  resave: true,
}));

app.use('/api/user',user);
app.use('/api/session',auth);
app.use('/api/product',product);
app.use('/api/orders',orders);
app.use('/api-docs',swaggerUi.serve, swaggerUi.setup(swaggerDoc));
app.use(error);

app.listen(config.api.port,()=>{
  console.log('API ready in the port:', config.api.port);
})