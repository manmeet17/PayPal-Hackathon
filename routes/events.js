var Diffbot = require('diffbot');
var express = require('express');
var axios = require('axios');
const config = require('../config/keys');
var router = express.Router();


router.get('/', (req, res) => {
    var diffbot = new Diffbot('d2720012f0cf8ad9f306328304dfee74');
    var text;
    diffbot.article({
        uri: 'http://techcrunch.com/2011/09/07/nintendo-gets-sued-over-the-wii/'
    }, function (err, response) {
        text = response.text
        console.log(response.title);
        console.log(text);
        if (response.media)
            console.log(JSON.stringify(response.media));
    });
    res.status(200).json({
        message: "Found",
        info: text
    });
});

router.get('/meetup/all', (req, res) => {
    axios.get(`https://api.meetup.com/2/cities?key=${config.meetupKey}&sign=true&photo-host=public&page=20`)
        .then(response => {
            var data = response.data.results;
            filterArray(data).then((resp) => {
                res.status(200).json({
                    data: resp
                });
            });
        })
        .catch(error => {
            console.log(error);
        });
});

var filterArray = (arr) => {
    return new Promise((resolve, reject) => {
        arr = arr.filter(function (eq) {
            if (eq && eq.venue)
                return eq.venue['localized_country_name'] == "India";
            else
                resolve(arr);
        });
        resolve(arr);
    });
}


router.get('/meetup/:city', (req, res) => {
    var data;
    let city = req.params.city;
    axios.get(`https://api.meetup.com/2/open_events?key=${config.meetupKey}&sign=true&photo-host=public&country=India&topic=technology&city=${city}&page=20`)
        .then(response => {
            res.json({
                data: response.data
            });
        })
        .catch(error => {
            console.log(error);
        });
});

module.exports = router;
