const mongoose = require('mongoose');

const user_schema = mongoose.Schema({
    username:String,
    password:String,
    email:String
})

exports.User = mongoose.model('User', user_schema);
