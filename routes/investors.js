var express = require('express');
var router = express.Router()
var Investor = require('../models/investor');


router.get('/', (req, res) => {
    console.log("Reached");
    Investor.find({}, (err, results) => {
        if (results) {
            res.status(200).json({
                data: results
            });
        } else {
            res.status(404).json({
                msg: "Nothing Found"
            })
        }
    });
});

router.post('/', (req, res) => {
    let user = new Investor({
        name: req.body.name,
        img: req.body.imgurl,
    });

    user.save((err) => {
        if (err) {
            res.json({
                "status": 200,
                "msg": "Some error",
                "error": err
            });
        } else {
            res.status(200).json({
                "msg": "Created!!",
                user
            });
        }
    });
});

module.exports = router;