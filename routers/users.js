const {User} = require('../models/user');
const express = require('express');
const router = express.Router();

router.get(`/`, async (req, res) => {
    const user_list = await User.find();
    if (!user_list)
    {
        res.status(500).json({success: false});
    }
    res.send(user_list);
})

router.post(`/`, (req, res) => {
    const user_db = new User ({
        name: req.body.name,
        image: req.body.image,
        stock: req.body.stock
    });
    user_db.save().then((created_user => {
        res.status(201).json(created_user)
    })).catch((err) => {
        res.status(500).json({
            error: err,
            success: false
        });
    });
})

module.exports = router;