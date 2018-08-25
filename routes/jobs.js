var express = require('express');
var router = express.Router();
var Job = require('../models/job');

router.get('/',(req,res)=>{
    Job.find({},(err,results)=>{
        if(results){
            res.status(200).json({
                data: results
            });
        } else {
            res.status(404).json({
                msg: "Nothing Found"
            });
        }
    });
});

router.post('/', (req, res) => {
    let job = new Job({
        title: req.body.title,
        hits: req.body.hits,
        rate: req.body.rate
    });

    job.save((err) => {
        if (err) {
            res.json({
                "status": 200,
                "msg": "Some error",
                "error": err
            });
        } else {
            res.status(200).json({
                "msg": "Created",
                job
            });
        }
    });
});

module.exports = router;