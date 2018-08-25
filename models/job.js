var mongoose = require('mongoose');

var JobSchema=new mongoose.Schema({
    title: String,
    hits: Number,
    rate: Number
});

var Job = mongoose.model('Job',JobSchema);

module.exports = Job;