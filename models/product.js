const mongoose = require('mongoose');

const product_schema = mongoose.Schema({
    name:{
        type:String,
        required: true,
    },
    description: {
        type: String,
        required: true
    },
    rich_description: {
        type:String,
        default: ''
    },
    image:{
        type: String,
        default: ''
    },
    brand: {
        type: String,
        default: ''
    },
    price: {
        type: Number,
        default: 0
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    },
    stock: {
        type:Number,
        required: true,
        min: 0,
        max: 255
    },
    num_reviews: {
        type: Number,
        default: 0
    },
    is_featured: {
        type: Boolean,
        default: false
    },
    date_created: {
        type: Date,
        default: Date.now
    }
})

exports.Product = mongoose.model('Product', product_schema);
