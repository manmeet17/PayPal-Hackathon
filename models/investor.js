var mongoose=require('mongoose');

var InvestorSchema=new mongoose.Schema({
    name: String,
    img: String,
    email: {
        default: 'investor@angel.com',
        type: String
    },
});

var Investor = mongoose.model('Investor',InvestorSchema,'investors');

module.exports = Investor;