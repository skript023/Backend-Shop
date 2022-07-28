const mongoose = require('mongoose');

const order_schema = mongoose.Schema({
    name:String,
    image:String,
    stock: Number
})

exports.Order = mongoose.model('Order', order_schema);
