const mongoose = require('mongoose');
const passportLocalMongoose = require("passport-local-mongoose"); //  for session storage
const checkUser = mongoose.Schema({
    email: {
        type: String,
        required: true,
    }
})
checkUser.plugin(passportLocalMongoose);
// export module
module.exports = mongoose.model('users', checkUser);