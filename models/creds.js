const mongoose = require('mongoose');

const credSchema = mongoose.Schema({
    username: {type: String, required: true, minlength: 5},
    password: {type: String, required: true, minlength: 5}
})

const Cred = mongoose.model('Cred', credSchema);

module.exports = Cred;