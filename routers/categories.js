const {Category} = require('../models/category');
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
    const category = await Category.find();
    if (!category)
    {
        res.status(500).json({success: false});
    }
    res.status(200).send(product);
})

router.get('/:id', async (req, res) => {
    const category = await Category.findById(req.params.id);
    if (!category)
    {
        res.status(500).json({message: 'The category with the given ID was not found!'});
    }
    res.status(200).send(product);
})

router.put('/:id', async (req, res) => {
    const category = await Category.findByIdAndUpdate(req.params.id, {
        name: req.body.name,
        icon: req.body.icon,
        color: req.body.color
    }, {new: true});

    if (!category)
    {
        return res.status(500).send('The category cannot be updated!');
    }

    return res.send(category);
})

router.delete('/:id', (req, res) => {
    Category.findByIdAndRemove(req.params.id).
    then(category => {
        if (category)
        {
            return res.status(200).json({success: true, message: 'Category successfully deleted'});
        }
        else
        {
            return res.status(404).json({success: false, message: "Category with ID doesn't exist"});
        }
    }).catch(err => {
        return res.status(400).json({success: false, message: err});
    })
})

router.post('/', (req, res) => {
    const category_db = new Category ({
        name: req.body.name,
        icon: req.body.icon,
        color: req.body.color,
    });
    
    category_db.save().then((created_category => {
        res.status(201).json(created_category)
    })).catch((err) => {
        res.status(500).json({
            error: err,
            success: false
        });
    });
})

module.exports = router;