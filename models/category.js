const mongoose = require('mongoose');

const category_schema = mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    icon:{
        type: String,
    },
    color:{
        type: String,
    },
})

exports.Category = mongoose.model('Category', category_schema);
