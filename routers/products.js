const {Product} = require('../models/product');
const express = require('express');
const { Category } = require('../models/category');
const router = express.Router();

router.get(`/`, async (req, res) => {
    const product_list = await Product.find();
    if (!product_list)
    {
        res.status(500).json({success: false});
    }
    res.send(product_list);
})

router.get('/:id', async (req, res) => {
    const product_list = await Product.findById(req.params.id);
    if (!product_list)
    {
        res.status(500).json({success: false});
    }
    res.send(product_list);
})

router.put('/:id', async (req, res) => {
    const product = await Product.findByIdAndUpdate(req.params.id, {
        name: req.body.name,
        description: req.body.description,
        rich_description: req.body.rich_description,
        image: req.body.image,
        brand: req.body.brand,
        price:req.body.price,
        category:req.body.category,
        stock: req.body.stock,
        num_reviews:req.body.num_reviews,
        is_featured: req.body.is_featured,
        date_created: Date.now()
    }, {new: true});

    if (!product) 
    {
        return res.status(500).send('The product cannot be updated!');
    }
    res.send(product)
})

router.delete('/:id', (req, res) => {
    Product.findByIdAndRemove(req.params.id).
    then(Product => {
        if (Product)
        {
            return res.status(200).json({success: true, message: 'Product successfully deleted'});
        }
        else
        {
            return res.status(404).json({success: false, message: "Product with ID doesn't exist"});
        }
    }).catch(err => {
        return res.status(400).json({success: false, message: err});
    })
})

router.post('/', async (req, res) => {
    const category = await Category.findById(req.body.category);

    if (!category) return res.status(400).send('Invalid Category');

    const product_db = new Product ({
        name: req.body.name,
        description: req.body.description,
        rich_description: req.body.rich_description,
        image: req.body.image,
        brand: req.body.brand,
        price:req.body.price,
        category:req.body.category,
        stock: req.body.stock,
        num_reviews:req.body.num_reviews,
        is_featured: req.body.is_featured,
        date_created: Date.now()
    });
    saved_product = await product_db.save();
    if (!saved_product)
    {
        return res.status(500).send('The Product cant be created');
    }

    return res.send(product_db)
})

module.exports = router;