const {Order} = require('../models/order');
const express = require('express');
const router = express.Router();

router.get(`/`, async (req, res) => {
    const orders = await Order.find();
    if (!orders)
    {
        res.status(500).json({success: false});
    }
    res.send(product);
})

router.post(`/`, (req, res) => {
    const order_db = new Order ({
        name: req.body.name,
        image: req.body.image,
        stock: req.body.stock
    });
    
    order_db.save().then((created_order => {
        res.status(201).json(created_order)
    })).catch((err) => {
        res.status(500).json({
            error: err,
            success: false
        });
    });
})

module.exports = router;