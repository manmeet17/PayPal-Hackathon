var express = require('express');
var router = express.Router();
var {google} = require('googleapis');
var youtube = google.youtube({
    version: 'v3',
    auth: "AIzaSyDwk4lq66ptGvjDCUFVwU2Sa2jYYC96z7s"
});


router.get('/search/:term', (req, res) => {
    let term = req.params.term;
    console.log(term);

    youtube.search.list({
        part: 'snippet',
        q: term
    }, function (err, data) {
        if (err) {
            console.error('Error: ' + err);
        }
        if (data) {
            console.log(data.status);
        }
        res.json(data.data);
    });

});





module.exports = router;