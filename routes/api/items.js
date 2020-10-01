const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');

// Item Model
const Item = require('../../models/Items');

//@route GET api/items
router.get('/', (req, res, next) => {
    Item.find()
    .then((items) => {
        res.json({
            items: items
        })
    })

})

router.post('/', auth, (req, res, next) => {
    const item = new Item({
        name: req.body.name
    });

    item.save()
    .then((item) => {
        res.json({
            item: item
        })
    })
})

router.delete('/:id', auth, (req, res, next) => {
    const itemId = req.params.id;
    Item.findById(itemId)
    .then((item) => {
        if(!item) {
            res.status(400).json({sucess: false})
        }

        return Item.findByIdAndRemove(itemId);
    })
    .then(() => {
        res.json({
            sucess: true
        })
    })
    .catch((error) => {
        res.status(500).json({sucess: false})
    })
})


module.exports = router;