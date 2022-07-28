const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const morgan = require('morgan');
const mongoose = require('mongoose');

require('dotenv/config');
const api = process.env.API_URL;

//Middleware
app.use(bodyParser.json());
app.use(morgan('tiny'));

//app.use(cors());
//app.options('*', cors());

//Routes
const product_router = require('./routers/products');
const user_router = require('./routers/users');
const category_router = require('./routers/categories');
const order_router = require('./routers/orders');

app.use(`${api}/products`, product_router);
app.use(`${api}/users`, user_router);
app.use(`${api}/categories`, category_router);
app.use(`${api}/orders`, order_router);

mongoose.connect(process.env.CONNECTION_STRING).
then(()=>{
    console.log('Database connection is ready!')
}).
catch((err) => {
    console.log(err);
});

app.listen(8000, ()=> {
    console.log("Program is started");
})