const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        max: 255,
        max: 6
    },
    password: {
        type: String,
        min: 6
    },
    name: {
        type: String,
        required: true,
        max: 255,
        min: 3
    },
    username: {
        type: String,
        required: true,
        min: 3
    },
    birthdate: {
        type: Date,
        required: true
    }
});

// HIDDEN SOME PROPERTIES
userSchema.set('toJSON', {
    transform: function (_, ret, _) {
        delete ret._id;
        delete ret.__v;
    }
});

module.exports = mongoose.model('User', userSchema);