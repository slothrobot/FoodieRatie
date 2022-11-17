const mongoose =  require('mongoose');
const Schema = mongoose.Schema;

const rateSchema = new mongoose.Schema({
    userFrom: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    foodId: {
        type: String
    },
    userRate: {
        type: Number
    },
    userReview: {
        type: String
    },
    rateTime: {
        type: String
    },
    userName:{
        type:String
    },
});

const Rate = mongoose.model('Rate', rateSchema);

module.exports = {Rate}