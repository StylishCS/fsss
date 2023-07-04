const mongoose = require('mongoose');

const signupSchema = mongoose.Schema({
    username: {type: String, required: true, minlength: 5},
    email: {type: String, required: true, minlength: 5},
    password: {type: String, required: true, minlength: 8},
    confirmPassword: {type: String, minlength: 8}
})

const Signup = mongoose.model('Signup', signupSchema);

module.exports = Signup;