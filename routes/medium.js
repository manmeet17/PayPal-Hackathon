var express = require('express');
var router = express.Router();
var cheerio = require('cheerio');


router.get('/', (req, res) => {
    var request = require('request');
    var url = 'https://medium.com/@Michael_Spencer/latest';
    request(url, function(err,response,html){
        if(!err && response.statusCode==200)
            var $ = cheerio.load(html);
            $('section .et').each(function(i,ele){
                console.log($(this).find('img .l'));
            });
    });
});

module.exports = router;