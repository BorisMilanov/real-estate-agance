const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    name: { type: String, require: true },
    username: { type: String, require: true },
    password: { type: String, require: true }
});

userSchema.pre('save', function (next) {
    return bcrypt.hash(this.password, 10).then((hash) => {
        this.password = hash;
        return next();
    });
});

const User = mongoose.model('User', userSchema);
module.exports = User;