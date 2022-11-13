const mongoose =  require('mongoose');
const Schema = mongoose.Schema;

const listSchema = new mongoose.Schema({
    userFrom: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    foodId: {
        type: String
    },
    foodName: {
        type: String
    },
    foodBrand: {
        type: String
    },
    foodImage: {
        type: String
    },
    foodQuantity: {
        type: String
    },
});

const List = mongoose.model('List', listSchema);

module.exports = {List}