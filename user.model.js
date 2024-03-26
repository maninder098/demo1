const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    name: { type: String, default: '' },
    email: { type: String, default: '' },
    password: { type: String, default: '' },
    token: { type: String, default: '' },
    dept: { type: String, default: '' },
    role: { type: String, default: '' }
}, { timestamps: true })

const User = mongoose.model('user', UserSchema)

module.exports = User