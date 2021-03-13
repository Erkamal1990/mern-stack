const mongoose = require('mongoose');
const passportLocalMongoose = require("passport-local-mongoose"); //  for session storage
const UserSchema = mongoose.Schema({
    fristName:{
        type: String,
        required: true,
    },
    lastName:{
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,

    },
    password: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    dob: {
        type: Date,
        required: true
    },
    skills: {
        type: String,
        required: true
    },
    profileImg: {
        type: String,
    },
    status: {
        type: Boolean,
        default: true
    },
    created_at: {
        type: Date,
        default: Date.now()
    }
})
UserSchema.plugin(passportLocalMongoose);
// export module
module.exports = mongoose.model('users', UserSchema);