const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String
    },
    name: {
        type: String,
        required: true
    },
    username: {
        type: String
    },
    birthdate: {
        type: Date
    },
    authenticationMethods: {
        type: [String],
        required: true,
        enum: ['APPLE', 'FACEBOOK', 'EMAIL']
    }
});

// HIDDEN SOME PROPERTIES
UserSchema.set('toJSON', {
    transform: function (_, ret, _) {
        delete ret.password;
        delete ret._id;
        delete ret.__v;
    }
});

module.exports = mongoose.model('User', UserSchema);