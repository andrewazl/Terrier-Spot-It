/**
 * Created by Jonathan on 12/7/15.
 */
var mongoose = require('mongoose');

module.exports = mongoose.model('lostItem',{
    username: String,
    lostitem: String,
    description: String,
    latitude: String,
    longitude: String,
    created_at: Date
});