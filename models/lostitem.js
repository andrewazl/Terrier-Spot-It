/**
 * Created by Jonathan on 12/7/15.
 */
var mongoose = require('mongoose');

module.exports = mongoose.model('lostItem',{
    username: String,
    lostitem: String,
    description: String,
    address: String,
    created_at: Date
});