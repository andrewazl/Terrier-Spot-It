var mongoose = require('mongoose');

module.exports = mongoose.model('User',{
    id: String,
    username: String,
    firstName: String,
    lastName: String,
    buid: String,
    email: String,
    telephone: String,
    password: String
});