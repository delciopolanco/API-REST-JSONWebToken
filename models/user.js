const mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    bcrypt = require('bcrypt-nodejs'),
    crypto = require('crypto');

const UserSchame = Schema({
    email: {
        type: String,
        unique: true,
        lowercase: true
    },
    displayName: String,
    avatar: String,
    password: {
        type: String,
        required: true
    },
    signupDate: {
        type: Date,
        default: Date.now()
    },
    lastLogin: Date
});

UserSchame.pre('save', function (next) {
    let user = this;
    if (!user.isModified('password')) {
        return next();
    }
    bcrypt.genSalt(10, (err, salt) => {
        if (err) {
            return next();
        }

        bcrypt.hash(user.password, salt, null, (err, hash) => {
            if (err) {
                return next(err);
            }
            user.password = hash;
            next();
        });
    });
});

UserSchame.methods.comparePassword = function (candidatePassword, callback) {
    bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
        if (err) {
            return callback(err);
        }
        callback(null, isMatch);
    });
};

UserSchame.methods.gravatar = function (size) {
    if (!size) {
        size = 200;
    }

    if (!this.email) {
        return `https://gravatar.com/avatar/?s=200&d=retro`;
    }

    const md5 = crypto.createHash('md5').update(this.email).digest('hex');
    return `https://gravatar.com/avatar/${md5}?200&d=retro`;
};

module.exports = mongoose.model('User', UserSchame);